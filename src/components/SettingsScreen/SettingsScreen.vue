<template>
  <div class="settings">
    <ul>
      <li v-for="(setting, key) in settings" :key="key">
        <VSwitchToggle
          v-model="settings[key].value"
          :label="setting.label"
          :name="key"
        />
      </li>
      <li>
        <button type="button" class="reset-button" @click="handleResetState">
          Reset state
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../../store';

export default {
  data() {
    return {
      settings: { ...store.state.settings },
    };
  },
  watch: {
    settings: {
      deep: true,
      handler(newSettings) {
        store.dispatch('UPDATE_SETTINGS', newSettings);
      },
    },
  },
  methods: {
    handleResetState() {
      store.dispatch('RESET_STATE');
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
