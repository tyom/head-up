<template>
  <div :id="boardId" :class="boardClass" class="Board">
    <transition name="slideDown">
      <BoardToolbar
        v-if="!preview && editMode"
        :board="$props"
        @save="handleSave"
        @done="handleDone"
      />
    </transition>
    <div class="cells" :style="cellsStyle">
      <template v-if="preview">
        <div v-for="(cell, idx) in cells" :key="idx" class="cell-placeholder">
          <div
            class="cell-placeholder-child"
            v-for="(child, cidx) in cell.children"
            :key="cidx"
            :title="child.type"
          />
        </div>
      </template>
      <template v-else>
        <slot v-if="slotCells" />
        <Cell
          v-else
          v-for="(cell, idx) in cells"
          v-bind="cell"
          :editable="editable"
          :key="idx"
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
import { createGridTemplate } from '../../utils';
import merge from 'lodash/merge';

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
    grid: String,
    preview: {
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
      return this.preview ? null : `board-${this.id}`;
    },
    cellsStyle() {
      return {
        gridTemplateAreas: createGridTemplate(this.grid).template,
      };
    },
    boardClass() {
      return {
        _preview: this.preview,
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
    // layoutClass() {
    //   const cells = this.slotCells || this.cells;
    //   if (!cells.length) {
    //     return;
    //   }
    //   return [`grid-cols-${cells.length}`];
    // },
  },
  created() {
    if (!this.$slots.default) {
      return;
    }
    const { areas } = createGridTemplate(this.grid);
    this.$slots.default.forEach((vnode, idx) => {
      vnode.data = merge(vnode.data, {
        style: {
          gridArea: areas[idx],
        },
      });
    });
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
  @apply flex flex-grow flex-col h-screen p-2;
}

.cells {
  @apply grid h-full gap-2 overflow-auto;
}

._preview {
  padding: 3px;

  & .cells {
    gap: 3px;
  }
}

.cell-placeholder {
  @apply grid gap-px;
}

.cell-placeholder-child {
  background-color: #fff2;
}

.slideDown-enter-active,
.slideDown-leave-active {
  @apply transition duration-100 overflow-hidden;
}

.slideDown-enter,
.slideDown-leave-to {
  @apply h-0 opacity-0;
}
</style>
