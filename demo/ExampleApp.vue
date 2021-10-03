<script setup>
import { CircleGauge } from '../src';
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const pluralize = (val, number) => (number > 1 ? `${val}s` : val);
</script>

<template>
  <HeadUp>
    <HeadUpBoard title="Movies">
      <HeadUpCell
        :http="{
          get: 'https://api.themoviedb.org/3/discover/movie',
          params: { api_key: tmdbApiKey },
          refresh: '5m',
        }"
        v-slot="{ results }"
      >
        <ul>
          <li v-for="item in results" :key="item.id">
            <h2>
              {{ item.original_title }}
            </h2>
            <CircleGauge :value="item.vote_average">
              {{ item.vote_count.toLocaleString() }}
              {{ pluralize('vote', item.vote_count) }}
            </CircleGauge>
          </li>
        </ul>
      </HeadUpCell>
    </HeadUpBoard>
    <HeadUpBoard title="Board 2">
      <HeadUpCell title="Cell 1"> Awesome #1 </HeadUpCell>
      <HeadUpCell title="Cell 2"> Awesome #2 </HeadUpCell>
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
