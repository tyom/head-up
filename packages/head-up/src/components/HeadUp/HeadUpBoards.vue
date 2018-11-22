<template>
  <div class="HeadUpBoards">
    <Board
      v-for="(board, idx) in boards"
      ref="activeBoardEl"
      :title="board.title"
      :cells="board.cells"
      :editable="!board.isReadOnly"
      :key="board.title + board.id + idx"
      @update="handleBoardUpdate(idx, $event)"
    />
    <slot/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
  },
  methods: {
    ...mapActions(['UPDATE_BOARD']),
    handleBoardUpdate(idx, data) {
      this.UPDATE_BOARD({
        idx,
        data,
      });
    },
  },
};
</script>

<style scoped>
.HeadUpBoards {
  flex: 1;
  overflow: hidden;
}
</style>
