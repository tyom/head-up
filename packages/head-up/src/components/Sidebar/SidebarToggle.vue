<template>
  <div class="SidebarToggle">
    <button class="toggle" @click="$emit('toggle')">
      <v-icon :name="toggleIconName"/>
    </button>
  </div>
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
.SidebarToggle {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  box-shadow: 1px 0 1px rgba(#000, 0.5), inset -1px 0 rgba(#fff, 0.1);
}

.toggle {
  width: 1.6rem;
  height: 100%;
  font-size: 1rem;
  border: 0;
  color: inherit;
  outline: 0;
  background-color: transparent;
  transition: background-color 0.1s;

  &:hover {
    color: #fff;
    background-color: rgba(#000, 0.2);
  }

  &:active {
    background-color: #142a59;
    transform: scaleY(1.2);
  }

  &.focus-visible {
    box-shadow: inset 0 0 0 1px rgba(#fff, 0.3);
  }
}
</style>
