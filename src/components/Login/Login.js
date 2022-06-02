import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// 함수를 밖으로 뺀 이유: 이 리듀서 함수 내부에서는 컴포넌트 함수 내부에서 만들어진 어떤 데이터도 필요하지 않기 때문!
const emailReducer = (state, action) => {
  // 최신 state스냅샷, 디스패치된 액션

  if (action.type === "INPUT_EMAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_EMAIL_BLUR") {
    // 인풋이 블러되어있으면 state의 값은 최신상태로 반환되어야 함.
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const pswReducer = (state, action) => {
  // action을 사용하여 로직을 작성함.
  if (action.type === "INPUT_PSW") {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }
  if (action.type === "INPUT_PSW_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [pswState, dispatchPsw] = useReducer(pswReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("유효성 검사 시작!");
      setFormIsValid(emailState.isValid && pswState.isValid);
    }, 500);

    return () => {
      console.log("Clean Up!");
      clearTimeout(identifier);
    };
  }, [emailState, pswState]);

  const emailChangeHandler = (event) => {
    // type필드가 있는 이 객체가 '액션'임.
    dispatchEmail({ type: "INPUT_EMAIL", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPsw({ type: "INPUT_PSW", val: event.target.value });
  };

  const validateEmailHandler = () => {
    // 굳이 값을 설정할 필요 없음.
    dispatchEmail({ type: "INPUT_EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPsw({ type: "INPUT_PSW_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, pswState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
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
            pswState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pswState.value}
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
