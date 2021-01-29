import React from "react";
import {functionType} from "../../types/types";

const Banner = (props) => {
  const {onBlankLinkClick} = props;

  return (
    <section className="banner">
      <h2 className="visually-hidden">Калькулятор кредита от Лига Банка</h2>
      <div className="banner__content">
        <p className="banner__title">Лига Банк</p>
        <p className="banner__subtitle">Кредиты на любой случай</p>
        <a
          className="banner__button action-button"
          href="#blank"
          onClick={onBlankLinkClick}
        >
          Рассчитать кредит
        </a>
      </div>
    </section>
  );
};

Banner.propTypes = {
  onBlankLinkClick: functionType,
};

export default Banner;
