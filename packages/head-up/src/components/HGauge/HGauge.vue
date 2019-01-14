<template>
  <div class="HGauge">
    <div class="gauge">
      <svg
        :width="width"
        :height="height"
        viewBox="0 0 120 120"
      >
        <circle
          class="meter"
          cx="60"
          cy="60"
          r="54"
          stroke-width="12"
        />
        <circle
          :style="valueStyles"
          class="value"
          cx="60"
          cy="60"
          r="54"
          stroke-width="12"
        />
      </svg>
      <span v-if="label" class="label">{{ label }}</span>
    </div>
    <span class="side-label">
      {{ sideLabel }}
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
    label: {
      type: [String, Number],
      default: '',
    },
    sideLabel: {
      type: String,
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
  background-color: rgba(#000, 0.5);
  padding: 2px;
  border-radius: 50%;
}

svg {
  transform: rotate(-90deg);
  display: block;
}

.meter,
.value {
  fill: none;
}

.meter {
  stroke: rgba(#000, 0.4);
}

.value {
  stroke: #fff;
  stroke-linecap: round;
  transition: 1s;
}

.label {
  position: absolute;
  text-align: center;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0.7rem;
  height: 0.7rem;
  line-height: 1;
}

.side-label {
  margin-left: 0.5rem;
  font-size: 0.7rem;
}
</style>
