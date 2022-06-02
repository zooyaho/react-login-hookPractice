import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 사용자 login check, 이제 이 함수를 리액트에 의해 실행됨. 이 컴포넌트 재평가 후에 실행됨.
    const stroredUserLoggedInInfomation = localStorage.getItem("isLoggedIn");

    if (stroredUserLoggedInInfomation === "1") {
      setIsLoggedIn(true); // 무한루프 발생할 수 있음, state값이 계속 업데이트 되기 때문
    }
  }, []); // 지금은 의존성이 없기때문에 컴포넌트가 실행되고, 이 함수가 실행됨. -> 실제로 앱이 실행될때 한번만 실행됨. 그 이후로 의존성이 변하지 않으니까...
  // -> 로그인 버튼 클릭 후, state값이 변경되어, 컴포넌트가 실행되고, 이펙트 함수가 한번 실행됨.

  const loginHandler = (email, password) => {
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
    // context의 상태를 변경해줘야함.
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
    }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
