<template>
  <div class="VList">
    <ul :class="listClass">
      <li
        v-for="(item, idx) in items"
        :key="idx"
      >
        <slot :data="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'stack',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    listClass() {
      return `_${this.type}`;
    },
  },
};
</script>

<style scoped>
.VList {
  height: 100%;
}

ul {
  height: 100%;
  list-style: none;
  padding: 0;
  text-align: left;
}

li {
  padding: 0.5em;
  background-color: rgba(#fff, 0.02);

  & + li {
    margin-top: 2px;
  }
}

._tiles {
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}

._tiles > li {
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
