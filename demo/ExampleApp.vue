<script setup>
import { CircleGauge, VCard, VCollection } from '../src';
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_IMAGE_PREFIX = 'https://image.tmdb.org/t/p/w342/';

const pluralize = (val, number) => (number > 1 ? `${val}s` : val);
</script>

<template>
  <HeadUp>
    <HeadUpBoard title="Movies">
      <HeadUpCell
        v-slot="{ results }"
        :http="{
          get: 'https://api.themoviedb.org/3/discover/movie',
          params: { api_key: tmdbApiKey },
          refresh: '5m',
        }"
      >
        <VCollection v-slot="item" :items="results">
          <VCard
            :title="item.original_title"
            :image="`${TMDB_IMAGE_PREFIX}/${item.poster_path}`"
          >
            <CircleGauge :value="item.vote_average">
              {{ item.vote_count.toLocaleString() }}
              {{ pluralize('vote', item.vote_count) }}
            </CircleGauge>
            <p class="line-clamp-6">{{ item.overview }}</p>
            <p class="opacity-70">
              Released:
              {{
                new Date(item.release_date).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              }}
            </p>
          </VCard>
        </VCollection>
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
