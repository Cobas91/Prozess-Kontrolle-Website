import React from "react";
import Switch from 'react-switch'

const Input = props => {
    var className;
  if(!props.className){
      className = "dg_switch"
  }else{
      className = props.className
  }
  return (
    <div className="form-group">
      <label className="form-label">
        {props.title}
      </label>
      <br/>
      <Switch onChange={props.onChange} checked={props.checked} className={className}/>
    </div>
  );
};

export default Input;
