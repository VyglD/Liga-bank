import PropTypes from "prop-types";
import {currencyType} from "../currency/currency-type";

const converterFieldTypeType = PropTypes.exact({
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  initialСurrency: currencyType,
}).isRequired;

export {
  converterFieldTypeType,
};
