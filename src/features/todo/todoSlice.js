import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const priority = {
  NONE: "none",
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const createTodo = createAsyncThunk(
  "todo/create",
  async (data, thunkAPI) => {
    return await api.post(`/todos/`, data);
  }
);

export const fetchTodos = createAsyncThunk(
  "todo/list",
  async (data, thunkAPI) => {
    return await api.get("/todos/");
  }
);

const initialState = { data: [] };

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default todoSlice.reducer;

const getTodos = (state) => state.todos.data;
const getFilterProps = (
  state,
  { searchTerm = "", completed = false } = {}
) => ({
  searchTerm,
  completed,
});
