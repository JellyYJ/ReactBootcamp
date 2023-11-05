const initialStateCostumer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCostumer, action) {
  switch (action.type) {
    // action names should what happens, instead of old way "SET_BALANCE"
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createAt: action.payload.createAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload.fullName };

    // In redux, it is advised to return the state back
    // rather than throw an error(like we did in useReducer)
    default:
      return state;
  }
}

// Action creator for Customer
export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}
export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
