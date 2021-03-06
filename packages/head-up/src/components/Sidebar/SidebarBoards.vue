<template>
  <div class="SidebarBoards">
    <transition-group
      tag="ul"
      name="boardReveal"
      class="board-list"
    >
      <li
        v-for="board in boards"
        :key="board.id"
        :class="getBoardListItemClass(board)"
        :title="getBoardTitle(board)"
        class="list-item"
      >
        <transition name="actionsReveal">
          <div v-if="editMode && board.editable" class="board-actions">
            <button
              type="button"
              class="remove-button"
              @click="$emit('remove', board.id)"
            >
              <v-icon name="minus-circle"/>
            </button>
          </div>
        </transition>
        <button
          class="board-button"
          @click="$emit('activate', board.id)"
        >
          <Board
            :id="board.id"
            :cells="board.cells"
            is-thumb
            class="board"
          />
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
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-gap: 1em;
}

.list-item {
  position: relative;
}

.board-title {
  font-size: 0.6em;
  margin: 0.5em -1em 0;
  text-align: center;
  transition: 0.1s;
}

.board {
  position: relative;
  border: 1px solid #fff2;
  min-width: 4rem;
  width: 8vw;
  height: 10vh;
  transition: 0.2s;

  &:hover {
    border-color: #fff5;
  }

  @nest ._active & {
    border-color: #fffa;
  }

  &:active {
    border-color: #fff;
  }
}

.board-button {
  background: none;
  padding: 2px;
  border: 0;
  outline: 0;

  &.focus-visible {
    box-shadow: 0 0 0 1px rgba(#fff, 0.5);
  }
}

.board:hover + .board-title {
  color: #fff;
}

._read-only .board::after {
  content: '';
  opacity: 0;
  transition: 0.2s;
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  pointer-events: none;
  background: repeating-linear-gradient(
    -45deg,
    rgba(#fff, 0),
    rgba(#fff, 0) 0.5rem,
    rgba(#fff, 0.03) 0.5rem,
    rgba(#fff, 0.03) 1rem
  );

  @nest ._edit & {
    opacity: 1;
  }
}

.toggle {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1.6rem;
  border: 0;
  color: inherit;
  outline: 0;
  background-color: #111;
  border-right: 1px solid #fff2;

  &:hover {
    color: #fff;
    background-color: #161616;
  }

  &:active {
    background-color: #142a59;
  }
}

.board-actions {
  position: absolute;
  z-index: 1;
  top: -0.5rem;
  right: -0.5rem;
}

.remove-button {
  border: 0;
  padding: 1px;
  background: #fff;
  color: #740000;
  border-radius: 50%;
  display: flex;
  outline: 0;

  & .fa-icon {
    width: 0.8rem;
    height: 0.8rem;
  }

  &:hover {
    color: #bb0000;
  }

  &:active {
    color: #800000;
  }
}

.board-actions {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
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
