<template>
  <div class="Sidebar">
    <SidebarToggle
      :toggled="showSidebar"
      @toggle="TOGGLE_SIDEBAR"
    />
    <transition name="slideLeft">
      <div v-show="showSidebar" class="container">
        <SidebarBoardActions
          :edit-mode="editMode"
          :show-edit="Boolean(boards.length)"
          @add-board="ADD_BOARD"
          @toggle-edit="TOGGLE_EDIT_MODE"
        />
        <SidebarBoards
          :active-idx="activeBoardIdx"
          :boards="boards"
        />
        <SidebarActions
          @add-board="ADD_BOARD"
          @toggle-edit="TOGGLE_EDIT_MODE"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
    boards: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState(['showSidebar', 'activeBoardIdx', 'editMode']),
  },
  methods: {
    ...mapActions(['ADD_BOARD', 'TOGGLE_EDIT_MODE', 'TOGGLE_SIDEBAR']),
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
  transition: 0.1s ease-out;
}

.slideLeft-enter,
.slideLeft-leave-to {
  margin-left: calc((10vw + 1em) * -1);
  opacity: 0;
}
</style>
