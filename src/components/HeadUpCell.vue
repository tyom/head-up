<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import parseDuration from 'parse-duration';

const emit = defineEmits(['refresh']);

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  refresh: {
    type: String,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fetch: {
    type: Object,
    default: () => ({}),
    validator: (value) => {
      const keys = Object.keys(value);
      return keys.length ? keys.includes('url') : true;
    },
  },
});

const slotData = ref({});
const intervalMs = parseDuration(props.refresh);
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
  if (!props.fetch?.url) {
    return {};
  }

  const requestUrl = [
    props.fetch.url,
    new URLSearchParams(props.fetch.query),
  ].join('?');

  return fetch(requestUrl).then((res) => res.json());
}

onMounted(async () => {
  slotData.value = await fetchData();
});

if (intervalMs) {
  const interval = setInterval(async () => {
    emit('refresh');
    slotData.value = await fetchData();
  }, intervalMs);

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
}
</script>

<template>
  <div class="head-up-cell">
    <div v-if="loading" class="loading">Loading…</div>
    <template v-else>
      <header v-if="title">{{ title }}</header>
      <div
        v-if="intervalMs"
        class="refresh-status"
        :style="intervalStatusStyles"
      >
        <div class="refresh-status-head" :style="intervalHeadStyles" />
      </div>
      <section v-bind="$attrs"><slot v-bind="slotData" /></section>
    </template>
  </div>
</template>

<style scoped>
.head-up-cell {
  @apply flex flex-col
    border border-gray-800;
}

.loading {
  @apply flex items-center justify-center flex-1
    opacity-50;
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
