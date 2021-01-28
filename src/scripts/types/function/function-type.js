import PropTypes from "prop-types";

const optionalFunctionType = PropTypes.func;
const functionType = optionalFunctionType.isRequired;

export {
  optionalFunctionType,
  functionType
};
