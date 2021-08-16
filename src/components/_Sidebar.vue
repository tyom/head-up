<script setup>
defineProps({
  boards: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="_sidebar">
    <div class="toggler">
      <button>&lt;</button>
    </div>
    <div class="container">
      <h2>Head Up</h2>
      <menu>
        <a
          v-for="board in boards"
          :key="board.id"
          :href="`#${board.id}`"
          class="list-item"
        >
          {{ board.title }}
        </a>
      </menu>
    </div>
  </div>
</template>

<style scoped>
._sidebar {
  @apply relative flex pl-8 h-full;
}

.toggler {
  @apply absolute inset-0 right-auto z-10
    w-8 flex items-center justify-center
    bg-gray-900;
}

.container {
  @apply p-4 flex-1 overflow-auto;
}

menu {
  @apply m-0 p-0;
}

* + menu {
  @apply mt-2;
}

button {
  @apply border p-2;
}
</style>
