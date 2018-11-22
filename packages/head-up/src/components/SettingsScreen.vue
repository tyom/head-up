<template>
  <ModalDialogue
    :show="show"
    :heading="heading"
    @close="$emit('close')"
  >
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
