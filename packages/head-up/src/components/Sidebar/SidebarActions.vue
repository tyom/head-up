<template>
  <div class="SidebarActions">
    <SidebarButton @click="$root.$emit('toggle:settings')">
      <v-icon name="cog"/>
    </SidebarButton>
    <SidebarButton @click="$root.$emit('toggle:help')">
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
