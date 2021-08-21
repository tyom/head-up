<script setup>
import {
  ref,
  watchEffect,
  defineComponent,
  onMounted,
  onBeforeUnmount,
} from 'vue';
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
const smoothScroll = ref(false);
const activeBoardId = ref(window.location.hash.slice(1));
const activeBoardTitle = ref(null);

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

function displayBoardTitle(boardId, timeout = 1600) {
  const activeBoard = store.state.boards.find((x) => x.id === boardId);
  activeBoardTitle.value = activeBoard?.title;
  // self-destruct
  clearTimeout(activeBoardTitleTimeout);
  activeBoardTitleTimeout = setTimeout(() => {
    activeBoardTitle.value = null;
  }, timeout);
}

watchEffect(() => {
  displayBoardTitle(activeBoardId.value);
});

onMounted(() => {
  if (activeBoardId.value) {
    document.getElementById(activeBoardId.value)?.scrollIntoView();
  }
  smoothScroll.value = true;

  window.addEventListener('hashchange', handleHashChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', handleHashChange);
});
</script>

<template>
  <div class="head-up">
    <LocalSidebar
      :visible="sidebarVisible"
      :active-board="activeBoardId"
      :boards="store.getters.serialisedBoards"
      @toggle="handleSidebarToggle"
    />
    <main>
      <transition name="fade">
        <h2 v-if="activeBoardTitle" class="active-board-title">
          {{ activeBoardTitle }}
        </h2>
      </transition>
      <div class="boards" :class="{ '--smooth-scroll': smoothScroll }">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped lang="postcss">
.head-up {
  @apply flex h-screen
    bg-gray-900 text-gray-100;

  & > * {
    @apply items-stretch;
  }
}

.active-board-title {
  @apply absolute top-1/2 left-1/2
    transform -translate-x-1/2 -translate-y-1/2
    py-5 px-10 rounded-full h-auto
    text-lg bg-black bg-opacity-60;
}

main {
  @apply relative flex-1;
}

.boards {
  @apply h-full overflow-hidden;

  &.--smooth-scroll {
    scroll-behavior: smooth;
  }

  & > ::v-deep(*) {
    @apply h-screen;
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
