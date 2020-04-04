<template>
  <button v-bind="$attrs" type="button" class="button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped>
button {
  @apply p-2 rounded shadow;
  background-color: #fff1;

  &:hover {
    background-color: #fff2;
  }

  &:focus {
    @apply outline-none;
  }

  &._active {
    @apply bg-gray-900 shadow-inner text-white;
  }

  &:active {
    @apply bg-blue-900;
  }

  &.focus-visible {
    @apply shadow-outline;
  }
}
</style>
