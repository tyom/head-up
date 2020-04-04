<template>
  <button class="Toggle" @click="$emit('toggle')">
    <v-icon :name="toggleIconName" />
  </button>
</template>

<script>
export default {
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    toggleIconName() {
      return this.toggled ? 'chevron-left' : 'ellipsis-v';
    },
  },
};
</script>

<style scoped>
.Toggle {
  @apply absolute overflow-hidden z-10 inset-0 right-auto;
  @apply w-6 h-full text-gray-500 outline-none transition duration-100 cursor-default;
  box-shadow: inset -1px 0 #fff2;

  &:hover {
    @apply text-white bg-gray-800;
  }

  &:active {
    @apply bg-blue-900;
    transform: scaleY(1.2);
  }

  &.focus-visible {
    box-shadow: inset 0 0 0 1px #fff6;
  }
}
</style>
