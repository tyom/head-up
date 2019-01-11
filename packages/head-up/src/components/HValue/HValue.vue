<template>
  <dl class="HValue">
    <dt class="label">{{ label }}</dt>
    <dd class="value-wrapper">
      <v-icon
        v-if="hasIcon"
        :name="increase ? 'caret-up' : 'caret-down'"
        :class="increase ? 'change-increase' : 'change-decrease'"
      />
      <span class="value" v-if="value">
        {{ tween && tweenedValue || value | format(formatNumber) }}
      </span>
      <span class="value _na" v-else>
        N/A
      </span>
    </dd>
  </dl>
</template>

<script>
import { tween } from 'femtotween';

export default {
  name: 'HValue',
  props: {
    align: {
      type: String,
      default: '',
    },
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
.value-wrapper {
  white-space: nowrap;
  font-size: 1.4em;
}

.value {
  vertical-align: middle;

  &._na {
    opacity: 0.3;
  }
}

.fa-icon {
  width: 1.2em;
  height: 1.2em;
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
