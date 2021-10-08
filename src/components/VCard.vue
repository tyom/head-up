<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: undefined
  }
});
</script>

<template>
  <div class="v-card">
    <div v-if="image" class="image">
      <img :src="image" alt="">
    </div>
    <div class="body">
      <h2>{{ title }}</h2>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.v-card {
  @apply flex flex-1;
  box-shadow: 1px 4px 10px #0005;
}

.image {
  @apply flex-1;
}

.body {
  @apply p-4 text-left space-y-2;
  flex: 2;
}

h2 {
  @apply text-lg font-bold;
}
</style>
