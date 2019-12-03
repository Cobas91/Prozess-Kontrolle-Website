import React from "react";

const Button = props => {
  return (
    <div className="form-group">
    <button
      style={props.style}
      className={
        props.type === "primary" ? "btn btn-primary" : "btn btn-secondary"
      }
      onClick={props.action}
    >
      {props.title}
    </button>
    </div>
  );
};

export default Button;
