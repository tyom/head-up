<template>
  <dl class="HUDValue">
    <dt class="label">{{ label }}</dt>
    <dd class="value">
      <template v-if="value">
        <v-icon
          name="caret-up"
          v-if="increase"
          class="change-increase"
        />
        <v-icon
          name="caret-down"
          v-if="decrease"
          class="change-decrease"
        />
        {{ value }}
      </template>
      <template v-else>
        N/A
      </template>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'HUDValue',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: null,
    },
    increase: {
      type: Boolean,
      default: false,
    },
    decrease: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.value {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fa-icon {
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.2em;
}

.change-increase {
  color: #00c200;
}

.change-decrease {
  color: #ff313e;
}
</style>
