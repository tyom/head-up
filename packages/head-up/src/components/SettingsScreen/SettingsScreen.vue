<template>
  <div class="settings">
    <ul>
      <li v-for="(setting, key) in settings" :key="key">
        <VSwitchToggle
          v-model="settingsState[key].value"
          :label="setting.label"
          :name="key"
        />
      </li>
      <li>
        <button type="button" @click="handleResetState">Reset state</button>
      </li>
    </ul>
  </div>
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
  methods: {
    handleResetState() {
      localStorage.clear();
      window.location.reload();
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
