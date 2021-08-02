import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const createTodo = createAsyncThunk(
  "todo/create",
  async (data, thunkAPI) => {
    return await api.post(`/todos/`, data);
  }
);

const initialState = { data: [] };

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
  },
});

export default todoSlice.reducer;
