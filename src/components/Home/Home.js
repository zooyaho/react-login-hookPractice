import React,{useContext} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogin}>Logout</Button>
      {/* Button은 프레젠테이션 컴포넌트이기때문에 useContext사용해서 핸들러를 등록시킬 필요없음 -> 바인딩하면 이 버튼은 항상 로그아웃만 되기때문에!! */}
    </Card>
  );
};

export default Home;
