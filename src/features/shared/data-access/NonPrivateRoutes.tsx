import { Navigate } from 'react-router-dom';
import { User } from 'src/common/models';
import { useGetQueryData } from 'src/hooks';

const NonPrivateRoutes = ({ children }: { children: JSX.Element }) => {
  const user = useGetQueryData<User>(['user']);

  // if (!user) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default NonPrivateRoutes;
