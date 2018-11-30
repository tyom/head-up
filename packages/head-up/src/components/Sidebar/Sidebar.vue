<template>
  <div class="Sidebar">
    <SidebarToggle
      :toggled="visible"
      @toggle="$emit('toggle', !visible)"
    />
    <transition name="slideLeft">
      <div v-show="visible" class="container">
        <SidebarBoardActions
          @add-board="$emit('board:add')"
          @toggle-edit="$emit('board:edit')"
        />
        <SidebarBoards
          @activate="$emit('board:activate', $event)"
          @remove="$emit('board:remove', $event)"
        />
        <SidebarActions
          @help="$emit('modal:help')"
          @settings="$emit('modal:settings')"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import SidebarToggle from './SidebarToggle';
import SidebarBoards from './SidebarBoards';
import SidebarActions from './SidebarActions';
import SidebarBoardActions from './SidebarBoardActions';

export default {
  components: {
    SidebarToggle,
    SidebarBoards,
    SidebarActions,
    SidebarBoardActions,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.Sidebar {
  padding-left: 1.6rem;
  height: 100%;
  position: relative;
}

.container {
  display: grid;
  grid-gap: 1em;
  height: 100%;
  grid-template-rows: auto 1fr auto;
  overflow-y: auto;
  padding: 1em;
  background-color: #0005;
  color: #999;
  box-shadow: inset -1px 0 rgba(#000, 0.5), 1px 0 rgba(#fff, 0.07);
}

.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: 0.15s ease;
}

.slideLeft-enter,
.slideLeft-leave-to {
  margin-left: calc((10vw + 1em) * -1);
  opacity: 0;
}
</style>
