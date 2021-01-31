import React from "react";
import {Currency} from "../../constants";
import {
  currencyType,
  functionType,
  optionalStringType,
  stringType
} from "../../types/types";

const ConverterField = (props) => {
  const {
    customClass,
    label,
    name,
    value,
    onInput,
    selectedCurrency,
    onChange
  } = props;

  return (
    <div className={`${customClass} converter-field`}>
      <label
        className="converter-field__label"
        htmlFor={`converter-${name}`}
      >
        {label}
      </label>
      <input
        className="converter-field__input"
        type="number"
        name={name}
        value={value}
        onInput={onInput}
        id={`converter-${name}`}
      />
      <select
        className="converter-field__select"
        value={selectedCurrency}
        onChange={onChange}
      >
        {
          Object.values(Currency).map((currencyValue) => (
            <option
              key={currencyValue}
              className="converter-field__select-option"
            >
              {currencyValue}
            </option>
          ))
        }
      </select>
    </div>
  );
};

ConverterField.propTypes = {
  customClass: optionalStringType,
  label: stringType,
  name: stringType,
  value: stringType,
  onInput: functionType,
  selectedCurrency: currencyType,
  onChange: functionType,
};

export default ConverterField;
