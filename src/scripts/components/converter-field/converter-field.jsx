import React from "react";
import {Currency} from "../../constants";
import {converterFieldTypeType, optionalStringType} from "../../types/types";

const ConverterField = (props) => {
  const {converterFieldType, customClass} = props;
  const {label, name, initialСurrency} = converterFieldType;

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
        id={`converter-${name}`}
      />
      <select className="converter-field__select">
        {
          Object.values(Currency).map((value) => (
            <option
              key={value}
              className="converter-field__select-option"
              name={value}
              selected={value === initialСurrency}
            >
              {value}
            </option>
          ))
        }
      </select>
    </div>
  );
};

ConverterField.propTypes = {
  converterFieldType: converterFieldTypeType,
  customClass: optionalStringType,
};

export default ConverterField;