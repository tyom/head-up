<template>
  <form class="settings">
    <ul>
      <li v-for="(setting, key) in settings" :key="key">
        <VSwitchToggle
          v-model="settingsState[key].value"
          :label="setting.label"
          :name="key"
        />
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true,
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

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li + li {
  margin-top: 1em;
}
</style>
