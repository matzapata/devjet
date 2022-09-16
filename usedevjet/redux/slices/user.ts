import { createSlice } from "@reduxjs/toolkit";
import {
  addToReadingList,
  fetchReadingList,
  removeFromReadingList,
} from "./userThunk";

export interface UserState {
  readingList: string[];
}

const initialState: UserState = {
  readingList: [],
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cleanUserStore: (state) => {
      state.readingList = initialState.readingList;
    },
  },
  extraReducers: (builder) => {
    // fetchReadingList
    builder.addCase(fetchReadingList.fulfilled, (state, action) => {
      state.readingList = action.payload;
    });
    builder.addCase(fetchReadingList.rejected, (state) => {
      state.readingList = [];
    });

    // addToReadingList
    builder.addCase(addToReadingList.fulfilled, (state, action: any) => {
      state.readingList = [...state.readingList, action.payload];
    });
    // removeFromReadingList
    builder.addCase(removeFromReadingList.fulfilled, (state, action: any) => {
      state.readingList = state.readingList.filter((p) => p !== action.payload);
    });
  },
});

export const { cleanUserStore } = counterSlice.actions;
export default counterSlice.reducer;
