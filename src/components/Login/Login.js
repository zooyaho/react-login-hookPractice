import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    // '디바운싱'기술: 사용자 입력을 그룹화하는 것
    // 일정시간동안 키를 누르지 않으면 그때 유효성검사를 하는게 좋음
    const identifier = setTimeout(()=>{
      // 3초동안 입력한 값들의 유효성검사를 하지 않고, 3초 후에 유효성검사를 한번만함.
      console.log("유효성 검사 시작!");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 300);

    // return하는 함수를 Cleanup함수라고 함.
    // 처음 실행 제외하고, 이펙트함수 실행전 클린업함수 실행을 먼저 함.
    // UnMount될때도 실행됨 -> 즉, 이 컴포넌트가 재실행될때
    return ()=>{
      console.log('Clean Up!');
      // 새로운 타이머를 설정하기 전에 마지막 타이머를 지운것.
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);
  // 세가지 중(setFormIsValid, enteredEmail, enteredPassword)에 하나라도 변경되면 이펙트함수 실행됨.
  // state업데이트하는 함수(setFormIsValid)는 보통 생략함, 리액트에 의해 변경되는게 아니기 때문.

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
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
