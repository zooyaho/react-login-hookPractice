import React, { useRef, useImperativeHandle } from "react";

import styles from "./input.module.css";

// React.forwardRef(컴포넌트 함수,) : ref에 바인딩 될 수 있는 리액트 컴포넌트를 반환함. ref와 함께 제어하거나 사용할 수 있음.
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  // useImperativeHandle훅 : 컴포넌트나 컴포넌트 내부에서 오는 기능들을 명령적으로 사용할 수 있게 함. 즉 일반적인 state프롭관리를 통하지 않고 부모 컴포넌트의 state를 통해 컴포넌트를 제어하지 않고 프로그래밍적으로 컴포넌트에서 무언가를 직접 호출하거나 조작해서 사용하게 해줌...
  useImperativeHandle(ref,()=>{
    // 객체를 반환: 외부에서 사용할 수 있는 모든 데이터를 포함함.
    return {
      focus: activate
    }
  })

  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
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
});

export default Input;
