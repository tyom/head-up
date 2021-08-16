<script setup>
import { defineComponent } from 'vue';
import { store } from '../store';
import Sidebar from './_Sidebar.vue';

defineComponent({
  name: 'App',
  components: {
    Sidebar,
  },
});
</script>

<template>
  <div class="head-up">
    <aside>
      <Sidebar :boards="store.getters.serialisedBoards" />
    </aside>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="postcss">
.head-up {
  @apply flex h-screen;

  & > * {
    @apply items-stretch;
  }
}

aside {
  @apply bg-gray-800 w-1/5;
  min-width: 200px;
}

main {
  @apply flex-1 h-full overflow-auto;

  & > ::v-deep(*) {
    @apply h-screen;
  }
}
</style>
