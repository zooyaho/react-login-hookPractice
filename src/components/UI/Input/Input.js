import React from "react";

import styles from './input.module.css'

const Input = (props) => {
  return (
      <div className={`${styles.control} ${
            props.isValid === false ? styles.invalid : ""
          }`}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
      // <div
      //   className={`${classes.control} ${
      //     pswState.isValid === false ? classes.invalid : ""
      //   }`}
      // >
      //   <label htmlFor="password">Password</label>
      //   <input
      //     type="password"
      //     id="password"
      //     value={pswState.value}
      //     onChange={passwordChangeHandler}
      //     onBlur={validatePasswordHandler}
      //   />
      // </div>
      
  );
};

export default Input;
