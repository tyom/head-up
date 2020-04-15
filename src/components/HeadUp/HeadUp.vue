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
      <Boards :boards="editableBoards" ref="boardContainer">
        <slot />
      </Boards>
    </div>
    <ModalDialogue :content="modal" @close="modal = null" />
  </div>
</template>

<script>
import get from 'lodash/get';
import ally from 'ally.js';
import store from '../../store';
import { serializeSlot } from '../../transformers';
import ModalDialogue from '../ModalDialogue';
import Sidebar from '../Sidebar';
import Boards from './Boards';

export default {
  name: 'HeadUp',
  components: {
    Boards,
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
          window.location.hash = newId;
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
.HeadUp {
  @apply flex items-center h-screen;
  @apply bg-gray-900 transition transition-colors duration-300;

  &._edit {
    @apply bg-blue-900;

    & >>> .Cell {
      @apply shadow-md;
    }
  }
}

.board-title {
  @apply absolute top-1/2 left-1/2 z-10 px-8 py-4;
  @apply transform -translate-y-1/2 -translate-x-1/2;
  @apply text-white rounded-full;
  background-color: #111a;
}

.main {
  @apply flex flex-col flex-grow relative h-full;
}

.boardTitle-enter-active,
.boardTitle-leave-active {
  @apply transition duration-300;
}
.boardTitle-enter,
.boardTitle-leave-to {
  @apply opacity-0;
}
</style>
