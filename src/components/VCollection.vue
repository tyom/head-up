<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  ordered: {
    type: Boolean,
    default: false,
  },
});

const listTag = props.ordered ? 'ol' : 'ul';
</script>

<template>
  <component :is="listTag" class="collection">
    <li v-for="item in items" :key="item.id">
      <slot v-bind="item" />
    </li>
  </component>
</template>

<style scoped>
.collection {
  @apply grid gap-2;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
}

@screen md {
  .collection {
    grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  }
}

li {
  @apply flex;
}

ol {
  counter-reset: collection;

  & li {
    @apply relative;

    &::before {
      @apply absolute right-0 top-0 rounded-full
        opacity-5
        flex items-center justify-center
        leading-none font-black antialiased;
      font-size: 6rem;
      counter-increment: collection;
      content: counter(collection);
    }
  }
}
</style>
