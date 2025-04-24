import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    allOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { allOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
export const getOrders = (state) => state.orders.orders;
