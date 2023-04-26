import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useNavigate, useRoutes } from 'react-router-dom';
import NonPrivateRoutes from './features/shared/data-access/NonPrivateRoutes';
import PrivateRoutes from './features/shared/data-access/PrivateRoutes';
import Footer from './features/shared/ui/footer/Footer';
import Header from './features/shared/ui/header/Header';
import Spinner from './features/shared/ui/spinner/Spinner';
import { useGetCurrentUser } from './hooks';
import { history } from './utils/history';

const Home = lazy(() => import('./features/home/Home'));
const Login = lazy(() => import('./features/login/Login'));
const Register = lazy(() => import('./features/register/Register'));
const Profile = lazy(() => import('./features/profile/Profile'));
const Settings = lazy(() => import('./features/settings/Settings'));
const Editor = lazy(() => import('./features/editor/Editor'));
const Article = lazy(() => import('./features/article/Article'));
const NotFound = lazy(() => import('./features/shared/ui/not-found/NotFound'));

function App() {
  history.navigate = useNavigate();
  const { data: user, isFetching } = useGetCurrentUser();

  const routes = useRoutes([
    {
      index: true,
      element: (
        <Suspense fallback={<Spinner />}>
          <Home user={user} />
        </Suspense>
      )
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={<Spinner />}>
          <NonPrivateRoutes user={user}>
            <Login />
          </NonPrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'register',
      element: (
        <Suspense fallback={<Spinner />}>
          <NonPrivateRoutes user={user}>
            <Register />
          </NonPrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'profile/:username',
      element: (
        <Suspense fallback={<Spinner />}>
          <Profile user={user} />
        </Suspense>
      )
    },
    {
      path: 'settings',
      element: (
        <Suspense fallback={<Spinner />}>
          <PrivateRoutes user={user}>
            <Settings user={user} />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'article/:slug',
      element: (
        <Suspense fallback={<Spinner />}>
          <Article />
        </Suspense>
      )
    },
    {
      path: 'editor/:slug?',
      element: (
        <Suspense fallback={<Spinner />}>
          <PrivateRoutes user={user}>
            <Editor user={user} />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: '404',
      element: (
        <Suspense fallback={<Spinner />}>
          <NotFound />
        </Suspense>
      )
    },
    {
      path: '*',
      element: <Navigate to="/404" />
    }
  ]);

  return (
    <>
      {!isFetching && (
        <>
          <Header user={user} />
          {routes}
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
