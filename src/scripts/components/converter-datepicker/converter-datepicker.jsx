import React from "react";
import DatePicker from "react-date-picker";
import {stringType, dateType, functionType} from "../../types/types";

const ConverterDatepicker = (props) => {
  const {customClass, minDate, maxDate, selectedDate, onChange} = props;

  return (
    <DatePicker
      className={customClass}
      value={selectedDate}
      onChange={onChange}
      isOpen={false}
      calendarIcon="Calendar"
      clearIcon={null}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

ConverterDatepicker.propTypes = {
  customClass: stringType,
  minDate: dateType,
  maxDate: dateType,
  selectedDate: dateType,
  onChange: functionType,
};

export default ConverterDatepicker;
