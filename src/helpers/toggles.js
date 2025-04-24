import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenSidebar: false,
};

const toggleItemsSlice = createSlice({
  name: "toggle",
  initialState,

  reducers: {
    toggleSideBar: (state, action) => {
      state.isOpenSidebar = action.payload;
    },
  },
});

export default toggleItemsSlice.reducer;

export const { toggleSideBar } = toggleItemsSlice.actions;

export const getTogglesidebar = (state) => state.toggle.isOpenSidebar;
