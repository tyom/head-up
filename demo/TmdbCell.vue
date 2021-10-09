<script setup>
import { CircleGauge, VCard, VCollection } from '../src';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

defineProps({
  title: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
});

const pluralize = (val, number) => (number > 1 ? `${val}s` : val);
const getPosterImage = (path) => `https://image.tmdb.org/t/p/w342/${path}`;
const formatDate = (date) =>
  new Date(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
const getTitle = (item) => item.title || item.name;
const getOriginalTitle = (item) => item.original_title || item.original_name;
const isForeign = (item) => getTitle(item) !== getOriginalTitle(item);
</script>

<template>
  <HeadUpCell
    v-slot="{ results }"
    :title="title"
    :http="{
      get: `https://api.themoviedb.org/3${endpoint}`,
      params: { api_key: tmdbApiKey },
      refresh: '5m',
    }"
  >
    <VCollection v-slot="item" :items="results">
      <VCard :title="getTitle(item)" :image="getPosterImage(item.poster_path)">
        <h3 v-if="isForeign(item)" class="opacity-75 text-sm mt-0">
          <span class="bg-blue-900 text-blue-100 inline-block px-1 rounded">{{
            item.original_language.toUpperCase()
          }}</span>
          {{ getOriginalTitle(item) }}
        </h3>
        <CircleGauge :value="item.vote_average">
          {{ item.vote_count.toLocaleString() }}
          {{ pluralize('vote', item.vote_count) }}
        </CircleGauge>
        <p class="line-clamp-5 text-sm lg:text-base">{{ item.overview }}</p>
        <p class="opacity-50 text-xs">
          Released: {{ formatDate(item.release_date || item.first_air_date) }}
        </p>
      </VCard>
    </VCollection>
  </HeadUpCell>
</template>
