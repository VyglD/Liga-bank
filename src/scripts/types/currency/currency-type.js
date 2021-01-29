import PropTypes from "prop-types";
import {Currency} from "../../constants";

const currencyType = PropTypes.oneOf(Object.values(Currency)).isRequired;

export {
  currencyType,
};
