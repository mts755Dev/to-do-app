import { PayloadAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

const initialState: { todos: Todo[] } = { todos: [] };

const todoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [action.payload, ...state.todos];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: number; todo: string }>) => {
      state.todos = state.todos.map((item) => {
        if (item.id == action.payload.id) {
          item.todo = action.payload.todo;
          return item;
        }
        return item;
      });
    },
  },
});

export const { addTodo, setTodos, deleteTodo, editTodo } = todoReducer.actions;

export const todoSelector = (rootState: any) => rootState.todoReducer?.todos;

export default todoReducer.reducer;
