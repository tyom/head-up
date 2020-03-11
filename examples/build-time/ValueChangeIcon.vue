<template>
  <v-icon
    v-if="changeValue"
    :name="changeValue > 0 ? 'caret-up' : 'caret-down'"
    :class="changeValue > 0 ? 'change-increase' : 'change-decrease'"
  />
</template>

<script>
export default {
  props: {
    changeValue: {
      type: [String, Number],
      default: undefined,
    },
  },
};
</script>

<style scoped>
.fa-icon {
  width: 1.1em;
  height: 1.1em;
  vertical-align: middle;
  display: inline-block;
}

.change-increase {
  color: #00c200;
}

.change-decrease {
  color: #ff313e;
}
</style>
