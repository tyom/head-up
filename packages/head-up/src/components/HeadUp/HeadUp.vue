<template>
  <div
    v-shortkey="shortkeys"
    :class="rootClass"
    class="HeadUp"
    @shortkey="handleKeys"
  >
    <Sidebar
      :visible="true"
      :boards="allBoards"

    />
    <div class="main">
      <div class="boards">
        <template v-if="allBoards.length">
          <Board
            v-for="(board, idx) in allBoards"
            ref="activeBoardEl"
            :title="board.title"
            :cells="board.cells"
            :editable="!board.isReadOnly"
            :key="board.title + board.id + idx"
            @update="handleBoardUpdate(idx, $event)"
          />
        </template>
        <slot v-else/>
      </div>
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
import Board from '../Board';
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
    Board,
    Sidebar,
    SettingsScreen,
    HelpScreen,
  },
  props: {
    boards: {
      type: Array,
      default: () => [],
    },
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
    ...mapState(['activeBoardIdx', 'editMode', 'smoothScrolling']),
    rootClass() {
      return {
        _edit: this.editMode,
      };
    },
    allBoards() {
      const boards = this.boards.length
        ? this.boards
        : this.$store.state.boards;
      return [...boards, ...this.parseSlotToConfig().boards];
    },
  },
  watch: {
    allBoards() {
      this.scrollToActiveBoard();
    },
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
      'UPDATE_BOARD',
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
      const currentBoardEl = get(
        this.$refs,
        `activeBoardEl[${this.activeBoardIdx}].$el`,
      );
      if (!currentBoardEl) {
        return;
      }
      const scrollOptions =
        useGlobalSetting && this.smoothScrolling ? { behavior: 'smooth' } : {};
      currentBoardEl.scrollIntoView(scrollOptions);
    },
    activateNextBoard() {
      if (this.activeBoardIdx === this.allBoards.length - 1) {
        this.ACTIVATE_BOARD(0);
        return;
      }
      this.ACTIVATE_BOARD(this.activeBoardIdx + 1);
    },
    activatePreviousBoard() {
      if (this.activeBoardIdx === 0) {
        this.ACTIVATE_BOARD(this.allBoards.length - 1);
        return;
      }
      this.ACTIVATE_BOARD(this.activeBoardIdx - 1);
    },
    handleBoardUpdate(idx, data) {
      this.UPDATE_BOARD({
        idx: this.activeBoardIdx,
        ...data,
      });
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

.boards {
  flex: 1;
  overflow: hidden;
}
</style>
