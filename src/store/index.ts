import { createStore } from 'vuex';

interface BoardSnapshot {
  id: string;
  title: string;
  cells: string[];
}

interface AppState {
  boards: BoardSnapshot[];
}

export const store = createStore({
  state(): AppState {
    return {
      boards: [],
    };
  },
  mutations: {
    ADD_BOARD(state: AppState, board) {
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
