import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import accountReducer from "./features/accounts/accountSlice-withToolkit";
import customerReducer from "./features/customers/customerSlice";

/* USING thunk
   1. Install Middleware pkg - npm i redux-thunk
*/
// Combine all the reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// 2. Apply Thunk to our store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
