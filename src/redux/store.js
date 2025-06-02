import { configureStore } from "@reduxjs/toolkit";
import tableReducer, { initialState } from "./tableSlice";

const savedData = localStorage.getItem("tableData");
const initialData = savedData ? JSON.parse(savedData) : initialState.data;

const store = configureStore({
  reducer: {
    table: tableReducer,
  },

  preloadedState: {
    table: {
      data: initialData,
    },
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("tableData", JSON.stringify(state.table.data));
});

export default store;
