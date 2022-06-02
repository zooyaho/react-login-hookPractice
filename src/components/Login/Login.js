import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// 함수를 밖으로 뺀 이유: 이 리듀서 함수 내부에서는 컴포넌트 함수 내부에서 만들어진 어떤 데이터도 필요하지 않기 때문!
const emailReducer = (state, action) => {
  // 최신 state스냅샷, 디스패치된 액션

  //리액트는 새 액션이 디스패치될 때마다 이 리듀서함수를 호출함, 새로운 업데이트된 state를 반환함.

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

  // 객체의 디스트럭처링을 이용하여 isValid값을 할당함.
  const {isValid:emailIsValid} = emailState;
  const {isValid:pswIsValid} = pswState;

  // 값만 변경되고 유효성은 변경되지 않으면 이펙트 함수는 실행되지 않음!
  // 이펙트가 불필요하게 실행되는 것을 피함.
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("유효성 검사 시작!");
      setFormIsValid(emailIsValid && pswIsValid);
    }, 500);

    return () => {
      console.log("Clean Up!");
      clearTimeout(identifier);
    };
  }, [emailIsValid, pswIsValid]);
  // emailState.isValid로 작성할 경우, emailState가 변경될 때마다 이펙트함수가 실행될 것이기 때문에 디스트럭쳐링을 사용하여 정의하는 것이 좋음.

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
