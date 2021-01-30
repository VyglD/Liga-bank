import React from "react";
import DatePicker from "react-date-picker";
import {stringType} from "../../types/types";

const ConverterDatepicker = (props) => {
  const {customClass} = props;

  const today = React.useMemo(() => new Date(), []);

  const minDate = React.useMemo(
      () => {
        const min = new Date();
        min.setDate(min.getDate() - 7);
        return min;
      },
      []
  );

  const [selectedDate, setDate] = React.useState(today);

  return (
    <DatePicker
      className={customClass}
      value={selectedDate}
      onChange={setDate}
      isOpen={false}
      calendarIcon="Calendar"
      clearIcon={null}
      minDate={minDate}
      maxDate={today}
    />
  );
};

ConverterDatepicker.propTypes = {
  customClass: stringType,
};

export default ConverterDatepicker;
