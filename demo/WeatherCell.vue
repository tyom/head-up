<script setup>
import { ref, onMounted } from 'vue';
import { buildUrl, CircleGauge } from '../src';

const data = ref();
const isLoading = ref(false);

async function requestData() {
  data.value = await fetch(
    buildUrl('https://api.openweathermap.org/data/2.5/weather', {
      appid: import.meta.env.VITE_OPENWEATHERAPP_API_KEY,
      q: 'London',
      units: 'metric',
    })
  ).then((res) => res.json());
}

onMounted(async () => {
  isLoading.value = true;
  await requestData();
  isLoading.value = false;
});
</script>

<template>
  <HeadUpCell
    :title="`Weather in ${data?.name}`"
    :loading="isLoading"
    refresh="1m"
    @refresh="requestData"
  >
    <div v-if="data" class="space-y-2">
      <CircleGauge
        :value="Math.round(data.main.temp)"
        :max-value="30"
        :colour-ranges="{
          blue: [-Infinity, 0],
          yellow: [0, 20],
          orange: [20, 30],
          red: [30, Infinity],
        }"
      >
        Temperature °C
      </CircleGauge>
      <CircleGauge :value="data?.main.humidity" :max-value="100">
        Humidity %
      </CircleGauge>
      <pre>{{ data }}</pre>
    </div>
  </HeadUpCell>
</template>
