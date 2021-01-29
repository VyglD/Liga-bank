import PropTypes from "prop-types";

const optionalStringType = PropTypes.string;
const stringType = optionalStringType.isRequired;

export {
  optionalStringType,
  stringType
};
