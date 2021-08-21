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
    <header>{{ title }}</header>
    <section><slot /></section>
  </div>
</template>

<style scoped>
.head-up-cell {
  @apply border border-gray-800 p-2;
}
</style>
