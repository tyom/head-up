<template>
  <div
    v-shortkey="shortkeys"
    :class="rootClass"
    class="HeadUp"
    @shortkey="handleKeys"
  >
    <Sidebar
      :visible="true"
      :boards="boardSummary"
    />
    <div class="main">
      <HeadUpBoards :boards="boards" ref="boardsContainer">
        <slot/>
      </HeadUpBoards>
    </div>
    <HelpScreen
      :show="showHelp"
      heading="Keyboard help"
      @close="toggleHelpScreen(false)"
    />
    <SettingsScreen
      :show="showSettings"
      heading="Settings"
      @close="toggleSettingsScreen(false)"
      @save="handleSettingsSave"
    />
  </div>
</template>

<script>
import { get } from 'lodash';
import { mapActions, mapState } from 'vuex';
import HeadUpBoards from './HeadUpBoards';
import Sidebar from '../Sidebar';
import SettingsScreen from '../SettingsScreen';
import HelpScreen from '../HelpScreen';

function getOption(slot, prop) {
  return get(slot, `componentOptions${prop ? '.' + prop : ''}`);
}

function getChildComponents(children = []) {
  return children.filter(x => x.tag);
}

export default {
  name: 'HeadUp',
  components: {
    HeadUpBoards,
    Sidebar,
    SettingsScreen,
    HelpScreen,
  },
  data() {
    return {
      showHelp: false,
      showSettings: false,
      shortkeys: {
        up: ['k'],
        down: ['j'],
        sidebar: ['s'],
        edit: ['e'],
        add: ['a'],
        help: ['shift', '?'],
      },
    };
  },
  computed: {
    ...mapState(['activeBoardIdx', 'editMode', 'boards', 'smoothScrolling']),
    rootClass() {
      return {
        _edit: this.editMode,
      };
    },
    boardSummary() {
      return [...this.$store.state.boards, ...this.parseSlotToConfig().boards];
    },
  },
  watch: {
    activeBoardIdx() {
      this.scrollToActiveBoard();
    },
  },
  mounted() {
    window.addEventListener('resize', () => this.scrollToActiveBoard(false));
    this.scrollToActiveBoard(false);

    this.$root.$on('toggle:help', this.toggleHelpScreen);
    this.$root.$on('toggle:settings', this.toggleSettingsScreen);
  },
  methods: {
    ...mapActions([
      'ADD_BOARD',
      'ACTIVATE_BOARD',
      'TOGGLE_SIDEBAR',
      'TOGGLE_EDIT_MODE',
    ]),
    handleKeys(evt) {
      switch (evt.srcKey) {
        case 'up':
          this.activatePreviousBoard();
          break;
        case 'down':
          this.activateNextBoard();
          break;
        case 'sidebar':
          this.TOGGLE_SIDEBAR();
          break;
        case 'edit':
          this.TOGGLE_EDIT_MODE();
          break;
        case 'add':
          this.TOGGLE_SIDEBAR(true);
          this.ADD_BOARD();
          break;
        case 'help':
          this.toggleHelpScreen();
          break;
        default:
      }
    },
    scrollToActiveBoard(useGlobalSetting = true) {
      const boardEls = get(this.$refs, 'boardsContainer.$el.childNodes', []);
      const currentBoardEl = boardEls[this.activeBoardIdx];
      if (!currentBoardEl) {
        return;
      }
      const scrollOptions =
        useGlobalSetting && this.smoothScrolling ? { behavior: 'smooth' } : {};
      currentBoardEl.scrollIntoView(scrollOptions);
    },
    activateNextBoard() {
      if (this.activeBoardIdx === this.boardSummary.length - 1) {
        this.ACTIVATE_BOARD(0);
        return;
      }
      this.ACTIVATE_BOARD(this.activeBoardIdx + 1);
    },
    activatePreviousBoard() {
      if (this.activeBoardIdx === 0) {
        this.ACTIVATE_BOARD(this.boardSummary.length - 1);
        return;
      }
      this.ACTIVATE_BOARD(this.activeBoardIdx - 1);
    },
    parseSlotToConfig() {
      if (!this.$slots.default) {
        return {
          boards: [],
        };
      }
      return {
        boards: getChildComponents(this.$slots.default).map(slot => ({
          title: getOption(slot, 'propsData.title'),
          isReadOnly: true,
          cells: getChildComponents(getOption(slot, 'children')).map(cell => ({
            title: getOption(cell, 'propsData.title'),
            content: getChildComponents(getOption(cell, 'children')).map(
              item => ({
                type: getOption(item, 'tag'),
                props: getOption(item, 'propsData'),
              }),
            ),
          })),
        })),
      };
    },
    toggleHelpScreen(state) {
      this.showHelp = typeof state === 'undefined' ? !this.showHelp : state;
    },
    toggleSettingsScreen(state) {
      this.showSettings =
        typeof state === 'undefined' ? !this.showSettings : state;
    },
    handleSettingsSave(payload) {
      console.log(payload);
    },
  },
};
</script>

<style src="../../css/util.css"/>

<style scoped>
.HeadUp {
  font-size: responsive 8px 23px;
  transition: 0.4s background-color;
  background-color: #222;
  color: #bbb;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;

  &._edit {
    background-color: #0d1a2b;
  }
}

.main {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
