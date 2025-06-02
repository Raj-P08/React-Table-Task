import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [
    { id: 1, name: "Aniket", age: 28, email: "aniket@email.com" },
    { id: 2, name: "Rajkumar", age: 22, email: "rajkumar@email.com" },
    { id: 3, name: "Sanjay", age: 25, email: "sanjy@email.com" },
    { id: 4, name: "Rohit", age: 30, email: "rohit@email.com" },
    { id: 5, name: "Priya", age: 27, email: "priya@email.com" },
    { id: 6, name: "Sita", age: 24, email: "sita@email.com" },
    { id: 7, name: "Gita", age: 26, email: "gita@email.com" },
    { id: 8, name: "Rahul", age: 29, email: "raw@emai.com" },
    { id: 9, name: "Amit", age: 21, email: "amit@email.com" },
    { id: 10, name: "Neha", age: 23, email: "nh@email.com" },
    { id: 11, name: "Kiran", age: 31, email: "kiran@emai.com" },
    { id: 12, name: "Ravi", age: 20, email: "ravi@emai.com" },
    { id: 13, name: "Suresh", age: 32, email: "suresh@email.com" },
  ],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addEntry: (state, action) => {
      const newEntry = action.payload;
      state.data.push(newEntry);
    },
  },
});
export const { addEntry } = tableSlice.actions;
export default tableSlice.reducer;
