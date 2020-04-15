<template>
  <div class="VList" :class="listClass">
    <ul>
      <li v-for="(item, idx) in items" :key="idx">
        <slot :item="item" />
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
    padded: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    listClass() {
      return {
        _padded: this.padded,
        [`_${this.type}`]: this.type,
      };
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
  @apply shadow;
  background-color: #fff1;
}

._padded > ul > li {
  padding: 0.5em;
}

._tiles > ul {
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(25rem, 1fr));

  & > li {
    margin-top: 0;
    display: flex;
  }
}
</style>
