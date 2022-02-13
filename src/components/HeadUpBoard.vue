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
  editing: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: nanoid(4),
  },
});

const boardId = props.title ? kebabCase(props.title) : props.id;
const slots = useSlots();
const defaultSlotCells = slots.default()?.reduce((acc, cur) => {
  if (cur.children?.length) {
    return [...acc, ...cur.children.map(() => 'regular')];
  }
  return [...acc, 'regular'];
}, []);

store.dispatch('initBoard', {
  ...props,
  id: boardId,
  cells: defaultSlotCells,
});
</script>

<template>
  <div :id="boardId" class="head-up-board" :class="{ '--editing': editing }">
    <header v-if="editing">
      <h2>{{ title }}</h2>
    </header>
    <article>
      <slot />
    </article>
  </div>
</template>

<style scoped>
@import '../assets/index.css';

.head-up-board {
  @apply flex flex-col;
}

article {
  @apply h-full
    board-grid-layout
    overflow-auto;
}

.--editing header {
  @apply relative bg-gray-700 p-4 pointer-events-auto;
}
</style>
