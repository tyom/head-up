<template>
  <div
    v-shortkey="shortkeys"
    :class="rootClass"
    class="HeadUp"
    @shortkey="handleKeys"
  >
    <Sidebar
      v-if="!hideSidebar"
      :visible="state.showSidebar"
      :boards="boardSummary"
      :active-board-idx="state.activeBoardIdx"
      @sidebar:toggle="handleSidebarToggle"
      @board:add="handleAddBoard"
      @board:remove="handleRemoveBoard"
      @board:activate="handleActivateBoard"
      @board:edit="handleToggleEdit"
      @modal:settings="toggleSettingsScreen"
      @modal:help="toggleHelpScreen"
    />
    <div class="main">
      <HeadUpBoards :boards="state.boards" ref="boardsContainer">
        <slot/>
      </HeadUpBoards>
    </div>
    <ModalDialogue
      v-if="modal"
      :heading="modal.heading"
      @close="modal = null"
    >
      <HelpScreen
        v-if="modal.name === 'help'"
      />
      <SettingsScreen
        v-if="modal.name === 'settings'"
        :settings="state.settings"
        @save="handleSettingsSave"
      />
    </ModalDialogue>
  </div>
</template>

<script>
import { uniqueId, get } from 'lodash';
import ModalDialogue from '../ModalDialogue';
import Sidebar from '../Sidebar';
import SettingsScreen from '../SettingsScreen';
import HelpScreen from '../HelpScreen';
import HeadUpBoards from './HeadUpBoards';

function getOption(slot, prop) {
  return get(slot, `componentOptions${prop ? '.' + prop : ''}`);
}

function getChildComponents(children = []) {
  return children.filter(x => x.tag);
}

const persistedState = localStorage.getItem('headUp');

export default {
  name: 'HeadUp',
  components: {
    HeadUpBoards,
    Sidebar,
    ModalDialogue,
    SettingsScreen,
    HelpScreen,
  },
  data() {
    return {
      state: {
        activeBoardIdx: 0,
        editMode: false,
        showSidebar: true,
        boards: [],
        settings: {
          smoothScrolling: {
            type: 'toggle',
            label: 'Smooth scrolling',
            value: true,
          },
        },
      },
      modal: null,
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
  props: {
    hideSidebar: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rootClass() {
      return {
        _edit: this.state.editMode,
      };
    },
    boardSummary() {
      return [...this.state.boards, ...this.parseSlotToConfig().boards];
    },
  },
  watch: {
    'state.activeBoardIdx'() {
      this.scrollToActiveBoard();
    },
    state: {
      deep: true,
      handler() {
        localStorage.setItem('headUp', JSON.stringify(this.state));
      },
    },
  },
  provide() {
    return {
      isEditing: () => this.state.editMode,
      handleEditDone: this.handleEditDone,
      handleEditSave: this.handleEditSave,
    };
  },
  created() {
    if (persistedState) {
      this.state = JSON.parse(persistedState);
    }
  },
  mounted() {
    window.addEventListener('resize', () => this.scrollToActiveBoard(false));
    this.scrollToActiveBoard(false);
  },
  methods: {
    handleSidebarToggle(value) {
      this.state.showSidebar =
        typeof value === 'undefined' ? !this.state.showSidebar : value;
    },
    handleActivateBoard(value) {
      this.state.activeBoardIdx = value;
    },
    handleToggleEdit(value) {
      this.state.editMode =
        typeof value === 'undefined' ? !this.state.editMode : value;
    },
    handleEditSave(board, payload) {
      console.log('Save board edit', board, payload);
    },
    handleEditDone() {
      this.state.editMode = false;
    },
    handleAddBoard() {
      const newBoardTemplate = {
        title: `Board #${this.state.boards.length + 1}`,
        id: uniqueId(),
        cells: [
          {
            title: 'Cell #1',
          },
        ],
      };

      this.state.boards = [newBoardTemplate, ...this.state.boards];
      this.state.activeBoardIdx = 0;
      this.handleToggleEdit(true);
    },
    handleRemoveBoard(id) {
      const deletedIndex = this.state.boards.findIndex(x => x.id === id);
      this.state.boards = this.state.boards.filter(x => x.id !== id);

      if (this.state.activeBoardIdx === this.state.boards.length) {
        this.state.activeBoardIdx--;
      } else if (this.state.activeBoardIdx === deletedIndex) {
        this.state.activeBoardIdx = deletedIndex;
      } else {
        this.state.activeBoardIdx = deletedIndex - 1;
      }
    },
    handleKeys(evt) {
      switch (evt.srcKey) {
        case 'up':
          this.activatePreviousBoard();
          break;
        case 'down':
          this.activateNextBoard();
          break;
        case 'sidebar':
          this.handleSidebarToggle();
          break;
        case 'edit':
          this.handleToggleEdit();
          break;
        case 'add':
          this.handleAddBoard();
          break;
        case 'help':
          this.toggleHelpScreen();
          break;
        default:
      }
    },
    scrollToActiveBoard(useGlobalSetting = true) {
      const boardEls = get(this.$refs, 'boardsContainer.$el.childNodes', []);
      const currentBoardEl = boardEls[this.state.activeBoardIdx];
      if (!currentBoardEl) {
        return;
      }
      const scrollOptions =
        useGlobalSetting && this.state.settings.smoothScrolling.value
          ? { behavior: 'smooth' }
          : {};
      currentBoardEl.scrollIntoView(scrollOptions);
    },
    activateNextBoard() {
      if (this.state.activeBoardIdx === this.boardSummary.length - 1) {
        this.handleActivateBoard(0);
        return;
      }
      this.handleActivateBoard(this.state.activeBoardIdx + 1);
    },
    activatePreviousBoard() {
      if (this.state.activeBoardIdx === 0) {
        this.handleActivateBoard(this.boardSummary.length - 1);
        return;
      }
      this.handleActivateBoard(this.state.activeBoardIdx - 1);
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
    toggleHelpScreen() {
      this.toggleModal({ name: 'help', heading: 'Keyboard help' });
    },
    toggleSettingsScreen() {
      this.toggleModal({ name: 'settings', heading: 'Settings' });
    },
    toggleModal(modalData) {
      const existingModalName = this.modal && this.modal.name;
      this.modal = existingModalName === modalData.name ? null : modalData;
    },
    handleSettingsSave(payload) {
      this.state.settings = payload;
    },
  },
};
</script>

<style src="../../css/util.css"/>

<style scoped>
>>> * {
  &,
  &::before,
  &::after {
    box-sizing: border-box;
    margin: 0;
  }
}

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
