<template>
  <div class="Sidebar" :class="{ _collapsed: !visible }">
    <Toggle
      :toggled="visible"
      @toggle="handleToggleSidebar"
      title="Shortcut: s"
    />
    <transition name="fade">
      <div class="wrapper" v-show="visible">
        <div class="actions">
          <Button
            class="add-button"
            title="Shortcut: a"
            @click="handleAddBoard"
          >
            <v-icon name="plus" />
          </Button>
          <Button
            :class="{ _active: editMode }"
            class="edit-button"
            title="Shortcut: e"
            @click="handleToggleEdit"
          >
            <v-icon name="edit" />
          </Button>
        </div>
        <Boards
          :edit-mode="editMode"
          :boards="boards"
          :active-id="activeBoardId"
          @activate="handleActivateBoard"
          @remove="handleRemoveBoard"
        />
        <div class="actions">
          <Button
            title="Shortcut: ⇧<"
            class="settings-button"
            @click="$emit('toggle:settings')"
          >
            <v-icon name="cog" />
          </Button>
          <Button
            title="Shortcut: ⇧?"
            class="help-button"
            @click="$emit('toggle:help')"
          >
            <v-icon name="question" />
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import store from '../../store';
import Toggle from './Toggle';
import Boards from './Boards';
import Button from './Button';

export default {
  components: {
    Toggle,
    Boards,
    Button,
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
  @apply relative flex overflow-hidden h-full pl-6 transition-all duration-200 ease-in;
  width: 14vw;
  min-width: 11rem;

  &._collapsed {
    @apply w-0 min-w-0;
  }
}

.wrapper {
  @apply grid flex-grow gap-4 overflow-y-auto p-4 text-gray-500;
  min-height: 100%;
  grid-template-rows: auto 1fr auto;
  background-color: #0005;
  box-shadow: inset 0 0 3px #0008;
}

.actions {
  @apply grid grid-cols-2 gap-2;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition duration-700;
}

.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
