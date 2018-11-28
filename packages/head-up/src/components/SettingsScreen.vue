<template>
  <form class="settings">
    <p v-for="(setting, key) in settings" :key="key">
      <VSwitchToggle v-model="settingsState[key].value" :label="setting.label"/>
    </p>
  </form>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      settingsState: this.settings,
    };
  },
  watch: {
    settingsState: {
      deep: true,
      handler() {
        this.$emit('save', this.settingsState);
      },
    },
  },
};
</script>
