import PropTypes from "prop-types";

const exchangeType = PropTypes.exact({
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
}).isRequired;

const exchangesType = PropTypes.arrayOf(exchangeType).isRequired;

export {
  exchangeType,
  exchangesType,
};
