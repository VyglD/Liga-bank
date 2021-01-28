import React from "react";
import {functionType} from "../../types/types";

import logo from "../../../img/logo.svg";

const PrimeHeader = (props) => {
  const {onBlankLinkClick} = props;

  return (
    <header className="prime-header">
      <div className="prime-header__content">
        <img
          className="prime-header__logo"
          src={logo}
          width="149"
          height="25"
          alt="Лига банк."
        />
        <nav className="prime-header__nav">
          <ul className="prime-header__nav-links-list">
            <li className="prime-header__link-wrapper">
              <a className="prime-header__link" href="#blank" onClick={onBlankLinkClick}>
                Услуги
              </a>
            </li>
            <li className="prime-header__link-wrapper">
              <a className="prime-header__link" href="#blank" onClick={onBlankLinkClick}>
                Рассчитать кредит
              </a>
            </li>
            <li className="prime-header__link-wrapper">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="prime-header__link prime-header__link--active" title="Текущая страница">
                Конвертер валют
              </a>
            </li>
            <li className="prime-header__link-wrapper">
              <a className="prime-header__link" href="#blank" onClick={onBlankLinkClick}>
                Контакты
              </a>
            </li>
            <li className="prime-header__link-wrapper">
              <a className="prime-header__link" href="#blank" onClick={onBlankLinkClick}>
                Задать вопрос
              </a>
            </li>
          </ul>
        </nav>
        <button className="prime-header__login" onClick={onBlankLinkClick}>
          <svg className="prime-header__login-logo" width="20" height="22" fill="currentColor">
            <path d="M2.22 14.3h2.22v5.5h13.34V2.2H4.44v5.5H2.22V1.1A1.12 1.12 0 013.33 0H18.9A1.1 1.1 0 0120 1.1v19.8a1.12 1.12 0 01-1.11 1.1H3.33a1.1 1.1 0 01-1.11-1.1v-6.6zM8.9 9.9V6.6l5.55 4.4-5.55 4.4v-3.3H0V9.9h8.89z"/>
          </svg>
          Войти в Интернет-банк
        </button>
      </div>
    </header>
  );
};

PrimeHeader.propTypes = {
  onBlankLinkClick: functionType,
};

export default PrimeHeader;
