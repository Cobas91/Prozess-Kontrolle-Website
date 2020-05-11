import React from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DatePicker = (props) => {
  return (
    <div className="form-group">
      <label className="form-label">{props.title}</label>
      <Datepicker
        className={"Datepicker " + props.className}
        placeholderText={props.placeholderText}
        dateFormat={props.dateFormat}
        onChange={props.onChange}
        selected={props.selected}
      />
    </div>
  );
};

export default DatePicker;
