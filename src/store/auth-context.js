import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
});
// 빈 state의 컴포넌트 생성
// 보통 {}객체를 사용, 그러므로 객체를 갖는 컴포넌트를 반환함.

export default AuthContext;