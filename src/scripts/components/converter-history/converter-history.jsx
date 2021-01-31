import React from "react";
import {exchangesType, functionType} from "../../types/types";
import {MAX_HISTORY_NUMBER} from "../../constants";

const getStyle = (length, index) => {
  const rowsInColumn = MAX_HISTORY_NUMBER / 2;
  const padding = {paddingRight: `50%`};

  if (length <= rowsInColumn) {
    return padding;
  }

  if (index < rowsInColumn) {
    const style = {
      order: (index + 1) * 2 - 1,
    };

    if ((index + 1) > length - rowsInColumn) {
      Object.assign(style, padding);
    }

    return style;
  }

  return {
    order: MAX_HISTORY_NUMBER - ((MAX_HISTORY_NUMBER - (index + 1)) * 2),
  };
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
              className="converter-history__exchange-wrapper"
              style={getStyle(exchanges.length, index)}
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
