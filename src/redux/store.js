import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import ordersSlice from "../features/orders/ordersSlice";
import toggleReducer from "../helpers/toggles";
import customerReducer from "../features/customers/customerState/customerSlice";
import themeReducer from "../services/darkmodeReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    customer: customerReducer,
    toggle: toggleReducer,
    orders: ordersSlice,
    theme: themeReducer,
  },
});

export default store;
