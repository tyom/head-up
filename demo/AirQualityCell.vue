<script setup>
import { onMounted, ref } from 'vue';
import { buildUrl } from '../src';

const isLoading = ref(false);
const data = ref();
const locationName = ref();

const maxValue = 5;
const valueToPercent = (val) => (val * 100) / maxValue;

const colour = {
  1: '#00de20',
  2: '#a7de00',
  3: '#deb200',
  4: '#de6400',
  5: '#de0000',
};

async function requestData() {
  data.value = await fetch(
    buildUrl('https://api.openweathermap.org/geo/1.0/direct', {
      appid: import.meta.env.VITE_OPENWEATHERAPP_API_KEY,
      q: 'London',
    })
  )
    .then((res) => res.json())
    .then(([{ lat, lon, name, country }]) => {
      locationName.value = [name, country].join(', ');
      return fetch(
        buildUrl('https://api.openweathermap.org/data/2.5/air_pollution', {
          appid: import.meta.env.VITE_OPENWEATHERAPP_API_KEY,
          lat,
          lon,
        })
      ).then((res) => res.json());
    })
    .then(({ list }) => list[0]);
}

onMounted(async () => {
  isLoading.value = true;
  await requestData();
  isLoading.value = false;
});
</script>

<template>
  <HeadUpCell
    :title="`Air Quality in ${locationName}`"
    :loading="isLoading"
    refresh="1m"
    @refresh="requestData"
  >
    <template v-if="data">
      <apexchart
        type="radialBar"
        :series="[valueToPercent(data.main.aqi)]"
        :options="{
          chart: {
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  color: '#fff',
                  fontSize: '1.6rem',
                  formatter: (val) => (val * maxValue) / 100,
                },
              },
            },
          },
          colors: [colour[data.main.aqi]],
          stroke: {
            lineCap: 'round',
          },
          labels: ['AQI'],
        }"
      />
    </template>
    {{ data }}
  </HeadUpCell>
</template>
