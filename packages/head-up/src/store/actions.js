import { uniqueId, merge } from 'lodash';

function parseBoardConfig(config) {
  return config;
}

export default {
  INITIALISE({ commit }, config = {}) {
    const boards = parseBoardConfig(config.boards);
    commit('setBoards', boards);
  },
  ADD_BOARD({ commit, state }) {
    const newBoardCount = state.boards.length;
    const newBoardTemplate = {
      title: `Board #${newBoardCount}`,
      id: uniqueId(),
      cells: [
        {
          title: 'Cell #1',
        },
      ],
    };
    commit('setBoards', [newBoardTemplate, ...state.boards]);
    commit('setActiveBoardIdx', 0);
    commit('setEditMode', true);
  },
  REMOVE_BOARD({ commit, state }, id) {
    const deletedIndex = state.boards.findIndex(x => x.id === id);
    const filteredBoards = state.boards.filter(x => x.id !== id);
    commit('setBoards', filteredBoards);

    if (state.activeBoardIdx === state.boards.length) {
      commit('setActiveBoardIdx', state.activeBoardIdx - 1);
    } else if (state.activeBoardIdx === deletedIndex) {
      commit('setActiveBoardIdx', deletedIndex);
    } else {
      commit('setActiveBoardIdx', deletedIndex - 1);
    }
  },
  ACTIVATE_BOARD({ commit }, idx) {
    commit('setActiveBoardIdx', idx);
  },
  TOGGLE_EDIT_MODE({ commit, state }) {
    commit('setEditMode', !state.editMode);
  },
  TOGGLE_SIDEBAR({ commit, state }, newState) {
    const toggledState =
      typeof newState === 'undefined' ? !state.showSidebar : newState;
    commit('setSidebarVisibility', toggledState);
  },
  UPDATE_BOARD({ commit, state }, payload) {
    const updatedBoards = [...state.boards].map((board, i) => {
      if (i === payload.idx) {
        return merge({}, board, payload);
      }
      return board;
    });

    commit('setBoards', updatedBoards);
  },
  UPDATE_SETTING({ commit }, payload) {
    commit('setScrollingPreferences', payload.smoothScrolling);
  },
};
