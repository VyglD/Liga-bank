import React from "react";
import Banner from "../banner/banner";
import {functionType} from "../../types/types";

const Main = (props) => {
  const {onBlankLinkClick} = props;

  return (
    <main>
      <h1 className="visually-hidden">Удобный конвертер валют от Лига Банка</h1>
      <Banner
        onBlankLinkClick={onBlankLinkClick}
      />
    </main>
  );
};

Main.propTypes = {
  onBlankLinkClick: functionType,
};

export default Main;
