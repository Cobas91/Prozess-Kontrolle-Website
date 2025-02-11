import React from "react";

const Select = (props) => {
  var kundenNamen = [];
  for (var index in props.options) {
    kundenNamen.push(props.options[index].Name);
  }
  if (props.title === "") {
    return (
      <div className="form-group">
        <select
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={props.handlechange}
          className="form-control"
        >
          <option value="" disabled>
            {props.placeholder}
          </option>
          {kundenNamen.map((option) => {
            return (
              <option id={option} value={option} label={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  } else {
    return (
      <div className="form-group">
        <label> {props.title} </label>
        <select
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={props.handlechange}
          className="form-control"
        >
          <option value="" disabled>
            {props.placeholder}
          </option>
          {kundenNamen.map((option) => {
            return (
              <option id={option} value={option} label={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
};

export default Select;
