import { createSlice } from "@reduxjs/toolkit";
import { fetchReadingList } from "./userThunk";

export interface UserState {
  readingList: {
    loading: boolean;
    postSlugs: string[];
  };
}

const initialState: UserState = {
  readingList: {
    loading: false,
    postSlugs: [],
  },
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
    builder.addCase(fetchReadingList.pending, (state) => {
      state.readingList.loading = true;
    });
    builder.addCase(fetchReadingList.fulfilled, (state, action) => {
      state.readingList.postSlugs = action.payload;
      state.readingList.loading = false;
    });
    builder.addCase(fetchReadingList.rejected, (state) => {
      state.readingList.postSlugs = [];
      state.readingList.loading = false;
    });
  },
});

export const { cleanUserStore } = counterSlice.actions;
export default counterSlice.reducer;
