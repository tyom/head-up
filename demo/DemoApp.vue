<script setup>
import TmbdCell from './TmdbCell.vue';
import WeatherCell from './WeatherCell.vue';
import AirQualityCell from './AirQualityCell.vue';

const tmdbCells = [
  {
    title: 'Discover Movies (TMDB)',
    endpoint: '/discover/movie',
  },
  {
    title: 'Discover TVs (TMDB)',
    endpoint: '/discover/tv',
  },
];
</script>

<template>
  <HeadUp>
    <HeadUpBoard title="TV & Movies">
      <TmbdCell v-for="cell in tmdbCells" :key="cell.title" v-bind="cell" />
    </HeadUpBoard>
    <HeadUpBoard title="Miscellaneous">
      <WeatherCell />
      <AirQualityCell />
      <HeadUpCell> Awesome #3 </HeadUpCell>
      <HeadUpCell> Awesome #4 </HeadUpCell>
      <HeadUpCell> Awesome #5 </HeadUpCell>
    </HeadUpBoard>
  </HeadUp>
</template>

<style>
html {
  @apply bg-gray-900;
}
</style>
