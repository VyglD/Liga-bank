import React from "react";
import {connect} from "react-redux";
import ConverterField from "../converter-field/converter-field";
import ConverterDatepicker from "../converter-datepicker/converter-datepicker";
import ConverterHistory from "../converter-history/converter-history";
import {getDateStringWithDots} from "../../utils";
import {InitialCurrency, MAX_HISTORY_NUMBER} from "../../constants";
import {booleanType, currencyRatesType, dateType} from "../../types/types";

const DIVIDER = 10000;
const CONVERTER_HISTORY_KEY = `converter-history`;

const INITIAL_CONVERT_VALUE = 1000;

const CurrencyConverter = (props) => {
  const {currencyRates, minDate, maxDate, isLoading} = props;

  const getCurrencyRate = React.useCallback(
      (currencyIn, currencyOut, date) => {
        return currencyRates[currencyIn][currencyOut][getDateStringWithDots(date)];
      },
      [currencyRates]
  );

  const [currencyIn, setCurrencyIn] = React.useState(InitialCurrency.FROM);
  const [currencyOut, setCurrencyOut] = React.useState(() => {
    return currencyRates[InitialCurrency.FROM][InitialCurrency.TO]
      ? InitialCurrency.TO
      : InitialCurrency.FROM;
  });
  const [selectedDate, setActiveDate] = React.useState(maxDate);
  const [currencyRate, setCurrencyRate] = React.useState(1);

  const [currencyInValue, setCurrencyInValue] = React.useState(INITIAL_CONVERT_VALUE);
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
        if (!isLoading && currencyRates[InitialCurrency.FROM][InitialCurrency.TO]) {
          setCurrencyOut(InitialCurrency.TO);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isLoading]
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
        disabled={isLoading}
        options={Object.keys(currencyRates)}
      />
      <ConverterField
        customClass="currency-converter__field-out"
        label="Хочу приобрести"
        name="output"
        value={String(currencyOutValue)}
        onInput={handleCurrencyOutInput}
        selectedCurrency={currencyOut}
        onChange={handleCurrencyOutChange}
        disabled={isLoading}
        options={Object.keys(currencyRates[currencyIn])}
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
  isLoading: booleanType,
};

const mapStateToProps = (state) => ({
  currencyRates: state.currencyRates,
  minDate: state.dateRange.minDate,
  maxDate: state.dateRange.maxDate,
  isLoading: state.isLoading,
});

export {CurrencyConverter};
export default connect(mapStateToProps)(CurrencyConverter);
