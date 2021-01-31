import React from "react";
import {functionType} from "../../types/types";

import logo from "../../../img/logo.svg";

const PrimeFooter = (props) => {
  const {onBlankLinkClick} = props;

  return (
    <footer className="prime-footer">
      <div className="prime-footer__label-wrapper">
        <img
          className="prime-footer__logo"
          src={logo}
          width="149"
          height="25"
          alt="Лига Банк."
        />
        <p className="prime-footer__label-info">
          150015, г. Москва, ул. Московская, д. 32
          Генеральная лицензия Банка России №1050
          Ⓒ Лига Банк, 2019
        </p>
      </div>
      <nav className="prime-footer__nav">
        <ul className="prime-footer__nav-links-list">
          <li className="prime-footer__link-wrapper">
            <a className="prime-footer__link" href="#blank" onClick={onBlankLinkClick}>
              Услуги
            </a>
          </li>
          <li className="prime-footer__link-wrapper">
            <a className="prime-footer__link" href="#blank" onClick={onBlankLinkClick}>
              Рассчитать кредит
            </a>
          </li>
          <li className="prime-footer__link-wrapper">
            <a className="prime-footer__link" href="#blank" onClick={onBlankLinkClick}>
              Контакты
            </a>
          </li>
          <li className="prime-footer__link-wrapper">
            <a className="prime-footer__link" href="#blank" onClick={onBlankLinkClick}>
              Задать вопрос
            </a>
          </li>
        </ul>
      </nav>
      <div className="prime-footer__connection-wrapper">
        <a className="prime-footer__connection-link" href="tel:0904">
          <svg className="prime-footer__conection-logo" width="10" height="16" fill="currentColor">
            <path d="M8.84 0H1.16C.52 0 0 .49 0 1.08v13.84C0 15.52.52 16 1.16 16h7.68c.64 0 1.16-.49 1.16-1.08V1.08C10 .48 9.48 0 8.84 0zM3.77.78h2.46c.08 0 .14.06.14.13s-.06.13-.14.13H3.77c-.08 0-.14-.06-.14-.13s.06-.13.14-.13zM5 15.46c-.32 0-.58-.24-.58-.54 0-.3.26-.54.58-.54.32 0 .58.24.58.54 0 .3-.26.54-.58.54zM9.2 14H.8V1.71h8.4V14z" />
          </svg>
          <span className="prime-footer__connection-link-label">*0904</span>
        </a>
        <p className="prime-footer__connection-description">
          Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2
        </p>
      </div>
      <div className="prime-footer__connection-wrapper prime-footer__connection-wrapper--phone">
        <a className="prime-footer__connection-link" href="tel:+78001112233">
          <svg className="prime-footer__conection-logo" width="16" height="16" fill="currentColor">
            <path d="M16 11.93v3.14a.89.89 0 01-.83.89c-.39.02-.7.04-.95.04A14.22 14.22 0 01.04.83.89.89 0 01.93 0h3.14a.44.44 0 01.44.4 12.02 12.02 0 001.13 4.05.4.4 0 01-.13.5L3.6 6.32a11.6 11.6 0 006.08 6.08l1.37-1.91a.41.41 0 01.5-.13 12.35 12.35 0 004.05 1.13.44.44 0 01.4.44z" />
          </svg>
          <span className="prime-footer__connection-link-label">8 800 111 22 33</span>
        </a>
        <p className="prime-footer__connection-description">
          Бесплатный для всех городов России
        </p>
      </div>
      <ul className="prime-footer__socials-links-list">
        <li className="prime-footer__social-link-wrapper">
          <a className="prime-footer__social-link" href="#blank" onClick={onBlankLinkClick}>
            <span className="visually-hidden">Наш Facebook</span>
            <svg width="9" height="16" fill="currentColor">
              <path d="M6 9.2h2.14L9 6H6V4.4c0-.82 0-1.6 1.71-1.6H9V.11C8.72.08 7.67 0 6.55 0 4.22 0 2.57 1.33 2.57 3.76V6H0v3.2h2.57V16H6V9.2z"/>
            </svg>
          </a>
        </li>
        <li className="prime-footer__social-link-wrapper">
          <a className="prime-footer__social-link" href="#blank" onClick={onBlankLinkClick}>
            <span className="visually-hidden">Наш Instagram</span>
            <svg width="16" height="16" fill="currentColor">
              <path d="M8 0c2.17 0 2.44 0 3.3.05a5.9 5.9 0 011.94.37c.53.2.97.48 1.42.92.4.4.72.89.92 1.42.2.51.33 1.09.37 1.94.04.86.05 1.13.05 3.3s0 2.44-.05 3.3a5.91 5.91 0 01-.37 1.94 3.9 3.9 0 01-.92 1.42c-.4.4-.89.72-1.42.92-.51.2-1.09.33-1.94.37-.86.04-1.13.05-3.3.05s-2.44 0-3.3-.05a5.91 5.91 0 01-1.94-.37 3.91 3.91 0 01-1.42-.92c-.4-.4-.72-.89-.92-1.42a5.89 5.89 0 01-.37-1.94C0 10.44 0 10.17 0 8s0-2.44.05-3.3c.04-.85.17-1.43.37-1.94.2-.53.52-1.02.92-1.42.4-.4.89-.72 1.42-.92C3.27.22 3.85.09 4.7.05 5.56 0 5.83 0 8 0zm0 4a4 4 0 100 8 4 4 0 000-8zm5.2-.2a1 1 0 10-2 0 1 1 0 002 0zM8 5.6a2.4 2.4 0 110 4.8 2.4 2.4 0 010-4.8z"/>
            </svg>
          </a>
        </li>
        <li className="prime-footer__social-link-wrapper">
          <a className="prime-footer__social-link" href="#blank" onClick={onBlankLinkClick}>
            <span className="visually-hidden">Наш Twitter</span>
            <svg width="16" height="13" fill="currentColor">
              <path d="M16 1.54c-.6.27-1.24.44-1.89.52A3.3 3.3 0 0015.56.24c-.65.39-1.35.66-2.09.8a3.28 3.28 0 00-5.59 3A9.33 9.33 0 011.11.6a3.27 3.27 0 001.02 4.38 3.27 3.27 0 01-1.49-.4v.03a3.28 3.28 0 002.64 3.22c-.49.13-1 .15-1.49.06a3.28 3.28 0 003.07 2.28A6.6 6.6 0 010 11.53 9.29 9.29 0 005.03 13c6.04 0 9.34-5 9.34-9.33v-.43A6.67 6.67 0 0016 1.54z"/>
            </svg>
          </a>
        </li>
        <li className="prime-footer__social-link-wrapper">
          <a className="prime-footer__social-link" href="#blank" onClick={onBlankLinkClick}>
            <span className="visually-hidden">Наш YouTube</span>
            <svg width="16" height="13" fill="currentColor">
              <path d="M15.63 2.03C16 3.48 16 6.5 16 6.5s0 3.02-.37 4.47c-.2.8-.8 1.43-1.55 1.64C12.72 13 8 13 8 13s-4.71 0-6.08-.39a2.27 2.27 0 01-1.55-1.64C0 9.52 0 6.5 0 6.5s0-3.02.37-4.47c.2-.8.8-1.43 1.55-1.64C3.29 0 8 0 8 0s4.72 0 6.08.39c.76.21 1.35.84 1.55 1.64zM6.4 9.34l4.8-2.84-4.8-2.84v5.68z"/>
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  );
};

PrimeFooter.propTypes = {
  onBlankLinkClick: functionType,
};

export default PrimeFooter;
