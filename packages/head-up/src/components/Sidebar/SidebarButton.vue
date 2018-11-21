<template>
  <button
    v-bind="$attrs"
    type="button"
    class="button"
    v-on="$listeners"
  >
    <slot/>
  </button>
</template>

<style scoped>
.button {
  width: 100%;
  padding: 0.5em;
  background: none;
  color: inherit;
  border: 0;
  outline: 0;

  &:hover {
    color: #fff;
    background-color: #ffffff05;
  }

  &:active {
    color: #fff;
    animation: bounce-1 0.1s forwards;
    background-color: #2b5691;
  }

  &._active {
    background-color: #20416d;
    color: #fff;
  }
}
</style>
