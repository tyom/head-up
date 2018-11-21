<template>
  <ModalDialogue :show="show" @close="$emit('close')">
    <header v-if="heading">
      <h2>{{ heading }}</h2>
    </header>
    <form class="settings">
      <p>
        <VSwitchToggle v-model="smoothScrollingValue" label="Smooth scrolling"/>
      </p>
    </form>
  </ModalDialogue>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
  data() {
    return {
      smoothScrollingValue: this.smoothScrolling,
    };
  },
  computed: {
    ...mapState(['smoothScrolling']),
  },
  watch: {
    // TODO This appears to be some async issue as the value should be
    // initialised in data function
    smoothScrolling: {
      immediate: true,
      handler(newVal) {
        this.smoothScrollingValue = newVal;
      },
    },
    smoothScrollingValue(newVal) {
      this.UPDATE_SETTING({
        smoothScrolling: newVal,
      });
    },
  },
  methods: {
    ...mapActions(['UPDATE_SETTING']),
  },
};
</script>

<style scoped>
header {
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 0.1em solid #aaa;
}
</style>
