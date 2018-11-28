<template>
  <div class="HeadUpBoards">
    <Board
      v-for="(board, idx) in boards"
      ref="activeBoardEl"
      :title="board.title"
      :cells="board.cells"
      :editable="!board.isReadOnly"
      :key="board.title + board.id + idx"
    />
    <slot/>
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
  },
};
</script>

<style scoped>
.HeadUpBoards {
  flex: 1;
  overflow: hidden;
}
</style>
