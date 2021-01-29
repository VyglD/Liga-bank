import React from "react";
import DatePicker from "react-date-picker";
import {stringType} from "../../types/types";

const ConverterDatepicker = (props) => {
  const {customClass} = props;

  const [selectedDate, setDate] = React.useState(new Date());

  const minDate = React.useMemo(
      () => {
        const min = new Date();
        min.setDate(min.getDate() - 7);
        return min;
      },
      []
  );

  const maxDate = React.useMemo(
      () => {
        const max = new Date();
        max.setDate(max.getDate() + 7);
        return max;
      },
      []
  );

  return (
    <DatePicker
      className={customClass}
      value={selectedDate}
      onChange={setDate}
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
};

export default ConverterDatepicker;
