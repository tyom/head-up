<template>
  <div class="Sidebar">
    <button class="toggle" @click="TOGGLE_SIDEBAR()">
      <v-icon :name="toggleIconName"/>
    </button>
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
import SidebarBoards from './SidebarBoards';
import SidebarActions from './SidebarActions';
import SidebarBoardActions from './SidebarBoardActions';

export default {
  components: {
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
    toggleIconName() {
      return this.showSidebar ? 'chevron-left' : 'ellipsis-v';
    },
  },
  methods: {
    ...mapActions(['ADD_BOARD', 'TOGGLE_EDIT_MODE', 'TOGGLE_SIDEBAR']),
  },
};
</script>

<style scoped>
.Sidebar {
  background-color: #0005;
  padding-left: 1.6rem;
  height: 100%;
  position: relative;
}

.toggle {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1.6rem;
  font-size: 1rem;
  border: 0;
  color: inherit;
  outline: 0;
  background-color: #222;
  border-right: 1px solid #fff2;
  box-shadow: 1px 0 1px #000b;

  &:hover {
    color: #fff;
    background-color: #1b1b1b;
  }

  &:active {
    background-color: #142a59;
    transform: scaleY(1.2);
  }
}

.container {
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr auto;
  overflow-y: auto;
  padding: 1em 0;
  color: #999;
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
