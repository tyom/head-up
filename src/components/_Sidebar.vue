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
  layout: {
    type: String,
    validator: (prop) => ['row', 'column'].includes(prop),
    default: 'row',
  },
});

const toggleIcon = computed(() => {
  const icon =
    props.layout === 'row' ? 'bx:bx-chevron-up' : 'bx:bx-chevron-left';
  const dots =
    props.layout === 'row' ? 'bi:three-dots' : 'bi:three-dots-vertical';
  return props.visible ? icon : dots;
});
</script>

<template>
  <div class="sidebar" :class="{ '--hidden': !visible, [`--${layout}`]: true }">
    <div class="toggler">
      <button
        aria-label="toggle sidebar"
        title="Toggle Sidebar (Press 's')"
        @click="$emit('toggle')"
      >
        <Icon :icon="toggleIcon" width="24" />
      </button>
    </div>
    <div class="wrapper">
      <transition name="slide-fade">
        <ul v-if="visible">
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
      </transition>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/index.css';

.sidebar {
  @apply relative flex
    bg-opacity-30 bg-black
    overflow-hidden
    text-xs lg:text-sm text-gray-400;
  transition: all 300ms ease;

  &.--row {
    @apply flex-shrink-0 max-h-80;
    padding-top: calc(theme('spacing.6') + 1px);
  }

  &.--column {
    @apply h-full w-1/6;
    min-width: calc(theme('spacing.32') + theme('spacing.6'));
    max-width: theme('spacing.80');
    padding-left: calc(theme('spacing.6') + 1px);
  }
}

.toggler {
  @apply fixed inset-0 z-10
    flex items-center justify-center;

  & button {
    @apply bg-gray-900 flex-1 cursor-default;

    & svg {
      @apply m-auto;
    }

    &:hover {
      @apply bg-opacity-80 backdrop-filter backdrop-brightness-125;
    }

    &:focus-visible {
      @apply outline-none;
      box-shadow: inset 0 0 0 2px theme('colors.blue.800');
    }

    &:active {
      @apply bg-blue-900;

      & svg {
        @apply transform scale-125;
      }
    }
  }
}

.wrapper {
  @apply p-3 flex-1;
}

ul {
  @apply m-0 p-0 flex;
}

li {
  @apply relative flex flex-col justify-center items-center
    p-1 border border-gray-800;
}

.board-layout {
  @apply shadow-lg
    board-grid-layout p-0;

  &:hover {
    @apply border-gray-600;
  }

  &:focus-visible {
    @apply outline-none;
    box-shadow: inset 0 0 0 2px theme('colors.blue.800');
  }

  & .board-cell {
    @apply bg-gray-800;
  }

  &:active .board-cell {
    @apply bg-blue-900;
  }
}

.board-title {
  @apply absolute pointer-events-none
    text-center
    bg-black bg-opacity-50
    py-1 px-2 md:px-3 mx-2
    rounded-full;
  transition: 200ms;
}

.--active {
  @apply border-gray-300;

  & .board-title {
    @apply text-white;
  }
}

.--row {
  @apply w-full;

  & .toggler {
    @apply bottom-auto flex-row;
    box-shadow: 0 1px #fff2;
  }

  & .wrapper {
    @apply overflow-x-scroll;
    box-shadow: inset 0 -1px #fff2, inset 3px 0 8px #0003;
    min-height: theme('spacing.32');
  }

  & ul {
    @apply flex-row space-x-4;
  }

  & .board-layout {
    height: 15vh;
    width: 20vw;
  }

  &.--hidden {
    @apply max-h-0;
  }
}

.--column {
  & .toggler {
    @apply right-auto flex-col;
    box-shadow: 1px 0 #fff2;
  }

  & .wrapper {
    @apply overflow-y-scroll;
    box-shadow: inset -1px 0 #fff2, inset 0 3px 8px #0003;
    min-width: theme('spacing.32');
  }

  & ul {
    @apply flex-col space-y-4;
  }

  & .board-layout {
    height: 12vh;
    width: 100%;
  }

  &.--hidden {
    @apply max-w-0 min-w-0;
  }
}

.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 300ms ease;

  & .board-title {
    opacity: 0;
    transform: scale(0.6);
  }
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-110%) scale(0.8);
  opacity: 0;
}

@screen md {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-110%);
    opacity: 0;
  }
}
</style>
