<template>
  <div class="SidebarBoardActions">
    <SidebarButton class="_add" @click="$emit('add-board')">
      <v-icon name="plus"/>
    </SidebarButton>
    <SidebarButton
      v-if="showEdit"
      :class="{_active: isEditing()}"
      class="_edit"
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
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  inject: ['isEditing'],
  methods: {
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
