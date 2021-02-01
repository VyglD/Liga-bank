const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const MAX_HISTORY_NUMBER = 10;

const Currency = {
  RUB: `RUB`,
  USD: `USD`,
  EUR: `EUR`,
  GBP: `GBP`,
  CNY: `CNY`,
};

const InitialCurrency = {
  FROM: Currency.RUB,
  TO: Currency.USD,
};

export {
  MAX_HISTORY_NUMBER,
  MILLISECONDS_PER_DAY,
  Currency,
  InitialCurrency,
};
