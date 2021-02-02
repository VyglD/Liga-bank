import {ActionType} from "./actions";

const initialState = {
  rateStructure: {},
  dateRange: {
    minDate: new Date(),
    maxDate: new Date(),
  },
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CURRENCY_RATE:
      return {
        ...state,
        ...{rateStructure: action.payload}
      };
    case ActionType.SET_DATE_RANGE:
      return {
        ...state,
        ...{dateRange: action.payload}
      };
    case ActionType.COMPLETE_LOADING:
      return {
        ...state,
        ...{isLoading: false}
      };
    default:
      return state;
  }
};

export default reducer;
