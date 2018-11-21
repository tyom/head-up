<template>
  <ModalDialogue :show="show" @close="$emit('close')">
    <header v-if="heading">
      <h2>{{ heading }}</h2>
    </header>
    <dl class="shortcuts">
      <div>
        <dt>j</dt>
        <dd>Next board</dd>
      </div>
      <div>
        <dt>k</dt>
        <dd>Previous board</dd>
      </div>
      <div>
        <dt>s</dt>
        <dd>Toggle sidebar</dd>
      </div>
      <div>
        <dt>e</dt>
        <dd>Toggle edit mode</dd>
      </div>
      <div>
        <dt>a</dt>
        <dd>Insert new board</dd>
      </div>
    </dl>
  </ModalDialogue>
</template>

<script>
import ModalDialogue from './ModalDialogue';

export default {
  components: {
    ModalDialogue,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    heading: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
header {
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 0.1em solid #aaa;
}

.shortcuts {
  & > div {
    display: flex;
    align-items: center;
    padding: 0.5em 0;
  }

  & > div + div {
    border-top: 1px solid #ddd;
  }

  & dt {
    width: 2em;
    height: 2em;
    line-height: 1.9em;
    text-align: center;
    background-color: #555;
    color: #fff;
    border-radius: 0.2em;
    font-weight: bold;
    margin-right: 1em;
  }
}
</style>
