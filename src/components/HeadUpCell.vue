<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from 'vue';
import parseDuration from 'parse-duration';

const axios = inject('axios');

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  http: {
    type: Object,
    default: () => ({}),
  },
});

const slotData = ref({});

const intervalMs = parseDuration(props.http?.refresh);
const intervalSeconds = intervalMs / 1000;
const intervalRatio = 100 / intervalSeconds;

const intervalStatusStyles = {
  backgroundSize: `${intervalRatio}% 100%`,
};
const intervalHeadStyles = {
  width: `${intervalRatio}%`,
  animationDuration: `${intervalMs}ms, ${intervalMs / intervalSeconds}ms`,
  animationTimingFunction: `steps(${intervalSeconds}, end), ease`,
};

async function fetchData() {
  if (props.http?.get) {
    return axios
      .get(props.http.get, { params: props.http.params })
      .then((res) => res.data);
  }
  return {};
}

onMounted(async () => {
  if (props.http) {
    slotData.value = await fetchData();
  }
});

if (intervalMs) {
  const interval = setInterval(async () => {
    slotData.value = await fetchData();
  }, intervalMs);

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
}
</script>

<template>
  <div class="head-up-cell">
    <header v-if="title">{{ title }}</header>
    <div v-if="intervalMs" class="refresh-status" :style="intervalStatusStyles">
      <div class="refresh-status-head" :style="intervalHeadStyles" />
    </div>
    <section><slot v-bind="slotData" /></section>
  </div>
</template>

<style scoped>
.head-up-cell {
  @apply flex flex-col
    border border-gray-800;
}

header {
  @apply p-2 leading-none
    border-b border-gray-800
    text-xs font-bold text-gray-500;
}

.refresh-status {
  @apply relative h-px;
  background-image: linear-gradient(
    90deg,
    transparent 2%,
    #259fff55 2%,
    #259fff55 100%
  );
}

.refresh-status-head {
  animation: tick infinite linear, fade infinite backwards;
  min-width: 1px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #fff;
}

section {
  @apply p-2 flex-1 overflow-auto;
}

@keyframes tick {
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
}
@keyframes fade {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
