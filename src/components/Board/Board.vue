<template>
  <div :id="boardId" :class="boardClass" class="Board">
    <transition name="slideDown">
      <BoardToolbar
        v-if="!isThumb && editMode"
        :board="$props"
        @save="handleSave"
        @done="handleDone"
      />
    </transition>
    <div :class="layoutClass" class="cells">
      <template v-if="isThumb">
        <div v-for="(cell, idx) in cells" :key="idx" class="cell-placeholder" />
      </template>
      <template v-else>
        <slot v-if="slotCells" />
        <Cell
          v-else
          v-for="(cell, idx) in cells"
          v-bind="cell"
          :editable="editable"
          :key="idx"
          class="cell"
        />
      </template>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import store from '../../store';
import Cell from '../Cell';
import BoardToolbar from './BoardToolbar';

export default {
  name: 'Board',
  components: {
    Cell,
    BoardToolbar,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    isThumb: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    cells: {
      type: Array,
      default: () => [],
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    boardId() {
      return this.isThumb ? null : `board-${this.id}`;
    },
    boardClass() {
      return {
        _thumb: this.isThumb,
      };
    },
    editMode() {
      return store.state.editMode;
    },
    slotCells() {
      if (!this.$slots.default) {
        return;
      }
      const cells = this.$slots.default.filter(
        (x) => get(x, 'componentOptions.tag') === 'Cell',
      );
      return cells.length ? cells : undefined;
    },
    layoutClass() {
      const cells = this.slotCells || this.cells;
      if (!cells.length) {
        return;
      }
      return [`u-grid-${cells.length}-x`];
    },
  },
  methods: {
    handleSave(newState) {
      store.dispatch('UPDATE_BOARD', {
        boardId: this.id,
        payload: newState,
      });
    },
    handleDone(newState) {
      if (this.editable) {
        this.handleSave(newState);
      }
      store.dispatch('TOGGLE_EDIT_MODE', false);
    },
  },
};
</script>

<style scoped>
.Board {
  @apply flex flex-grow flex-col h-full;
}

.cell-placeholder {
  background-color: rgba(#fff, 0.1);
}

.cells {
  height: 100%;
  grid-gap: 0.5em;
  padding: 0.5em;
  overflow: auto;
}

._thumb {
  font-size: 0.8em;
  margin: auto;

  & .cells {
    padding: 2px;
    grid-gap: 2px;
  }

  & .cell {
    border: 0;
    background-color: #fff2;
  }
}

.slideDown-enter-active,
.slideDown-leave-active {
  transition: 0.1s;
  overflow: hidden;
}

.slideDown-enter,
.slideDown-leave-to {
  height: 0;
  opacity: 0;
}
</style>
