import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    csrfToken: "",
    sessionToken: "",
};

export const userSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setUserName: (state, action) => {
        state.username = action.payload;
    }
  },
  extraReducers: {}
});

export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
