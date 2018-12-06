<template>
  <div class="VTiles">
    <ul class="tile-list">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        class="tile"
      >
        <slot :data="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.VTiles {
  padding: 0.5em;
  height: 100%;
}

.tile-list {
  height: 100%;
  list-style: none;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  padding: 0;
}

.tile {
  padding: 0.5em;
  background-color: rgba(#fff, 0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
