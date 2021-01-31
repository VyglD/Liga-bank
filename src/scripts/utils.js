const getTwoDigitString = (number) => {
  return String(number).padStart(2, 0);
};

const getDateStringWithDots = (date) => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const getDateStringWithDashes = (date) => {
  const month = getTwoDigitString(date.getMonth() + 1);
  const day = getTwoDigitString(date.getDate());

  return `${date.getFullYear()}-${month}-${day}`;
};

const createCurrencyRateKey = (currencyFrom, currencyTo, date) => {
  return `${currencyFrom}_${currencyTo}_${date}`;
};

export {
  getDateStringWithDashes,
  getDateStringWithDots,
  createCurrencyRateKey,
};
