const ActionType = {
  LOAD_CURRENCY_RATE: `LOAD_CURRENCY_RATE`,
  SET_DATE_RANGE: `SET_DATE_RANGE`,
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
};

export {
  ActionType,
  ActionCreator,
};
