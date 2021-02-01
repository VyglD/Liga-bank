const ActionType = {
  LOAD_CURRENCY_RATE: `LOAD_CURRENCY_RATE`,
  SET_DATE_RANGE: `SET_DATE_RANGE`,
  COMPLETE_LOADING: `COMPLETE_LOADING`,
};

const ActionCreator = {
  loadCurrencyRate: (currencyData) => ({
    type: ActionType.LOAD_CURRENCY_RATE,
    payload: currencyData,
  }),
  setDateRange: (dateRange) => ({
    type: ActionType.SET_DATE_RANGE,
    payload: dateRange,
  }),
  completeLoading: () => ({
    type: ActionType.COMPLETE_LOADING,
  }),
};

export {
  ActionType,
  ActionCreator,
};
