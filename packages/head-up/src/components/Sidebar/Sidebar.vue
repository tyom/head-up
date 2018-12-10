<template>
  <div class="Sidebar">
    <SidebarToggle
      :toggled="visible"
      @toggle="handleToggleSidebar"
      title="Shortcut: s"
    />
    <transition name="slideLeft">
      <div v-show="visible" class="container">
        <SidebarBoardActions
          :edit-mode="editMode"
          @add-board="handleAddBoard"
          @toggle-edit="handleToggleEdit"
        />
        <SidebarBoards
          :edit-mode="editMode"
          :boards="boards"
          :active-id="activeBoardId"
          @activate="handleActivateBoard"
          @remove="handleRemoveBoard"
        />
        <SidebarActions
          @help="$emit('toggle:help')"
          @settings="$emit('toggle:settings')"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import store from '../../store';
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
  computed: {
    boards() {
      return store.state.serializedBoards;
    },
    editMode() {
      return store.state.editMode;
    },
    activeBoardId() {
      return store.state.activeBoardId;
    },
  },
  methods: {
    handleToggleSidebar() {
      store.dispatch('TOGGLE_SIDEBAR');
    },
    handleAddBoard() {
      store.dispatch('ADD_BOARD');
    },
    handleRemoveBoard(boardId) {
      store.dispatch('REMOVE_BOARD', boardId);
    },
    handleToggleEdit() {
      store.dispatch('TOGGLE_EDIT_MODE');
    },
    handleActivateBoard(boardId) {
      store.dispatch('ACTIVATE_BOARD', boardId);
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
