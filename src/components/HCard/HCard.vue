<template>
  <div class="HCard flex p-2">
    <div class="image">
      <img :src="image" alt="" />
    </div>
    <div class="content flex flex-col">
      <h2 v-if="title" class="text-xl font-bold">
        {{ title }}
      </h2>
      <div class="subtitle">
        <slot name="subtitle" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.content {
  flex: 1;
}

.content > * + * {
  @apply mt-3;
}
.image + .content {
  @apply ml-3;
}

.image {
  min-width: 8rem;
  max-width: 12rem;
}
</style>
