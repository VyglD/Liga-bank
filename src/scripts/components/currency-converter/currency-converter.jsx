import React from "react";
import {connect} from "react-redux";
import ConverterField from "../converter-field/converter-field";
import ConverterDatepicker from "../converter-datepicker/converter-datepicker";
import ConverterHistory from "../converter-history/converter-history";
import {getDateStringWithDots} from "../../utils";
import {InitialCurrency, MAX_HISTORY_NUMBER} from "../../constants";
import {booleanType, rateStructureType, dateType} from "../../types/types";

const DIVIDER = 10000;
const CONVERTER_HISTORY_KEY = `converter-history`;

const INITIAL_CONVERT_VALUE = 1000;

const ActionType = {
  SET_CURRENCY_FROM: `SET_CURRENCY_FROM`,
  SET_CURRENCY_TO: `SET_CURRENCY_TO`,
  SET_DATE: `SET_DATE`,
  INPUT_VALUE_CURRENCY_FROM: `INPUT_VALUE_CURRENCY_FROM`,
  INPUT_VALUE_CURRENCY_TO: `INPUT_VALUE_CURRENCY_TO`,
  CHANGE_RATE_STRUCTURE: `CHANGE_RATE_STRUCTURE`,
};

const getCurrencyRate = (rateStructure, currencyFrom, currencyTo, date) => {
  return rateStructure[currencyFrom][currencyTo][getDateStringWithDots(date)];
};

const calculateValueCurrencyTo = (valueCurrencyFrom, currencyRate) => {
  return Math.round(valueCurrencyFrom * currencyRate * DIVIDER) / DIVIDER;
};
const calculateValueCurrencyFrom = (valueCurrencyFrom, currencyRate) => {
  return Math.round(valueCurrencyFrom / currencyRate * DIVIDER) / DIVIDER;
};

const init = (props) => {
  const {rateStructure, maxDate} = props;

  const currencyTo = rateStructure[InitialCurrency.FROM][InitialCurrency.TO]
    ? InitialCurrency.TO
    : InitialCurrency.FROM;

  const initialState = {
    currencyFrom: InitialCurrency.FROM,
    currencyTo,
    selectedDate: maxDate,
    valueCurrencyFrom: INITIAL_CONVERT_VALUE,
    rateStructure,
  };

  initialState[`currencyRate`] = getCurrencyRate(
      initialState.rateStructure,
      initialState.currencyFrom,
      initialState.currencyTo,
      initialState.selectedDate
  );

  initialState[`valueCurrencyTo`] = calculateValueCurrencyTo(
      initialState.valueCurrencyFrom,
      initialState.currencyRate
  );

  return initialState;
};

const reducer = (state, action) => {
  let currencyRate = state.currencyRate;
  let valueCurrencyTo = state.valueCurrencyTo;

  switch (action.type) {
    case ActionType.SET_CURRENCY_FROM:
      currencyRate = getCurrencyRate(
          state.rateStructure,
          action.payload,
          state.currencyTo,
          state.selectedDate
      );

      valueCurrencyTo = calculateValueCurrencyTo(
          state.valueCurrencyFrom,
          currencyRate
      );

      return {
        ...state,
        ...{currencyFrom: action.payload, currencyRate, valueCurrencyTo}
      };
    case ActionType.SET_CURRENCY_TO:
      currencyRate = getCurrencyRate(
          state.rateStructure,
          state.currencyFrom,
          action.payload,
          state.selectedDate
      );

      valueCurrencyTo = calculateValueCurrencyTo(
          state.valueCurrencyFrom,
          currencyRate
      );

      return {
        ...state,
        ...{currencyTo: action.payload, currencyRate, valueCurrencyTo}
      };
    case ActionType.SET_DATE:
      currencyRate = getCurrencyRate(
          state.rateStructure,
          state.currencyFrom,
          state.currencyTo,
          action.payload
      );

      valueCurrencyTo = calculateValueCurrencyTo(
          state.valueCurrencyFrom,
          currencyRate
      );

      return {
        ...state,
        ...{selectedDate: action.payload, currencyRate, valueCurrencyTo}
      };
    case ActionType.INPUT_VALUE_CURRENCY_FROM:
      return {
        ...state,
        ...{
          valueCurrencyFrom: action.payload,
          valueCurrencyTo: calculateValueCurrencyTo(
              action.payload,
              state.currencyRate
          )
        }
      };
    case ActionType.INPUT_VALUE_CURRENCY_TO:
      return {
        ...state,
        ...{
          valueCurrencyTo: action.payload,
          valueCurrencyFrom: calculateValueCurrencyFrom(
              action.payload,
              state.currencyRate
          )
        }
      };
    default:
      return state;
  }
};

const CurrencyConverter = (props) => {
  const {rateStructure, minDate, maxDate, isLoading} = props;

  const [state, dispatch] = React.useReducer(reducer, props, init);

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
        if (
          rateStructure[InitialCurrency.FROM][InitialCurrency.TO]
          && InitialCurrency.TO !== state.currencyTo
        ) {
          dispatch({type: ActionType.SET_CURRENCY_TO, payload: InitialCurrency.TO});
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isLoading]
  );

  React.useEffect(
      () => {
        dispatch({type: ActionType.CHANGE_RATE_STRUCTURE, payload: rateStructure});
      },
      [rateStructure]
  );

  const handleCurrencyFromChange = React.useCallback((evt) => {
    dispatch({type: ActionType.SET_CURRENCY_FROM, payload: evt.target.value});
  }, []);

  const handleCurrencyToChange = React.useCallback((evt) => {
    dispatch({type: ActionType.SET_CURRENCY_TO, payload: evt.target.value});
  }, []);

  const handleDateChange = React.useCallback((date) => {
    dispatch({type: ActionType.SET_DATE, payload: date});
  }, []);

  const handleValueCurrencyToInput = React.useCallback((evt) => {
    dispatch({type: ActionType.INPUT_VALUE_CURRENCY_TO, payload: evt.target.value});
  }, []);

  const handleValueCurrencyFromInput = React.useCallback((evt) => {
    dispatch({type: ActionType.INPUT_VALUE_CURRENCY_FROM, payload: evt.target.value});
  }, []);

  const handleSaveButtonClick = React.useCallback(
      () => {
        const tempExchanges = exchanges.slice();

        if (tempExchanges.length === MAX_HISTORY_NUMBER) {
          tempExchanges.pop();
        }

        tempExchanges.unshift({
          date: getDateStringWithDots(state.selectedDate),
          amount: `${state.valueCurrencyFrom} ${state.currencyFrom}`,
          result: `${state.valueCurrencyTo} ${state.currencyTo}`,
        });

        localStorage.setItem(
            CONVERTER_HISTORY_KEY,
            JSON.stringify(tempExchanges)
        );
        setExchanges(tempExchanges);
      },
      [exchanges, setExchanges, state]
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
        value={String(state.valueCurrencyFrom)}
        onInput={handleValueCurrencyFromInput}
        selectedCurrency={state.currencyFrom}
        onChange={handleCurrencyFromChange}
        disabled={isLoading}
        options={Object.keys(rateStructure)}
      />
      <ConverterField
        customClass="currency-converter__field-out"
        label="Хочу приобрести"
        name="output"
        value={String(state.valueCurrencyTo)}
        onInput={handleValueCurrencyToInput}
        selectedCurrency={state.currencyTo}
        onChange={handleCurrencyToChange}
        disabled={isLoading}
        options={Object.keys(rateStructure[state.currencyFrom])}
      />
      <ConverterDatepicker
        customClass="currency-converter__datepicker"
        minDate={minDate}
        maxDate={maxDate}
        selectedDate={state.selectedDate}
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
  rateStructure: rateStructureType,
  isLoading: booleanType,
};

const mapStateToProps = (state) => ({
  rateStructure: state.rateStructure,
  minDate: state.dateRange.minDate,
  maxDate: state.dateRange.maxDate,
  isLoading: state.isLoading,
});

export {CurrencyConverter};
export default connect(mapStateToProps)(CurrencyConverter);
