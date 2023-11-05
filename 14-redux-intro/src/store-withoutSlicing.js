import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCostumer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // action names should what happens, instead of old way "SET_BALANCE"
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    // In redux, it is advised to return the state back
    // rather than throw an error(like we did in useReducer)
    default:
      return state;
  }
}

function customerReducer(state = initialStateCostumer, action) {
  switch (action.type) {
    // action names should what happens, instead of old way "SET_BALANCE"
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createAt: action.payload.createAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    // In redux, it is advised to return the state back
    // rather than throw an error(like we did in useReducer)
    default:
      return state;
  }
}

// createStore
// Combine all the reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 200,
//     purpose: "Buy a jumper",
//   },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan", payload: 200 });
// console.log(store.getState());

// Action creator for Account management
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(20));
store.dispatch(requestLoan(200, "Buy a pair of jeans"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

// Action creator for Customer
function createCustomer(fullname, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullname, nationalId, createAt: new Date().toISOString },
  };
}
function updateName(fullname) {
  return { type: "customer/updateName", payload: fullname };
}

store.dispatch(createCustomer("Joe", "123456"));
console.log(store.getState());
store.dispatch(updateName("Updated"));
console.log(store.getState());
