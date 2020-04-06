<template>
  <div class="Boards">
    <transition-group tag="ul" name="boardReveal" class="board-list">
      <li
        v-for="board in boards"
        :key="board.id"
        :class="getBoardListItemClass(board)"
        :title="getBoardTitle(board)"
        class="relative"
      >
        <transition name="actionsReveal">
          <div v-if="editMode && board.editable" class="board-actions">
            <button
              type="button"
              class="remove-button"
              @click="$emit('remove', board.id)"
            >
              <v-icon name="minus-circle" />
            </button>
          </div>
        </transition>
        <button class="board-button" @click="$emit('activate', board.id)">
          <Board :id="board.id" :cells="board.cells" preview class="board" />
        </button>
        <div v-if="board.title" class="board-title">
          {{ board.title }}
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import Board from '../Board';

export default {
  components: {
    Board,
  },
  props: {
    boards: {
      type: Array,
      default: () => [],
    },
    activeId: {
      type: String,
      default: '',
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getBoardTitle(board) {
      return board.title + (board.editable ? '' : ' (read-only)');
    },
    getBoardListItemClass(board) {
      return {
        _active: this.activeId === board.id,
        ['_read-only']: !board.editable,
      };
    },
  },
};
</script>

<style scoped>
.board-list {
  @apply grid gap-3;
}

.board-title {
  @apply text-xs text-center mt-1 -mx-2 transition duration-100;
}

.board {
  @apply transition duration-200 relative border;
  border-color: #fff4;
  min-width: 4rem;
  height: 10vh;

  &:hover {
    border-color: #fff8;
  }

  @nest ._active &,
  &:active {
    @apply border-white;
  }
}

.board-button {
  @apply block w-full p-px outline-none cursor-default;

  &.focus-visible {
    @apply shadow-outline;
  }
}

.board:hover + .board-title {
  @apply text-white;
}

._read-only .board::after {
  @apply opacity-0 absolute inset-0 transition duration-200 pointer-events-none;
  content: '';
  background: repeating-linear-gradient(
    -45deg,
    #fff0,
    #fff0 0.5rem,
    #fff1 0.5rem,
    #fff1 1rem
  );

  @nest ._edit & {
    @apply opacity-100;
  }
}

.board-actions {
  @apply absolute z-10;
  top: -0.2rem;
  right: -0.2rem;
}

.remove-button {
  @apply flex p-px bg-white rounded-full outline-none text-red-800 shadow;

  & .fa-icon {
    @apply w-3 h-3;
  }

  &:hover {
    @apply text-red-700;
  }

  &:active {
    @apply text-red-900;
  }
}

.boardReveal-enter-active,
.boardReveal-leave-active {
  transition: 0.1s;
}
.boardReveal-enter,
.boardReveal-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.actionsReveal-enter-active,
.actionsReveal-leave-active {
  transition: 0.1s;
}
.actionsReveal-enter,
.actionsReveal-leave-to {
  transform: scale(0.1);
}
</style>
