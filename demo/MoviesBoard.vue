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
</script>

<template>
  <HeadUpBoard title="Movies">
    <HeadUpCell
      v-slot="{ results }"
      title="Discover TMDB Movies"
      :http="{
        get: 'https://api.themoviedb.org/3/discover/movie',
        params: { api_key: tmdbApiKey },
        refresh: '5m',
      }"
    >
      <VCollection v-slot="item" :items="results">
        <VCard
          :title="item.original_title"
          :image="getPosterImage(item.poster_path)"
        >
          <CircleGauge :value="item.vote_average">
            {{ item.vote_count.toLocaleString() }}
            {{ pluralize('vote', item.vote_count) }}
          </CircleGauge>
          <p class="line-clamp-6">{{ item.overview }}</p>
          <p class="opacity-70">
            Released: {{ formatDate(item.release_date) }}
          </p>
        </VCard>
      </VCollection>
    </HeadUpCell>
  </HeadUpBoard>
</template>
