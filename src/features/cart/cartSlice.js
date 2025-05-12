import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: {
      prepare(id, menueItem) {
        return {
          payload: {
            id,
            menueItem,
          },
        };
      },

      reducer(state, action) {
        const { id, menueItem } = action.payload;
        const item = state?.cart?.find((item) => item.id === id);
        if (!item) {
          state.cart = [...state.cart, menueItem];
          localStorage.setItem("cart", JSON.stringify(state.cart)); // Save with the same key
        } else {
          item.quantity++;
          item.totalPrice = item.price * item.quantity;
          localStorage.setItem("cart", JSON.stringify(state.cart)); // Save with the same key
        }
      },
    },
    incrementItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);

      item.quantity++;
      item.totalPrice = item.price * item.quantity;
      item.totalOptionPrice = item.optionPrice * item.quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Save with the same key
    },
    decrementItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      item.totalPrice = item.price * item.quantity;
      item.totalOptionPrice = item.optionPrice * item.quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Save with the same key

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
        localStorage.setItem("cart", JSON.stringify(state.cart)); // Save with the same key
      }
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Save with the same key
    },
    emptyCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Save with the same key
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  addItemToCart,
  deleteItem,
  decrementItemQuantity,
  incrementItemQuantity,
  decrement,
  emptyCart,
  incrementByAmount,
} = cartSlice.actions;

export default cartSlice.reducer;

export const totalItemsInCart = (state) =>
  state?.cart?.cart?.reduce((acc, curr) => acc + curr.quantity, 0);

export const totalCartPrice = (state) =>
  state?.cart?.cart?.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const getCurrentItemQuantityByID = (id) => (state) =>
  state?.cart?.cart?.find((item) => item.id === id)?.quantity ?? 0;

export const getCart = (state) => state.cart.cart;
