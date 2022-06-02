import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // 더미 함수를 작성하면 IDE자동완성을 더 좋게 만듬~!
  onLogin: (email, password) => {},
});
// 빈 state의 컴포넌트 생성
// 보통 {}객체를 사용, 그러므로 객체를 갖는 컴포넌트를 반환함.

export const AuthContextProvider = (props) => {
  // 이렇게 provider 컴포넌트를 따로 만드는 이유는 useState를 사용할 수 있기 때문!
  // 전체 로그인 state를 관리함.

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 사용자 login check, 이제 이 함수를 리액트에 의해 실행됨. 이 컴포넌트 재평가 후에 실행됨.
    const stroredUserLoggedInInfomation = localStorage.getItem("isLoggedIn");

    if (stroredUserLoggedInInfomation === "1") {
      setIsLoggedIn(true); // 무한루프 발생할 수 있음, state값이 계속 업데이트 되기 때문
    }
  }, []); // 지금은 의존성이 없기때문에 컴포넌트가 실행되고, 이 함수가 실행됨. -> 실제로 앱이 실행될때 한번만 실행됨. 그 이후로 의존성이 변하지 않으니까...
  // -> 로그인 버튼 클릭 후, state값이 변경되어, 컴포넌트가 실행되고, 이펙트 함수가 한번 실행됨.

  const loginHandler = () => {
    /* 로그인이 되어 있는것을 로컬저장소에 저장 */
    // 1: 로그인O, 0: 로그인X
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    // 공급자에서 value프롭으로 기본값을 작성해야 충돌이 나지 않음.
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
