import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: ()=>{}, // 더미 함수를 작성하면 IDE자동완성을 더 좋게 만듬~!
});
// 빈 state의 컴포넌트 생성
// 보통 {}객체를 사용, 그러므로 객체를 갖는 컴포넌트를 반환함.

export default AuthContext;