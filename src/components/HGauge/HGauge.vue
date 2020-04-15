<template>
  <div class="HGauge">
    <div class="gauge">
      <svg :width="width" :height="height" viewBox="0 0 120 120">
        <circle class="meter" cx="60" cy="60" r="54" stroke-width="12" />
        <circle
          :style="valueStyles"
          class="value"
          cx="60"
          cy="60"
          r="54"
          stroke-width="12"
        />
      </svg>
      <span v-if="value" class="value">{{ value }}</span>
    </div>
    <span v-if="$slots.label" class="label">
      <slot name="label" />
    </span>
  </div>
</template>

<script>
import findKey from 'lodash/findKey';

export default {
  name: 'HGauge',
  props: {
    width: {
      type: String,
      default: '32',
    },
    height: {
      type: String,
      default: '32',
    },
    progress: {
      type: Number,
      default: 0,
    },
    colourRanges: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      radius: 54,
    };
  },
  computed: {
    valueStyles() {
      const circumference = 2 * Math.PI * this.radius;
      const progress = this.progress / 100;
      const dashOffset = circumference * (1 - progress);
      const strokeColour = findKey(
        this.colourRanges,
        x => this.progress >= x[0] && this.progress <= x[1],
      );

      return {
        strokeDasharray: circumference,
        strokeDashoffset: dashOffset,
        stroke: strokeColour,
      };
    },
  },
};
</script>

<style scoped>
.HGauge {
  display: flex;
  align-items: center;
}

.gauge {
  position: relative;
  background-color: #0006;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  transform: rotate(-90deg);
  width: 2.5em;
  height: 2.5em;
}

.meter,
.value {
  fill: none;
}

.meter {
  stroke: #0002;
}

.value {
  stroke: #fff;
  stroke-linecap: round;
  transition: 1s;
}

.value {
  position: absolute;
  text-align: center;
  margin: auto;
  font-size: 0.9em;
}

.label {
  margin-left: 0.5rem;
  font-size: 0.9em;
}
</style>
