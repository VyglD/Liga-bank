const ActionType = {
  LOAD_CURRENCY_RATE: `LOAD_CURRENCY_RATE`,
};

const ActionCreator = {
  loadCurrencyRate: (currencyData) => ({
    type: ActionType.LOAD_CURRENCY_RATE,
    payload: currencyData,
  }),
};

export {
  ActionType,
  ActionCreator,
};
