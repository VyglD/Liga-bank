import {ActionType} from "./actions";

const initialState = {
  currencyRates: {},
  dateRange: {
    minDate: new Date(),
    maxDate: new Date(),
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CURRENCY_RATE:
      return {
        ...state,
        ...{currencyRates: action.payload}
      };
    case ActionType.SET_DATE_RANGE:
      return {
        ...state,
        ...{dateRange: action.payload}
      };
    default:
      return state;
  }
};

export default reducer;
