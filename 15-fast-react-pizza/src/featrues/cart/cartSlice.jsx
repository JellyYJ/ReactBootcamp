import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 111,
  //     name: 'FungiParadise',
  //     quantity: 2,
  //     unitPrice: 14.5,
  //     totalPrice: 29,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload: newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload: pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      // A nice trick!!
      // use delete reducer directly rather than rewriting the same function
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increseItemQuantity,
  decreseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;
export const getCurrentQuantityById = (id) => (state) => {
  const quantity =
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
  return quantity;
};

/* reduce function is a hihger-order function in JS that is used to
  accumulate a single result form a collection(an array here)
  It takes a callback function and an initial value as its arguments */
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
