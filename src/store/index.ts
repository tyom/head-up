import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      boards: [],
    };
  },
  getters: {
    serialisedBoards(state) {
      return state.boards.map((x) => ({
        id: x.id,
        title: x.title,
      }));
    },
  },
  mutations: {
    ADD_BOARD(state, board) {
      if (state.boards.some((x) => x.id === board.id)) return;
      state.boards.push(board);
    },
  },
  actions: {
    initBoard(context, board) {
      context.commit('ADD_BOARD', board);
    },
  },
});
