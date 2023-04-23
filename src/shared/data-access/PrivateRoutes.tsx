import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
  if (!true) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoutes;
