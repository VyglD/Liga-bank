import React from "react";
import Banner from "../banner/banner";
import CurrencyConverter from "../currency-converter/currency-converter";
import {functionType} from "../../types/types";

const Main = (props) => {
  const {onBlankLinkClick} = props;

  return (
    <main>
      <h1 className="visually-hidden">Удобный конвертер валют от Лига Банка</h1>
      <Banner
        onBlankLinkClick={onBlankLinkClick}
      />
      <CurrencyConverter />
    </main>
  );
};

Main.propTypes = {
  onBlankLinkClick: functionType,
};

export default Main;
