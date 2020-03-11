export default {
  setSerializedBoards(state, boards) {
    state.serializedBoards = boards;
  },
  setActiveBoard(state, boardId) {
    state.activeBoardId = boardId;
  },
  setSidebarState(state, isVisible) {
    state.showSidebar = isVisible;
  },
  setEditModeState(state, isEditing) {
    state.editMode = isEditing;
  },
  setSettings(state, settings) {
    state.settings = settings;
  },
};
