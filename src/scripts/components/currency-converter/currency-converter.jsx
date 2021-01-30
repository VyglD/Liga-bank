import React from "react";
import {connect} from "react-redux";
import ConverterField from "../converter-field/converter-field";
import ConverterDatepicker from "../converter-datepicker/converter-datepicker";
import {getFormatedDateString, createCurrencyRateKey} from "../../utils";
import {Currency} from "../../constants";
import {currencyRatesType, dateType} from "../../types/types";

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
            getFormatedDateString(date)
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

  React.useEffect(
      () => {
        setCurrencyRate(getCurrencyRate(currencyIn, currencyOut, selectedDate));
      },
      [setCurrencyRate, getCurrencyRate, currencyIn, currencyOut, selectedDate]
  );

  React.useEffect(
      () => {
        setCurrencyOutValue(Math.round(currencyInValue * currencyRate * 1000) / 1000);
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
        setCurrencyOutValue(Math.round(newValue * currencyRate * 1000) / 1000);
      },
      [setCurrencyInValue, setCurrencyOutValue, currencyRate]
  );

  const handleCurrencyOutInput = React.useCallback(
      (evt) => {
        const newValue = evt.target.value;

        setCurrencyOutValue(newValue);
        setCurrencyInValue(Math.round(newValue / currencyRate * 1000) / 1000);
      },
      [setCurrencyInValue, setCurrencyOutValue, currencyRate]
  );

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
        className="currency-converter__button action-button"
        type="button"
      >
        Сохранить результат
      </button>
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
