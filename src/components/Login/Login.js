import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// 함수를 밖으로 뺀 이유: 이 리듀서 함수 내부에서는 컴포넌트 함수 내부에서 만들어진 어떤 데이터도 필요하지 않기 때문!
const emailReducer = (state, action) => {
  // 최신 state스냅샷, 디스패치된 액션

  if(action.type === "USER_INPUT") {
    return { value: action.val, isVaild: action.val.includes('@') };
  }
  if(action.type === "USER_BLUR") {
    // 인풋이 블러되어있으면 state의 값은 최신상태로 반환되어야 함.
    return { value: state.value, isVaild: state.value.includes('@') };
  }
  return {value:'', isValid:false};
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isVaild: null,
  });

  const emailChangeHandler = (event) => {
    // type필드가 있는 이 객체가 '액션'임.
    dispatchEmail({type: "USER_INPUT", val: event.target.value});

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      emailState.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    // 굳이 값을 설정할 필요 없음.
    dispatchEmail({type:'USER_BLUR'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isVaild === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
