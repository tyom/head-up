<script setup>
import { useSlots } from 'vue';
import { kebabCase } from 'lodash-es';
import { nanoid } from 'nanoid';
import { store } from '../store';

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  id: {
    type: String,
    default: nanoid(4),
  },
});

const boardId = props.title ? kebabCase(props.title) : props.id;
const slots = useSlots();

store.dispatch('initBoard', {
  ...props,
  id: boardId,
  cells: slots.default()?.map((x) => x.props),
});
</script>

<template>
  <div :id="boardId" class="head-up-board">
    <header>
      <h2>{{ title }}</h2>
    </header>
    <article>
      <slot />
    </article>
  </div>
</template>

<style scoped>
.head-up-board {
  @apply flex flex-col;
}

header {
  @apply bg-gray-700 p-4;
}

article {
  @apply p-2 grid h-full gap-2 overflow-auto;
}
</style>
