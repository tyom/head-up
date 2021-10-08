<script setup>
import findKey from 'lodash-es/findKey';

import { computed } from 'vue';

const props = defineProps({
  size: {
    type: Number,
    default: 32,
  },
  colourRanges: {
    type: Object,
    default: () => ({
      red: [0, 3],
      tomato: [3, 5],
      gold: [5, 7],
      limegreen: [7, 10],
    }),
  },
  value: {
    type: [String, Number],
    required: true,
  },
  maxValue: {
    type: Number,
    default: 10,
  },
});

const radius = 50;

const valueStyles = computed(() => {
  const circumference = 2 * Math.PI * radius;
  const progress = props.value / props.maxValue;
  const dashOffset = circumference * (1 - progress);
  const strokeColour = findKey(
    props.colourRanges,
    (x) => props.value >= x[0] && props.value <= x[1]
  );
  return {
    strokeDasharray: circumference,
    strokeDashoffset: dashOffset,
    stroke: strokeColour,
  };
});
</script>

<template>
  <div class="circle-gauge">
    <div class="gauge">
      <svg :width="size" :height="size" viewBox="0 0 120 120">
        <circle class="meter" cx="60" cy="60" :r="radius" stroke-width="12" />
        <circle
          :style="valueStyles"
          class="value"
          cx="60"
          cy="60"
          :r="radius"
          stroke-width="12"
        />
      </svg>
      <span v-if="value" class="value">{{ value }}</span>
    </div>
    <span v-if="$slots.default" class="label">
      <slot />
    </span>
  </div>
</template>

<style scoped>
.circle-gauge {
  @apply flex items-center
    cursor-default select-none
    text-xs;
}

.gauge {
  @apply relative bg-black p-0.5 rounded-full;
}

svg {
  @apply block transform -rotate-90;
}

.meter,
.value {
  fill: none;
}

.meter {
  stroke: #0005;
}

.value {
  stroke: #fff;
  stroke-linecap: round;
  transition: 1s;
}

.value {
  @apply absolute inset-0
    text-center m-auto font-bold
    flex items-center justify-center;
}

.label {
  @apply ml-2;
}
</style>
