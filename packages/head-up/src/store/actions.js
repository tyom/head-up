import { get } from 'lodash';
import Chance from 'chance';

const chance = new Chance();

export default {
  INIT_BOARDS({ dispatch }, { fromProps = [], fromSlots = [] }) {
    dispatch('UPDATE_SERIALIZED_BOARDS', [...fromProps, ...fromSlots]);
  },
  UPDATE_SERIALIZED_BOARDS({ commit }, boards) {
    commit('setSerializedBoards', boards);
  },
  ACTIVATE_BOARD({ commit }, boardId) {
    commit('setActiveBoard', boardId);
  },
  ADD_BOARD({ dispatch, state }) {
    const getWords = words => chance.sentence({ words });
    const title = getWords(2)
      .replace(/\.$/, '')
      .toLowerCase();
    const id = title.replace(' ', '-');

    const newBoard = {
      id,
      title,
      editable: true,
      cells: [
        {
          title: getWords(4),
        },
      ],
    };

    dispatch('UPDATE_SERIALIZED_BOARDS', [newBoard, ...state.serializedBoards]);
    dispatch('ACTIVATE_BOARD', id);

    if (!state.editMode) {
      dispatch('TOGGLE_EDIT_MODE', true);
    }
  },
  REMOVE_BOARD({ dispatch, state }, boardId) {
    const { serializedBoards, activeBoardId } = state;
    const deletionIndex = serializedBoards.findIndex(x => x.id === boardId);
    const currentIndex = serializedBoards.findIndex(
      x => x.id === activeBoardId,
    );

    let nextId;
    const getBoardIdByIndex = idx => get(serializedBoards, `[${idx}].id`);

    if (deletionIndex === currentIndex) {
      const last = deletionIndex === serializedBoards.length - 1;
      nextId = last
        ? getBoardIdByIndex(currentIndex - 1)
        : getBoardIdByIndex(currentIndex + 1);
    } else {
      nextId = getBoardIdByIndex(currentIndex);
    }

    const updatedBoards = serializedBoards.filter(x => x.id !== boardId);
    dispatch('UPDATE_SERIALIZED_BOARDS', updatedBoards);
    dispatch('ACTIVATE_BOARD', nextId);
  },
  UPDATE_BOARD({ dispatch, state }, { boardId, payload }) {
    const updatedBoards = state.serializedBoards.map(
      board => (board.id === boardId ? payload : board),
    );
    dispatch('UPDATE_SERIALIZED_BOARDS', updatedBoards);
    dispatch('ACTIVATE_BOARD', boardId);
  },
  UPDATE_SETTINGS({ commit }, settings) {
    commit('setSettings', settings);
  },
  TOGGLE_SIDEBAR({ commit, state }, value) {
    const isVisible = typeof value === 'undefined' ? !state.showSidebar : value;
    commit('setSidebarState', isVisible);
  },
  TOGGLE_EDIT_MODE({ commit, state }, value) {
    const isEditing = typeof value === 'undefined' ? !state.editMode : value;
    commit('setEditModeState', isEditing);
  },
  RESET_STATE() {
    localStorage.clear();
    window.location.reload();
  },
};
