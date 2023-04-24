import { Suspense, lazy } from 'react';
import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import NonPrivateRoutes from './features/shared/data-access/NonPrivateRoutes';
import PrivateRoutes from './features/shared/data-access/PrivateRoutes';
import Footer from './features/shared/ui/footer/Footer';
import Header from './features/shared/ui/header/Header';
import { useGetCurrentUser } from './hooks';
import { history } from './utils/history';

const Home = lazy(() => import('./features/home/Home'));
const Login = lazy(() => import('./features/login/Login'));
const Register = lazy(() => import('./features/register/Register'));
// const Profile = lazy(() => import('profile/Profile'));
const Settings = lazy(() => import('./features/settings/Settings'));
// const Editor = lazy(() => import('editor/Editor'));
// const Article = lazy(() => import('article/Article'));
const NotFound = lazy(() => import('./features/shared/ui/not-found/NotFound'));

function App() {
  history.navigate = useNavigate();
  const { data: user, isError, isSuccess } = useGetCurrentUser();

  const routes = useRoutes([
    {
      index: true,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home user={user} />
        </Suspense>
      )
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NonPrivateRoutes user={user}>
            <Login />
          </NonPrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'register',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NonPrivateRoutes user={user}>
            <Register />
          </NonPrivateRoutes>
        </Suspense>
      )
    },
    // {
    //   path: 'profile/:username',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <PrivateRoutes  user={user}>
    //         <Profile />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    {
      path: 'settings',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PrivateRoutes user={user}>
            <Settings user={user} />
          </PrivateRoutes>
        </Suspense>
      )
    },
    // {
    //   path: 'article/:slug',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <PrivateRoutes  user={user}>
    //         <Article />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'editor',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <PrivateRoutes  user={user}>
    //         <Editor />
    //       </PrivateRoutes>
    //     </Suspense>
    //   ),
    //   children: [{ path: ':slug', element: <Editor /> }]
    // },
    {
      path: '*',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      )
    }
  ]);

  return (
    <>
      {(isError || isSuccess) && (
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
