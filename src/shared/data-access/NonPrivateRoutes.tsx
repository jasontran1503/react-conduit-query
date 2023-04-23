import { Navigate } from 'react-router-dom';

const NonPrivateRoutes = ({ children }: { children: JSX.Element }) => {
  if (true) {
    return <Navigate to="/" />;
  }

  return children;
};

export default NonPrivateRoutes;
