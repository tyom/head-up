<template>
  <div class="HCard">
    <div class="image">
      <img :src="image" alt="" />
    </div>
    <div class="content">
      <h2 v-if="title" class="title">
        {{ title }}
      </h2>
      <div class="subtitle">
        <slot name="subtitle" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.HCard {
  display: flex;
}

.title {
  font-size: 1.2em;
}

.subtitle {
  font-size: 1.1em;
}

* + .subtitle,
* + p {
  margin-top: 0.5em;
}

.content {
  font-size: 0.65em;
  padding: 1em;
  flex: 1;
}

.image {
  max-width: 9em;

  & img {
    display: block;
    width: 100%;
  }
}
</style>
