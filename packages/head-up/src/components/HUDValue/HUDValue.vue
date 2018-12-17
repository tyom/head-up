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
      <template v-if="value">
        {{ tween && tweenedValue || value }}
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
  name: 'HUDValue',
  props: {
    label: {
      type: String,
      default: '',
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
.HUDValue {
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
