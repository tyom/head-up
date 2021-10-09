<script setup>
import {
  ref,
  watchEffect,
  defineComponent,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import tinykeys from 'tinykeys';
import { store } from '../store';
import LocalSidebar from './_Sidebar.vue';

defineComponent({
  components: {
    LocalSidebar,
  },
});

const storedHeadUpState = JSON.parse(
  window.localStorage.getItem('head-up') || '{}'
);

const sidebarVisible = ref(storedHeadUpState.sidebarVisible ?? true);
const activeBoardId = ref(window.location.hash.slice(1));
const activeBoardTitle = ref(null);
const sidebarLayout = ref('row');
const boards = ref(null);

let activeBoardTitleTimeout;

function handleHashChange(evt) {
  const [, boardId] = evt.newURL.split('#');
  activeBoardId.value = boardId;
}

function handleSidebarToggle() {
  sidebarVisible.value = !sidebarVisible.value;
  window.localStorage.setItem(
    'head-up',
    JSON.stringify({
      sidebarVisible: sidebarVisible.value,
    })
  );
}

function handleResize() {
  const mql = matchMedia('(min-width: 768px)');
  sidebarLayout.value = mql.matches ? 'column' : 'row';

  nextTick().then(() => {
    instantlyScrollToBoard(activeBoardId.value);
  });
}

function displayBoardTitle(boardId, timeout = 1600) {
  const activeBoard = store.state.boards.find((x) => x.id === boardId);
  activeBoardTitle.value = activeBoard?.title;
  // self-destruct
  clearTimeout(activeBoardTitleTimeout);
  activeBoardTitleTimeout = setTimeout(() => {
    activeBoardTitle.value = null;
  }, timeout);
}

function instantlyScrollToBoard(boardId) {
  const activeBoard = document.getElementById(boardId);
  boards.value.scrollTo({
    top: activeBoard.offsetTop,
    left: activeBoard.offsetLeft,
    behavior: 'instant',
  });
}

watchEffect(() => {
  displayBoardTitle(activeBoardId.value);
});

onMounted(async () => {
  activeBoardId.value = activeBoardId.value || store.state.boards[0]?.id;

  handleResize();

  window.addEventListener('hashchange', handleHashChange);
  window.addEventListener('resize', handleResize);

  const boardShortcuts = store.state.boards.reduce(
    (acc, cur, idx) => ({
      ...acc,
      [idx + 1]: () => {
        window.location.hash = cur.id;
      },
    }),
    {}
  );

  tinykeys(window, {
    ...boardShortcuts,
    s: () => handleSidebarToggle(),
  });

  nextTick().then(() => {
    instantlyScrollToBoard(activeBoardId.value);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', handleHashChange);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="head-up">
    <LocalSidebar
      :visible="sidebarVisible"
      :active-board="activeBoardId"
      :boards="store.getters.serialisedBoards"
      :layout="sidebarLayout"
      @toggle="handleSidebarToggle"
    />
    <main>
      <transition name="fade">
        <h2 v-if="activeBoardTitle" class="active-board-title">
          {{ activeBoardTitle }}
        </h2>
      </transition>
      <div
        class="boards"
        ref="boards"
        :class="{
          [`--${sidebarLayout}`]: true,
        }"
      >
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped lang="postcss">
.head-up {
  @apply flex h-screen flex-col md:flex-row
    bg-gray-900 text-gray-100
    overflow-hidden;

  & > * {
    @apply items-stretch;
  }
}

.active-board-title {
  @apply absolute z-20 top-1/2 left-1/2
    transform -translate-x-1/2 -translate-y-1/2
    py-5 px-10 rounded-full h-auto
    text-lg bg-black bg-opacity-60;
}

main {
  @apply relative flex-1 overflow-hidden;
}

.boards {
  @apply flex h-full overflow-hidden;
  scroll-behavior: smooth;

  &.--row {
    @apply flex-row;
  }

  &.--column {
    @apply flex-col;
  }

  & > ::v-deep(*) {
    @apply h-full w-full flex-shrink-0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
