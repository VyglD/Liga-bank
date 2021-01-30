import {ActionCreator} from "../store/actions";
import {Currency} from "../constants";

const LOCAL_STORAGE_KEY = `converter-currency`;

const timeLabel = new Date()
  .toLocaleDateString(
      `en-US`,
      {
        year: `numeric`,
        month: `2-digit`,
        day: `2-digit`,
        hour: `numeric`,
        hour12: false
      }
  );

const currencyStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

const minDate = new Date();
minDate.setDate(minDate.getDate() - 7);
const maxDate = new Date();

const getFormatedDateString = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const fetchCurrencyRates = (currenciesArgs, startDate, endDate) => {
  const url = `https://free.currconv.com/api/v7/convert
                ?apiKey=381d4c9c0fd2eb28d306
                &q=${currenciesArgs}
                &compact=ultra
                &date=${getFormatedDateString(startDate)}
                &endDate=${getFormatedDateString(endDate)}`
                .replace(/[\r\n ]+/g, ``);

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        window.console.error(response);
      }
      return response;
    })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      window.console.log(err);
    });
};

const pullCurrencyRates = () => (dispatch, _getState) => {
  return (async () => {
    let currencyRates = {};

    if (!currencyStorage || currencyStorage.timeLabel !== timeLabel) {
      const currencies = Object.values(Currency);

      const currenciesArgs = currencies
        .map((currencyFrom, index) => {
          return currencies.slice(index + 1).map((currencyTo) => `${currencyFrom}_${currencyTo}`);
        })
        .reduce((result, args) => result.concat(args), []);

      const rates = await fetchCurrencyRates(currenciesArgs.slice(0, 2).join(`,`), minDate, maxDate);
      Object.entries(rates).forEach(
          ([currency, dates]) => {
            Object.entries(dates).forEach(([date, rate]) => {
              currencyRates[`${currency}_${date}`] = rate;
            });
          }
      );

      localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({
            timeLabel,
            currencyRates,
          })
      );
    } else {
      currencyRates = currencyStorage.currencyRates;
    }

    await dispatch(ActionCreator.loadCurrencyRate(currencyRates));
  })();
};

export {
  pullCurrencyRates,
};
