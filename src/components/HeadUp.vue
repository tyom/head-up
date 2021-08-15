<template>
  <div class="head-up">
    <aside>
      <HeadUpSidebar />
    </aside>
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeadUpSidebar from './HeadUpSidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeadUpSidebar,
  },
});
</script>

<style scoped>
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

  & > /deep/ * {
    @apply h-screen;
  }
}
</style>
