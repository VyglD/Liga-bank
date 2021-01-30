import {ActionType} from "./actions";

const initialState = {
  currency: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CURRENCY_RATE:
      return {
        ...state,
        ...{currency: action.payload}
      };
    default:
      return state;
  }
};

export default reducer;
