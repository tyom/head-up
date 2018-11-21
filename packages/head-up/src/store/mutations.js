export default {
  setActiveBoardIdx(state, boardIdx) {
    state.activeBoardIdx = boardIdx;
  },
  setSidebarVisibility(state, value) {
    state.showSidebar = value;
  },
  setBoards(state, boards) {
    state.boards = boards;
  },
  setEditMode(state, value) {
    state.editMode = value;
  },
  setScrollingPreferences(state, value) {
    state.smoothScrolling = value;
  },
};
