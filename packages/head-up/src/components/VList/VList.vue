<template>
  <div class="VList" :class="listClass">
    <ul>
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
  background-color: rgba(#fff, 0.02);

  & + li {
    margin-top: 2px;
  }
}

._padded > ul > li {
  padding: 0.5em;
}

._tiles > ul {
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));

  & > li {
    margin-top: 0;
    display: flex;
  }
}
</style>
