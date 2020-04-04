<template>
  <div class="BoardToolbar">
    <form class="toolbar-container" @submit.prevent="$emit('save', boardState)">
      <div class="toolbar-item flex-grow">
        <input
          v-if="boardState.editable"
          v-model="boardState.title"
          type="text"
          class="toolbar-input"
          placeholder="Board title"
        />
        <span v-else class="toolbar-title">
          {{ boardState.title }} (read-only)
        </span>
      </div>
      <div class="toolbar-item ml-auto">
        <button v-if="boardState.editable" :disabled="!hasChanged" class="save">
          Apply
        </button>
        <button class="done" @click.prevent="$emit('done', boardState)">
          OK
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      boardState: { ...this.board },
    };
  },
  computed: {
    hasChanged() {
      return this.boardState.title !== this.board.title;
    },
  },
};
</script>

<style scoped>
.BoardToolbar {
  @apply bg-blue-700 flex shadow h-16;
}

.toolbar-container {
  @apply flex flex-grow;
}

.toolbar-item {
  @apply flex items-center p-2;
}

.toolbar-title {
  @apply p-4;
}

.toolbar-input {
  @apply w-full p-2 rounded bg-blue-300 transition duration-200;

  &:hover {
    @apply bg-blue-400;
  }

  &:focus {
    @apply text-black bg-white;
  }

  &::placeholder {
    @apply text-gray-700;
  }
}

button {
  @apply p-2 ml-2 bg-blue-900 text-white rounded shadow;

  &:hover:not(:disabled) {
    @apply bg-gray-900;
  }

  &[disabled] {
    @apply opacity-50 cursor-default text-gray-600;
  }
}

@screen lg {
  .toolbar-input {
    @apply max-w-3xl;
  }
}
</style>
