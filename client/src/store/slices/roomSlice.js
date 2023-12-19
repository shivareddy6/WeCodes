import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentProblem: 0,
  allProblems: [],
  isLoading: true, //whole problems and editor window loads
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchProblems = createAsyncThunk(
  "content/fetchProblems",
  async () => {
    await sleep(2000);
    return [
      "palindrome-number",
      "largest-color-value-in-a-directed-graph",
      "valid-parentheses",
      "image-smoother",
    ];
  }
);

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addPeople: (state, action) => {
      return { ...state, people: [...state.people, action.payload] };
    },

    nextProblem: (state) => {
      if (state.currentProblem + 1 < state.allProblems.length) {
        return { ...state, currentProblem: state.currentProblem + 1 };
      }
      return state;
    },

    prevProblem: (state) => {
      if (state.currentProblem > 0) {
        return { ...state, currentProblem: state.currentProblem - 1 };
      }
    },

    changeProblem: (state, action) => {
      const index = action.payload;
      if (index < allProblems.length && index >= 0) {
        state.currentProblem = index;
      }
    }
  },
  extraReducers: {
    [fetchProblems.pending]: (state) => {
      state.isLoading = true
    },
    [fetchProblems.fulfilled]: (state, action) => {
      state.allProblems = action.payload;
      state.isLoading = false;
    },
    [fetchProblems.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export const { addPeople, nextProblem, prevProblem } = roomSlice.actions;

export default roomSlice.reducer;
