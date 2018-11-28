<template>
  <div class="SidebarActions">
    <SidebarButton @click="$emit('settings')">
      <v-icon name="cog"/>
    </SidebarButton>
    <SidebarButton @click="$emit('help')">
      <v-icon name="question"/>
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
