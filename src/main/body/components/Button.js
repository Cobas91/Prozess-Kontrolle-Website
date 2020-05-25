import React from "react";

const Button = (props) => {
  return (
    <button
      style={props.style}
      className={props.className ? props.className : "btn btn-outline-dark"}
      onClick={props.action}
    >
      {props.title}
    </button>
  );
};

export default Button;
