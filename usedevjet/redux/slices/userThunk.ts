import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReadingList = createAsyncThunk(
  "user/fetchReadingList",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/readinglist");
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
