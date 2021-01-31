import React from "react";
import {connect} from "react-redux";
import ConverterField from "../converter-field/converter-field";
import ConverterDatepicker from "../converter-datepicker/converter-datepicker";
import ConverterHistory from "../converter-history/converter-history";
import {
  getDateStringWithDashes,
  getDateStringWithDots,
  createCurrencyRateKey
} from "../../utils";
import {Currency, MAX_HISTORY_NUMBER} from "../../constants";
import {currencyRatesType, dateType} from "../../types/types";

const DIVIDER = 10000;
const CONVERTER_HISTORY_KEY = `converter-history`;

const CurrencyConverter = (props) => {
  const {currencyRates, minDate, maxDate} = props;

  const getCurrencyRate = React.useCallback(
      (currencyIn, currencyOut, date) => {
        if (currencyIn === currencyOut) {
          return 1;
        }

        const key = createCurrencyRateKey(
            currencyIn,
            currencyOut,
            getDateStringWithDashes(date)
        );

        return currencyRates[key];
      },
      [currencyRates]
  );

  const initialState = React.useMemo(
      () => {
        let initialСurrencyIn = Currency.RUB;
        let initialСurrencyOut = Currency.USD;
        let initialDate = maxDate;
        let initialRate = getCurrencyRate(initialСurrencyIn, initialСurrencyOut, initialDate);

        if (!initialRate) {
          const firstKey = Object.keys(currencyRates)[0];
          [initialСurrencyIn, initialСurrencyOut] = firstKey.split(`_`);
          initialRate = currencyRates[firstKey];
        }

        return {
          initialСurrencyIn,
          initialСurrencyOut,
          initialDate,
          initialRate,
        };
      },
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      []
  );

  const [currencyIn, setCurrencyIn] = React.useState(initialState.initialСurrencyIn);
  const [currencyOut, setCurrencyOut] = React.useState(initialState.initialСurrencyOut);
  const [selectedDate, setActiveDate] = React.useState(initialState.initialDate);
  const [currencyRate, setCurrencyRate] = React.useState(initialState.initialRate);

  const [currencyInValue, setCurrencyInValue] = React.useState(1000);
  const [currencyOutValue, setCurrencyOutValue] = React.useState(() => currencyInValue * currencyRate);

  const [exchanges, setExchanges] = React.useState(
      () => {
        let historyStorage = JSON.parse(localStorage.getItem(CONVERTER_HISTORY_KEY));

        if (!historyStorage) {
          historyStorage = [];
        }

        return historyStorage;
      }
  );

  React.useEffect(
      () => {
        setCurrencyRate(getCurrencyRate(currencyIn, currencyOut, selectedDate));
      },
      [setCurrencyRate, getCurrencyRate, currencyIn, currencyOut, selectedDate]
  );

  React.useEffect(
      () => {
        setCurrencyOutValue(Math.round(currencyInValue * currencyRate * DIVIDER) / DIVIDER);
      },
      [setCurrencyOutValue, currencyInValue, currencyRate]
  );

  const handleCurrencyInChange = React.useCallback(
      (evt) => {
        setCurrencyIn(evt.target.value);
      },
      [setCurrencyIn]
  );

  const handleCurrencyOutChange = React.useCallback(
      (evt) => {
        setCurrencyOut(evt.target.value);
      },
      [setCurrencyOut]
  );

  const handleDateChange = React.useCallback(
      (date) => {
        setActiveDate(date);
      },
      [setActiveDate]
  );

  const handleCurrencyInInput = React.useCallback(
      (evt) => {
        const newValue = evt.target.value;

        setCurrencyInValue(newValue);
        setCurrencyOutValue(Math.round(newValue * currencyRate * DIVIDER) / DIVIDER);
      },
      [setCurrencyInValue, setCurrencyOutValue, currencyRate]
  );

  const handleCurrencyOutInput = React.useCallback(
      (evt) => {
        const newValue = evt.target.value;

        setCurrencyOutValue(newValue);
        setCurrencyInValue(Math.round(newValue / currencyRate * DIVIDER) / DIVIDER);
      },
      [setCurrencyInValue, setCurrencyOutValue, currencyRate]
  );

  const handleSaveButtonClick = React.useCallback(
      () => {
        const tempExchanges = exchanges.slice();

        if (tempExchanges.length === MAX_HISTORY_NUMBER) {
          tempExchanges.pop();
        }

        tempExchanges.unshift({
          date: getDateStringWithDots(selectedDate),
          amount: `${currencyInValue} ${currencyIn}`,
          result: `${currencyOutValue} ${currencyOut}`,
        });

        localStorage.setItem(
            CONVERTER_HISTORY_KEY,
            JSON.stringify(tempExchanges)
        );
        setExchanges(tempExchanges);
      },
      [exchanges, setExchanges, selectedDate, currencyInValue, currencyIn, currencyOutValue, currencyOut]
  );

  const handleClearButtonClick = () => {
    localStorage.setItem(
        CONVERTER_HISTORY_KEY,
        JSON.stringify([])
    );
    setExchanges([]);
  };

  return (
    <section className="currency-converter">
      <h2 className="currency-converter__title">Конвертер валют</h2>
      <ConverterField
        customClass="currency-converter__field-in"
        label="У меня есть"
        name="input"
        value={String(currencyInValue)}
        onInput={handleCurrencyInInput}
        selectedCurrency={currencyIn}
        onChange={handleCurrencyInChange}
      />
      <ConverterField
        customClass="currency-converter__field-out"
        label="Хочу приобрести"
        name="output"
        value={String(currencyOutValue)}
        onInput={handleCurrencyOutInput}
        selectedCurrency={currencyOut}
        onChange={handleCurrencyOutChange}
      />
      <ConverterDatepicker
        customClass="currency-converter__datepicker"
        minDate={minDate}
        maxDate={maxDate}
        selectedDate={selectedDate}
        onChange={handleDateChange}
      />
      <button
        className="currency-converter__save-button action-button"
        type="button"
        onClick={handleSaveButtonClick}
      >
        Сохранить результат
      </button>
      <ConverterHistory
        exchanges={exchanges}
        onClearButtonClick={handleClearButtonClick}
      />
    </section>
  );
};

CurrencyConverter.propTypes = {
  minDate: dateType,
  maxDate: dateType,
  currencyRates: currencyRatesType,
};

const mapStateToProps = (state) => ({
  currencyRates: state.currencyRates,
  minDate: state.dateRange.minDate,
  maxDate: state.dateRange.maxDate,
});

export {CurrencyConverter};
export default connect(mapStateToProps)(CurrencyConverter);
