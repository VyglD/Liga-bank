import {ActionCreator} from "../store/actions";
import {getDates, getDateStringWithDashes, getDateStringWithDots} from "../utils";
import {Currency, InitialCurrency} from "../constants";

const CONVERTER_CURRENCY_KEY = `converter-currency`;

const MAX_NUMBER_PAIRS = 2;

const timeLabel = new Date()
  .toLocaleDateString(
      `en-US`,
      {
        year: `numeric`,
        month: `2-digit`,
        day: `2-digit`,
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

const adaptServerRatesForClient = (serverResponse, currencyRates) => {
  Object.entries(serverResponse)
    .forEach(([pair, dates]) => {
      const [from, to] = pair.split(`_`);
      currencyRates[from][to] = {};
      currencyRates[to][from] = {};

      Object.entries(dates)
        .forEach(([date, rate]) => {
          const formattedDate = getDateStringWithDots(new Date(date));

          currencyRates[from][to][formattedDate] = rate;
          currencyRates[to][from][formattedDate] = 1 / rate;
        });
    });
};

const createCurrencyRatesStructure = (dates) => {
  const currencies = Object.values(Currency);

  return currencies
    .map((from) => {
      const sameCurrency = currencies.filter((to) => from === to)
        .map((to) => {
          const ratePerDays = dates.map((date) => ({[date]: 1}))
            .reduce((result, item) => ({...result, ...item}), {});

          return {[to]: ratePerDays};
        })
        .reduce((result, item) => ({...result, ...item}), {});

      return {[from]: sameCurrency};
    })
    .reduce((result, item) => ({...result, ...item}), {});
};

const createCurrencyPair = (from, to) => {
  return `${from}_${to}`;
};

const getCurrencyPairs = () => {
  const pairs = [];

  const currencies = Object.values(Currency);

  const tempStructure = currencies
    .map((from) => ({[from]: currencies.filter((to) => to !== from)}))
    .reduce((result, item) => ({...result, ...item}), {});

  const firstFromCurrencies = tempStructure[InitialCurrency.FROM];
  const firstToIndex = firstFromCurrencies.findIndex((to) => to === InitialCurrency.TO);

  pairs.push(createCurrencyPair(InitialCurrency.FROM, firstFromCurrencies[firstToIndex]));

  firstFromCurrencies.splice(firstToIndex, 1);

  pairs.push(...firstFromCurrencies.map((to) => createCurrencyPair(InitialCurrency.FROM, to)));

  delete tempStructure[InitialCurrency.FROM];

  const usedCurrencies = [InitialCurrency.FROM];

  Object.entries(tempStructure)
    .forEach(([from, toValues]) => {
      toValues.filter((to) => !usedCurrencies.includes(to))
        .forEach((to) => pairs.push(createCurrencyPair(from, to)));
      usedCurrencies.push(from);
    });

  return pairs;
};

const pullCurrencyRates = () => (dispatch, _getState) => {
  return (async () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7);
    const maxDate = new Date();

    await dispatch(ActionCreator.setDateRange({minDate, maxDate}));

    if (!currencyStorage || currencyStorage.timeLabel !== timeLabel) {
      const dates = getDates(minDate, maxDate);
      const fetchPairs = getCurrencyPairs();
      const currencyRates = createCurrencyRatesStructure(dates);

      dispatch(ActionCreator.loadCurrencyRate(currencyRates));

      const requestCount = Math.ceil(fetchPairs.length / 2);
      let responseCount = 0;
      for (let i = 0, j = MAX_NUMBER_PAIRS; i < fetchPairs.length; i += MAX_NUMBER_PAIRS, j += MAX_NUMBER_PAIRS) {
        fetchCurrencyRates(fetchPairs.slice(i, j).join(`,`), minDate, maxDate)
          // eslint-disable-next-line no-loop-func
          .then((response) => {
            adaptServerRatesForClient(response, currencyRates);

            Promise.resolve(dispatch(ActionCreator.loadCurrencyRate(currencyRates)))
              .then(() => {
                responseCount++;

                if (requestCount === responseCount) {
                  localStorage.setItem(
                      CONVERTER_CURRENCY_KEY,
                      JSON.stringify({
                        timeLabel,
                        currencyRates,
                      })
                  );

                  dispatch(ActionCreator.completeLoading());
                }
              });
          });
      }
    } else {
      dispatch(ActionCreator.loadCurrencyRate(currencyStorage.currencyRates));
      dispatch(ActionCreator.completeLoading());
    }
  })();
};

export {
  pullCurrencyRates,
};
