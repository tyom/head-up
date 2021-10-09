<script setup>
import { CircleGauge, VCard, VCollection } from '../src';
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

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

const boards = [
  {
    title: 'Discover Movies (TMDB)',
    endpoint: 'https://api.themoviedb.org/3/discover/movie',
  },
  {
    title: 'Discover TVs (TMDB)',
    endpoint: 'https://api.themoviedb.org/3/discover/tv',
  },
];
</script>

<template>
  <HeadUpBoard title="TV & Movies">
    <HeadUpCell
      v-for="board in boards"
      v-slot="{ results }"
      :key="board.title"
      :title="board.title"
      :http="{
        get: board.endpoint,
        params: { api_key: tmdbApiKey },
        refresh: '5m',
      }"
    >
      <VCollection v-slot="item" :items="results">
        <VCard
          :title="getTitle(item)"
          :image="getPosterImage(item.poster_path)"
        >
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
          <p class="line-clamp-5 text-sm md:text-base">{{ item.overview }}</p>
          <p class="opacity-50 text-xs">
            Released: {{ formatDate(item.release_date || item.first_air_date) }}
          </p>
        </VCard>
      </VCollection>
    </HeadUpCell>
  </HeadUpBoard>
</template>
