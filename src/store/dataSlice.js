import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const initialState = {
  data: data, // intial data load with json file
  editId: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },

    addData: (state, action) => {
      const newItem = action.payload;
      state.data.push(newItem);
      state.data.forEach((item) => {
        item.status = item.id === newItem.id ? "active" : "";
      });
      localStorage.setItem("profilesData", JSON.stringify(state.data));
    },
    updateData: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
        localStorage.setItem("profilesData", JSON.stringify(state.data));
      }
    },

    deleteData: (state, action) => {
      const itemId = action.payload.id;
      state.data = state.data.filter((item) => item.id !== itemId);
      const newActiveItemId = itemId - 1;
      state.data.forEach((item) => {
        item.status = item.id === newActiveItemId ? "active" : "";
      });
      localStorage.setItem("profilesData", JSON.stringify(state.data));
    },
    updateStatus: (state, action) => {
      state.data.forEach((item) => {
        item.status = item.id === action.payload.id ? "active" : "";
        if (item.id === action.payload.id) {
          state.selectedName = item.name;
        }
      });
      localStorage.setItem("profilesData", JSON.stringify(state.data));
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
});

export const {
  setData,
  addData,
  updateData,
  deleteData,
  updateStatus,
  setEditId,
} = dataSlice.actions;
export default dataSlice.reducer;
