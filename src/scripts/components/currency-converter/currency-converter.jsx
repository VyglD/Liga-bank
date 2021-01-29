import React from "react";
import ConverterField from "../converter-field/converter-field";
import {ConverterFieldType} from "../../constants";

const CurrencyConverter = () => {
  return (
    <section className="currency-converter">
      <h2 className="currency-converter__title">Конвертер валют</h2>
      <ConverterField
        converterFieldType={ConverterFieldType.IN}
        customClass="currency-converter__field-in"
      />
      <ConverterField
        converterFieldType={ConverterFieldType.OUT}
        customClass="currency-converter__field-out"
      />
    </section>
  );
};

CurrencyConverter.propTypes = {};

export default CurrencyConverter;
