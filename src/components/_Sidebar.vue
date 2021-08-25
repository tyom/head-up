<script setup>
import { computed } from 'vue';

defineEmits(['toggle']);

const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  activeBoard: {
    type: String,
    default: '',
  },
  boards: {
    type: Array,
    default: () => [],
  },
});

const toggleIcon = computed(() =>
  props.visible ? 'bx:bx-chevron-left' : 'bx:bx-dots-vertical-rounded'
);
</script>

<template>
  <div class="sidebar" :class="{ '--hidden': !visible }">
    <div class="toggler">
      <button @click="$emit('toggle')">
        <VIcon :icon="toggleIcon" width="24" />
      </button>
    </div>
    <div class="container">
      <ul>
        <li
          v-for="board in boards"
          :key="board.id"
          :class="{ '--active': activeBoard === board.id }"
        >
          <a :key="board.id" :href="`#${board.id}`" class="board-layout">
            <span
              v-for="(cell, idx) in board.cells"
              :key="idx"
              class="board-cell"
              :class="`--${cell}`"
            />
          </a>
          <span class="board-title">{{ board.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/index.css';

.sidebar {
  --min-width: 8rem;
  --max-width: 20rem;

  @apply relative flex pl-6 h-full w-1/6
    bg-gray-800
    overflow-hidden
    transition-all duration-200;
  min-width: calc(var(--min-width) + theme('spacing.6'));
  max-width: var(--max-width);

  &.--hidden {
    @apply w-0 min-w-0;

    & .container {
      @apply opacity-0;
    }
  }
}

.toggler {
  @apply fixed inset-0 right-auto z-10
    flex flex-col items-center justify-center;
  box-shadow: 1px 0 #fff2;

  & button {
    @apply bg-gray-900 flex-1 cursor-default;

    &:hover {
      @apply bg-opacity-80 backdrop-filter backdrop-brightness-125;
    }

    &:active {
      @apply bg-blue-900;

      & svg {
        @apply transform scale-125;
      }
    }
  }
}

.container {
  @apply p-3 flex-1 overflow-auto transition duration-200;
  box-shadow: inset -1px 0 #fff2, inset 0 3px 8px #0003;
  min-width: var(--min-width);
}

ul {
  @apply m-0 p-0;
}

* + ul {
  @apply mt-2;
}

li {
  @apply flex flex-col text-center
    text-sm text-gray-400;
}

li + li {
  @apply mt-4;
}

.board-layout {
  @apply border border-gray-900 shadow-lg
    board-grid-layout;
  height: 11vh;

  & .board-cell {
    @apply bg-gray-900;
  }

  &:active .board-cell {
    @apply bg-blue-900;
  }
}

.board-title {
  @apply mt-2;
}

.--active {
  & .board-layout {
    @apply border-gray-400;
  }

  & .board-title {
    @apply text-white;
  }
}
</style>
