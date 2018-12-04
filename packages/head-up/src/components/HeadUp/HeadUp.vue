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
      @toggle="handleSidebarToggle"
      ref="sidebarContainer"
      @board:add="handleAddBoard"
      @board:remove="handleRemoveBoard"
      @board:activate="handleActivateBoard"
      @board:edit="handleToggleEdit"
      @modal:settings="toggleSettingsScreen"
      @modal:help="toggleHelpScreen"
    />
    <div class="main">
      <transition name="boardTitle">
        <div v-if="activeBoardTitle" class="board-title">
          {{ activeBoardTitle }}
        </div>
      </transition>
      <HeadUpBoards
        :boards="state.boards"
        ref="boardContainer"
      >
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
import { get } from 'lodash';
import Sentencer from 'sentencer';
import ally from 'ally.js';
import { serializeSlot } from '../../transformers';
import ModalDialogue from '../ModalDialogue';
import Sidebar from '../Sidebar';
import SettingsScreen from '../SettingsScreen';
import HelpScreen from '../HelpScreen';
import HeadUpBoards from './HeadUpBoards';

const shortkeys = {
  up: ['k'],
  down: ['j'],
  sidebar: ['s'],
  edit: ['e'],
  add: ['a'],
  settings: ['shift', '<'],
  help: ['shift', '?'],
};

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
        activeBoardId: null,
        editMode: false,
        showSidebar: true,
        boards: this.boards,
        settings: {
          smoothScrolling: {
            type: 'toggle',
            label: 'Smooth scrolling',
            value: true,
          },
          persistState: {
            type: 'toggle',
            label: 'Persist to local storage',
            value: true,
          },
        },
      },
      activeBoard: null,
      activeBoardTitle: null,
      activeBoardTitleTimeout: null,
      focusTrap: null,
      persistedState: null,
      modal: null,
      shortkeys,
    };
  },
  props: {
    hideSidebar: {
      type: Boolean,
      default: false,
    },
    boards: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    rootClass() {
      return {
        _edit: this.state.editMode,
      };
    },
    boardSummary() {
      return [...this.state.boards, ...serializeSlot(this.$slots.default)];
    },
    activeBoardIndex() {
      return this.boardSummary.findIndex(
        x => x.id === this.state.activeBoardId,
      );
    },
  },
  watch: {
    'state.editMode'() {
      this.handleFocusTrap();
    },
    state: {
      deep: true,
      handler(newVal) {
        // handle persistence to local storage
        if (newVal.settings.persistState.value) {
          localStorage.setItem('headUp', JSON.stringify(newVal));
          return;
        }
        // save persistence setting but not the state when disabled
        const newState = JSON.parse(this.persistedState);
        newState.settings.persistState.value =
          newVal.settings.persistState.value;
        localStorage.setItem('headUp', JSON.stringify(newState));
      },
    },
  },
  provide() {
    return {
      isEditing: () => this.state.editMode,
      getBoardSummary: () => this.boardSummary,
      getActiveBoardId: () => this.state.activeBoardId,
      handleEditDone: this.handleEditDone,
      handleEditSave: this.handleEditSave,
    };
  },
  created() {
    this.persistedState = localStorage.getItem('headUp');
    if (this.persistedState) {
      this.state = JSON.parse(this.persistedState);
    }
  },
  mounted() {
    if (!this.boardSummary.length) {
      return;
    }

    const initialBoardId =
      this.state.activeBoardId || get(this.boardSummary, '[0].id');
    this.setActiveBoard(initialBoardId, false);
  },
  methods: {
    getBoardById(id) {
      return this.$refs.boardContainer.$children.find(x => x.id === id);
    },
    setActiveBoard(boardId, smoothScroll = true) {
      this.state.activeBoardId = boardId;
      this.activeBoard = this.getBoardById(boardId);

      this.displayBoardTitle(boardId);

      if (!this.activeBoard) {
        return;
      }

      if (smoothScroll) {
        this.preferredScrollToBoard(this.activeBoard.$el);
      } else {
        this.activeBoard.$el.scrollIntoView();
      }
    },
    displayBoardTitle(boardId) {
      if (!boardId) {
        return;
      }

      const board = this.boardSummary.find(x => x.id === boardId);
      this.activeBoardTitle = board.title;

      // self-destruct
      clearTimeout(this.activeBoardTitleTimeout);
      this.activeBoardTitleTimeout = setTimeout(() => {
        this.activeBoardTitle = null;
      }, 1600);
    },
    handleFocusTrap() {
      this.focusTrap && this.focusTrap.disengage();

      if (!this.state.editMode || !this.activeBoard) {
        return;
      }

      this.focusTrap = ally.maintain.tabFocus({
        context: this.activeBoard.$el,
      });
    },
    handleSidebarToggle(value) {
      this.state.showSidebar =
        typeof value === 'undefined' ? !this.state.showSidebar : value;
    },
    handleActivateBoard(id) {
      this.state.activeBoardId = id;
      this.setActiveBoard(id);
    },
    handleToggleEdit(value) {
      this.state.editMode =
        typeof value === 'undefined' ? !this.state.editMode : value;
    },
    handleEditSave(board) {
      this.state.boards = this.state.boards.map(
        x => (x.id === board.id ? board : x),
      );
    },
    handleEditDone(board) {
      this.handleEditSave(board);
      this.state.editMode = false;
    },
    handleAddBoard() {
      const name = Sentencer.make('{{ adjective }} {{ noun }}');
      const boardId = name.replace(' ', '-');
      const newBoardTemplate = {
        title: name,
        id: boardId,
        editable: true,
        cells: [
          {
            title: 'Cell #1',
          },
        ],
      };

      this.state.boards = [newBoardTemplate, ...this.state.boards];
      this.handleToggleEdit(true);

      this.setActiveBoard(boardId);
    },
    handleRemoveBoard(id) {
      const deletedIndex = this.state.boards.findIndex(x => x.id === id);
      const activeIndex = this.activeBoardIndex;
      this.state.boards = this.state.boards.filter(x => x.id !== id);

      const beforeActive = deletedIndex < activeIndex;
      const active = deletedIndex === activeIndex;
      const afterActive = deletedIndex > activeIndex;
      const last = deletedIndex === this.boardSummary.length;
      const getBoardIdByIndex = idx => get(this.boardSummary, `[${idx}].id`);

      let nextId;

      if (beforeActive) {
        nextId = getBoardIdByIndex(activeIndex - 1);
      }
      if (active) {
        nextId = last
          ? getBoardIdByIndex(this.state.boards.length - 1)
          : getBoardIdByIndex(activeIndex);
      }
      if (afterActive) {
        nextId = getBoardIdByIndex(activeIndex);
      }
      this.setActiveBoard(nextId);
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
        case 'settings':
          this.toggleSettingsScreen();
          break;
        case 'help':
          this.toggleHelpScreen();
          break;
        default:
      }
    },
    preferredScrollToBoard(element) {
      if (!element) {
        return;
      }
      const scrollOptions = this.state.settings.smoothScrolling.value
        ? { behavior: 'smooth' }
        : {};
      element.scrollIntoView(scrollOptions);
    },
    activateNextBoard() {
      const nextId =
        this.activeBoardIndex === this.boardSummary.length - 1
          ? get(this.boardSummary, '[0].id')
          : get(this.boardSummary, `[${this.activeBoardIndex + 1}].id`);

      this.handleActivateBoard(nextId);
    },
    activatePreviousBoard() {
      const prevId =
        this.activeBoardIndex === 0
          ? get(this.boardSummary, `[${this.boardSummary.length - 1}].id`)
          : get(this.boardSummary, `[${this.activeBoardIndex - 1}].id`);

      this.handleActivateBoard(prevId);
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

.board-title {
  color: #fff;
  padding: 1em 2em;
  background-color: #0004;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2em;
}

.main {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.boardTitle-enter-active,
.boardTitle-leave-active {
  transition: 0.3s;
}
.boardTitle-enter,
.boardTitle-leave-to {
  opacity: 0;
}
</style>
