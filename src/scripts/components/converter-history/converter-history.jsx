import React from "react";
import {exchangesType, functionType} from "../../types/types";
import {MAX_HISTORY_NUMBER} from "../../constants";

const getClass = (length, index) => {
  const rowsInColumn = MAX_HISTORY_NUMBER / 2;
  const defaultClass = `converter-history__exchange-wrapper`;

  if (length <= rowsInColumn) {
    return `${defaultClass} ${defaultClass}--full`;
  }

  if (index < rowsInColumn) {
    const order = (index + 1) * 2 - 1;
    const orderClass = `${defaultClass}--order-${order}`;

    if ((index + 1) > length - rowsInColumn) {
      return `${defaultClass} ${orderClass} ${defaultClass}--full`;
    }

    return `${defaultClass} ${orderClass}`;
  }

  const order = MAX_HISTORY_NUMBER - ((MAX_HISTORY_NUMBER - (index + 1)) * 2);

  return `${defaultClass} ${defaultClass}--order-${order}`;
};

const ConverterHistory = (props) => {
  const {exchanges, onClearButtonClick} = props;

  return (
    <section className="converter-history">
      <h3 className="converter-history__title">
        История конвертаций
      </h3>
      <ul className="converter-history__exchanges-list">
        {
          exchanges.map((exchange, index) => (
            <li
              key={index}
              className={getClass(exchanges.length, index)}
            >
              <span className="converter-history__exchange-date">
                {exchange.date}
              </span>
              <span className="converter-history__exchange-amount">
                {exchange.amount}
              </span>
              <span className="converter-history__exchange-result">
                {exchange.result}
              </span>
            </li>
          ))
        }
      </ul>
      <button
        className="converter-history__clear-button action-button"
        type="button"
        onClick={onClearButtonClick}
      >
        Очистить историю
      </button>
    </section>
  );
};

ConverterHistory.propTypes = {
  exchanges: exchangesType,
  onClearButtonClick: functionType,
};

export default ConverterHistory;
