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
      @toggle:settings="toggleSettingsScreen"
      @toggle:help="toggleHelpScreen"
    />
    <div class="main">
      <transition name="boardTitle">
        <div v-if="activeBoardTitle" class="board-title">
          {{ activeBoardTitle }}
        </div>
      </transition>
      <HeadUpBoards :boards="editableBoards" ref="boardContainer">
        <slot />
      </HeadUpBoards>
    </div>
    <ModalDialogue :content="modal" @close="modal = null" />
  </div>
</template>

<script>
import { get } from 'lodash';
import ally from 'ally.js';
import store from '../../store';
import { serializeSlot } from '../../transformers';
import ModalDialogue from '../ModalDialogue';
import Sidebar from '../Sidebar';
import HeadUpBoards from './HeadUpBoards';

export default {
  name: 'HeadUp',
  components: {
    HeadUpBoards,
    Sidebar,
    ModalDialogue,
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
  data() {
    return {
      state: store.state,
      activeBoard: null,
      activeBoardTitle: null,
      activeBoardTitleTimeout: null,
      focusTrap: null,
      persistedState: null,
      modal: null,
      tabFocused: true,
      shortkeys: {
        up: ['k'],
        down: ['j'],
        sidebar: ['s'],
        edit: ['e'],
        add: ['a'],
        settings: ['shift', '<'],
        help: ['shift', '?'],
      },
    };
  },
  computed: {
    editableBoards() {
      return store.state.serializedBoards.filter(x => x.editable);
    },
    activeBoardIndex() {
      return store.state.serializedBoards.findIndex(
        x => x.id === this.state.activeBoardId,
      );
    },
    rootClass() {
      return {
        _edit: this.state.editMode,
        _paused: !this.tabFocused,
      };
    },
  },
  created() {
    store.dispatch('INIT_BOARDS', {
      fromProps: [...this.editableBoards, ...this.boards],
      fromSlots: serializeSlot(this.$slots.default),
    });
  },
  mounted() {
    // set up watchers on mount to get access to elements to scroll to
    this.setUpWatchers();

    const initialBoardId =
      this.state.activeBoardId || get(this.state, 'serializedBoards.[0].id');
    store.dispatch('ACTIVATE_BOARD', initialBoardId);

    window.addEventListener('focus', () => {
      this.tabFocused = true;
    });
    window.addEventListener('blur', () => {
      this.tabFocused = false;
    });
  },
  methods: {
    setUpWatchers() {
      this.$watch(
        'state.editMode',
        newVal => {
          newVal
            ? this.trapFocusInBoard(this.state.activeBoardId)
            : this.untrapFocus();
        },
        { immediate: true },
      );

      this.$watch(
        'state.activeBoardId',
        (newId, oldId) => {
          newId && this.activateBoard(newId, Boolean(oldId));
        },
        { immediate: true },
      );

      window.addEventListener('resize', () => {
        this.activateBoard(this.state.activeBoardId, false);
      });
    },
    activateBoard(boardId, smoothScroll = true) {
      this.scrollToBoard(boardId, smoothScroll);
      this.displayBoardTitle(boardId);

      if (this.state.editMode) {
        this.trapFocusInBoard(this.state.activeBoardId);
      }
    },
    scrollToBoard(boardId, smoothScroll) {
      const boardEl = this.$refs.boardContainer.$el.querySelector(
        `#board-${boardId}`,
      );

      if (!boardEl) {
        return;
      }

      const scrollOptions =
        smoothScroll && this.state.settings.smoothScrolling.value
          ? { behavior: 'smooth' }
          : {};
      boardEl.scrollIntoView(scrollOptions);
    },
    displayBoardTitle(boardId, timeout = 1600) {
      const board = this.state.serializedBoards.find(x => x.id === boardId);
      if (!board) {
        return;
      }
      this.activeBoardTitle = board.title;
      // self-destruct
      clearTimeout(this.activeBoardTitleTimeout);
      this.activeBoardTitleTimeout = setTimeout(() => {
        this.activeBoardTitle = null;
      }, timeout);
    },
    trapFocusInBoard(boardId) {
      this.untrapFocus();

      const boardEl = this.$refs.boardContainer.$el.querySelector(
        `#board-${boardId}`,
      );
      this.focusTrap = ally.maintain.tabFocus({
        context: boardEl,
      });
    },
    untrapFocus() {
      if (this.focusTrap) {
        this.focusTrap.disengage();
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
          store.dispatch('TOGGLE_SIDEBAR');
          break;
        case 'edit':
          store.dispatch('TOGGLE_EDIT_MODE');
          break;
        case 'add':
          store.dispatch('ADD_BOARD');
          break;
        case 'settings':
          this.toggleSettingsScreen();
          break;
        case 'help':
          this.toggleHelpScreen();
          break;
        case 'escape':
          this.closeModal();
          break;
        default:
      }
    },
    activateNextBoard() {
      const { serializedBoards } = this.state;
      const nextId =
        this.activeBoardIndex === serializedBoards.length - 1
          ? get(serializedBoards, '[0].id')
          : get(serializedBoards, `[${this.activeBoardIndex + 1}].id`);

      store.dispatch('ACTIVATE_BOARD', nextId);
    },
    activatePreviousBoard() {
      const { serializedBoards } = this.state;
      const prevId =
        this.activeBoardIndex === 0
          ? get(serializedBoards, `[${serializedBoards.length - 1}].id`)
          : get(serializedBoards, `[${this.activeBoardIndex - 1}].id`);

      store.dispatch('ACTIVATE_BOARD', prevId);
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
  },
};
</script>

<style src="../../css/util.css" />

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
  z-index: 1;
  background-color: #111a;
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
