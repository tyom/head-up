<script setup>
import { Icon } from '@iconify/vue';
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
      <button
        aria-label="toggle sidebar"
        title="Toggle Sidebar (Press 's')"
        @click="$emit('toggle')"
      >
        <Icon :icon="toggleIcon" width="24" />
      </button>
    </div>
    <div class="container">
      <ul>
        <li
          v-for="(board, bIdx) in boards"
          :key="board.id"
          :class="{ '--active': activeBoard === board.id }"
        >
          <a
            :key="board.id"
            :href="`#${board.id}`"
            :title="`Select board (press '${bIdx + 1}')`"
            class="board-layout"
          >
            <span
              v-for="(_, cIdx) in board.cells"
              :key="cIdx"
              class="board-cell"
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

  @apply relative flex h-full w-1/6
    bg-opacity-80 backdrop-filter backdrop-brightness-75
    overflow-hidden
    transition-all duration-200;
  min-width: calc(var(--min-width) + theme('spacing.6'));
  max-width: var(--max-width);
  padding-left: calc(theme('spacing.6') + 1px);

  &.--hidden {
    @apply w-0 min-w-0;

    & .container {
      @apply opacity-0;
    }
  }
}

.toggler {
  @apply fixed inset-y-0 left-0 z-10
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
  @apply border border-gray-800 shadow-lg
    board-grid-layout;
  height: 11vh;

  &:hover {
    @apply border-gray-600;
  }

  & .board-cell {
    @apply bg-gray-800;
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
    @apply border-gray-300;
  }

  & .board-title {
    @apply text-white;
  }
}
</style>
