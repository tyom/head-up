<template>
  <div class="SidebarBoardActions">
    <SidebarButton
      class="_add"
      title="Shortcut: a"
      @click="handleAddBoard"
    >
      <v-icon name="plus"/>
    </SidebarButton>
    <SidebarButton
      :class="{_active: isEditing()}"
      class="_edit"
      title="Shortcut: e"
      @click="handleEditToggle"
    >
      <v-icon name="edit"/>
    </SidebarButton>
  </div>
</template>

<script>
import SidebarButton from './SidebarButton';

export default {
  components: {
    SidebarButton,
  },
  inject: ['isEditing'],
  methods: {
    handleAddBoard() {
      this.$emit('add-board');
    },
    handleEditToggle() {
      this.$emit('toggle-edit');
    },
  },
};
</script>

<style scoped>
.SidebarBoardActions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.25em;
}
</style>
