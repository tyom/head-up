<script setup>
defineProps({
  title: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <div class="head-up-cell">
    <header v-if="title">{{ title }}</header>
    <section><slot /></section>
  </div>
</template>

<style scoped>
.head-up-cell {
  @apply flex flex-col
    border border-gray-800;
}

header {
  @apply p-2 leading-none
    border-b border-gray-800
    text-xs font-bold text-gray-500;
}

section {
  @apply p-2 flex-1;
}
</style>
