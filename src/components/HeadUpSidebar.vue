<template>
  <div class="head-up-sidebar">
    <div class="toggler">
      <button>&lt;</button>
    </div>
    <div class="container">
      <h2>Hello</h2>
    </div>
  </div>
</template>

<style scoped>
.head-up-sidebar {
  @apply relative pl-6 h-full;
}

.toggler {
  @apply absolute inset-0 right-auto z-10
    w-6 flex items-center justify-center
    bg-black;
}

.container {
  @apply p-4;
}
</style>
