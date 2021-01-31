import {ActionCreator} from "../store/actions";
import {createCurrencyRateKey, getDateStringWithDashes} from "../utils";
import {Currency} from "../constants";

const CONVERTER_CURRENCY_KEY = `converter-currency`;

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

const currencyStorage = JSON.parse(localStorage.getItem(CONVERTER_CURRENCY_KEY));

const fetchCurrencyRates = (currenciesArgs, startDate, endDate) => {
  const url = `https://free.currconv.com/api/v7/convert
                ?apiKey=381d4c9c0fd2eb28d306
                &q=${currenciesArgs}
                &compact=ultra
                &date=${getDateStringWithDashes(startDate)}
                &endDate=${getDateStringWithDashes(endDate)}`
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

const createCurrencyRateList = (rates) => {
  const currencyRates = {};

  Object.entries(rates).forEach(
      ([currency, dates]) => {
        Object.entries(dates).forEach(([date, rate]) => {
          const [currencyFrom, currencyTo] = currency.split(`_`);

          currencyRates[createCurrencyRateKey(currencyFrom, currencyTo, date)] = rate;
          currencyRates[createCurrencyRateKey(currencyTo, currencyFrom, date)] = 1 / rate;
        });
      }
  );

  return currencyRates;
};

const pullCurrencyRates = () => (dispatch, _getState) => {
  return (async () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7);
    const maxDate = new Date();

    await dispatch(ActionCreator.setDateRange({minDate, maxDate}));

    let currencyRates = {};

    if (!currencyStorage || currencyStorage.timeLabel !== timeLabel) {
      const currencies = Object.values(Currency);

      const currenciesArgs = currencies
        .map((currencyFrom, index) => {
          return currencies.slice(index + 1).map((currencyTo) => `${currencyFrom}_${currencyTo}`);
        })
        .reduce((result, args) => result.concat(args), []);

      for (let i = 0, j = 2; i < currenciesArgs.length; i = i + 2, j = j + 2) {
        const rates = await fetchCurrencyRates(currenciesArgs.slice(i, j).join(`,`), minDate, maxDate);
        Object.assign(currencyRates, createCurrencyRateList(rates));
      }

      localStorage.setItem(
          CONVERTER_CURRENCY_KEY,
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
