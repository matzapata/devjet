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

export const addToReadingList = createAsyncThunk(
  "user/addToReadingList",
  async (payload: string, { rejectWithValue }) => {
    try {
      await axios.post(`/api/readinglist/add/${payload}`);
      return payload;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const removeFromReadingList = createAsyncThunk(
  "user/removeFromReadingList",
  async (payload: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/readinglist/delete/${payload}`);
      return payload;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
