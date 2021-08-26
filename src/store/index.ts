import { createStore } from 'vuex';

interface SerialisedBoard {
  id: string;
  title: string;
  cells: string[];
}

interface AppState {
  boards: SerialisedBoard[];
}

export const store = createStore({
  state(): AppState {
    return {
      boards: [],
    };
  },
  getters: {
    serialisedBoards(state: AppState) {
      return state.boards.map((x) => ({
        id: x.id,
        title: x.title,
        cells: x.cells.map(() => 'regular'),
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