const getTwoDigitString = (number) => {
  return String(number).padStart(2, 0);
};

const getFormatedDateString = (date) => {
  const month = getTwoDigitString(date.getMonth() + 1);
  const day = getTwoDigitString(date.getDate());

  return `${date.getFullYear()}-${month}-${day}`;
};

const createCurrencyRateKey = (currencyFrom, currencyTo, date) => {
  return `${currencyFrom}_${currencyTo}_${date}`;
};

export {
  getFormatedDateString,
  createCurrencyRateKey,
};
