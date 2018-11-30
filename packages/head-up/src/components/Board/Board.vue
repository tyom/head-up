<template>
  <div :class="boardClass" class="Board">
    <transition name="slideDown">
      <BoardToolbar
        v-if="!isThumb && isEditing()"
        :board="$props"
      />
    </transition>
    <div :class="layoutClass" class="cells">
      <template v-if="isThumb">
        <div
          v-for="(cell, idx) in cells"
          :key="idx"
          class="cell-placeholder"
        />
      </template>
      <slot v-else-if="!cells.length" />
      <template v-else>
        <Cell
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
      default: '',
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
    boardClass() {
      return {
        _thumb: this.isThumb,
      };
    },
    layoutClass() {
      const cells = this.$slots.default ? this.$slots.default : this.cells;
      if (!cells.length) {
        return;
      }
      return [`u-grid-${cells.length}-x`];
    },
  },
  inject: ['isEditing'],
};
</script>

<style scoped>
.Board {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.cell-placeholder {
  background-color: rgba(#fff, 0.1);
}

.cells {
  height: 100%;
  grid-gap: 0.5em;
  padding: 0.5em;
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
