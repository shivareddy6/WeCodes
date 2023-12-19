import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  people: [],
  currentProblem: 0,
  allProblems: [],
  roomName: "room",
  isLoading: false,
};

export const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
  },
  extraReducers: {}
});

export const { } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
