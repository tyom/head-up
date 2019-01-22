<template>
  <dl class="HValue">
    <dt class="label">{{ label }}</dt>
    <dd class="value-wrapper">
      <slot name="pre-value"/>
      <span class="value" v-if="value">
        <slot
          v-if="$scopedSlots.value"
          name="value"
          :value="tween ? tweenedValue : value"
        />
        <template v-else>{{ value }}</template>
      </span>
      <span class="value _na" v-else>
        N/A
      </span>
      <slot name="post-value"/>
    </dd>
  </dl>
</template>

<script>
import { tween } from 'femtotween';

export default {
  name: 'HValue',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    tween: {
      type: Boolean,
      default: true,
    },
    tweenFixed: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    hasIcon() {
      return Boolean(this.increase) || Boolean(this.decrease);
    },
  },
  data() {
    return {
      tweenedValue: this.value,
    };
  },
  watch: {
    value(newVal, oldVal) {
      tween(oldVal, newVal, v => {
        const newNumber = Number(v);
        this.tweenedValue = newNumber ? newNumber.toFixed(this.tweenFixed) : v;
      });
    },
  },
};
</script>

<style scoped>
.HValue {
  margin: auto;
  text-align: center;
  padding: 0.25em;
}

.value-wrapper {
  white-space: nowrap;
  font-size: 1.3em;
}

.value {
  vertical-align: middle;

  &._na {
    opacity: 0.3;
  }
}
</style>
