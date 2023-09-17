import { Navigate } from 'react-router-dom';
import { isAuth } from '@/utils/isAuth';
import propTypes from 'prop-types';

// 로그인 하지않은 사용자 접근 제한
const PrivateRoute = ({ component: Component }) => {
  return <>{isAuth() ? Component : <Navigate to="/login" />}</>;
};

PrivateRoute.propTypes = {
  component: propTypes.node,
};

export default PrivateRoute;
