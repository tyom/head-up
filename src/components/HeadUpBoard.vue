<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <div class="head-up-board">
    <header>
      <h2>{{ title }}</h2>
    </header>
    <article>
      <slot />
    </article>
  </div>
</template>

<style scoped>
.head-up-board {
  @apply flex flex-col;
}

header {
  @apply bg-gray-700 p-4;
}

article {
  @apply p-2 grid h-full gap-2 overflow-auto;
}
</style>
