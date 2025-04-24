import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import ordersSlice from "../features/orders/ordersSlice";
import toggleReducer from "../helpers/toggles";
import customerReducer from "../features/customers/customerState/customerSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    customer: customerReducer,
    toggle: toggleReducer,
    orders: ordersSlice,
  },
});

export default store;
