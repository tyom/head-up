<template>
  <dl class="HUDValue">
    <dt class="label">{{ label }}</dt>
    <dd class="value">
      <v-icon
        v-if="increase"
        name="caret-up"
        class="change-increase"
      />
      <v-icon
        v-if="decrease"
        name="caret-down"
        class="change-decrease"
      />
      {{ tweenedValue }}
    </dd>
  </dl>
</template>

<script>
import { tween } from 'femtotween';

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
  data() {
    return {
      tweenedValue: this.value || 'N/A',
    };
  },
  watch: {
    value(newVal, oldVal) {
      tween(oldVal, newVal, v => {
        const newNumber = Number(v);
        this.tweenedValue = newNumber ? newNumber.toFixed(3) : v;
      });
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
