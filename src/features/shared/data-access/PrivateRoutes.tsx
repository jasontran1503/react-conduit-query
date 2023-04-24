import { Navigate } from 'react-router-dom';
import { User } from 'src/common/models';

const PrivateRoutes = ({ user, children }: { user: User | null; children: JSX.Element }) => {
  // if (!user) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default PrivateRoutes;
