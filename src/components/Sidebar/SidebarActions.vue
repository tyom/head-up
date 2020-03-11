<template>
  <div class="SidebarActions">
    <SidebarButton
      title="Shortcut: ⇧<"
      class="settings-button"
      @click="$emit('settings')"
    >
      <v-icon name="cog" />
    </SidebarButton>
    <SidebarButton
      title="Shortcut: ⇧?"
      class="help-button"
      @click="$emit('help')"
    >
      <v-icon name="question" />
    </SidebarButton>
  </div>
</template>

<script>
import SidebarButton from './SidebarButton';

export default {
  components: {
    SidebarButton,
  },
};
</script>

<style scoped>
.SidebarActions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.25em;
}
</style>
