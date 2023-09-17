import { Navigate } from 'react-router-dom';
import { isAuth } from '@/utils/isAuth';
import propTypes from 'prop-types';

// 로그인한 사용자 접근제한
const PublicRoute = ({ component: Component }) => {
  return <>{isAuth() ? <Navigate to="/main" /> : Component}</>;
};

PublicRoute.propTypes = {
  component: propTypes.node,
};

export default PublicRoute;
