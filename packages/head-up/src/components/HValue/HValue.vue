<template>
  <dl class="HValue">
    <dt class="label">{{ label }}</dt>
    <dd class="value">
      <v-icon
        v-if="hasIcon"
        :name="increase ? 'caret-up' : 'caret-down'"
        :class="increase ? 'change-increase' : 'change-decrease'"
      />
      <template v-if="value">
        {{ tween && tweenedValue || value | format(formatNumber) }}
      </template>
      <template v-else>
        N/A
      </template>
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
    formatNumber: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [String, Number],
      default: '',
    },
    increase: {
      type: Boolean,
      default: false,
    },
    decrease: {
      type: Boolean,
      default: false,
    },
    tween: {
      type: Boolean,
      default: true,
    },
    tweenFixed: {
      type: Number,
      default: 3,
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
  filters: {
    format(value, options) {
      return Number(value).toLocaleString(undefined, options);
    },
  },
};
</script>

<style scoped>
.HValue {
  text-align: center;
}

.value {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
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
