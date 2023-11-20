import { configureStore } from '@reduxjs/toolkit';
import userReducer from './featrues/user/userSlice';
import cartReducer from './featrues/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
