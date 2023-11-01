const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = { initialState }, action) {
  switch (action.type) {
    // action names should what happens, instead of old way "SET_BALANCE"
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    // In redux, it is advised to return the state back rather than throw an error(like we did in useReducer)
    default:
      return state;
  }
}
