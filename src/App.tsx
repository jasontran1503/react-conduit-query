import { Suspense, lazy } from 'react';
import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import NonPrivateRoutes from './features/shared/data-access/NonPrivateRoutes';
import PrivateRoutes from './features/shared/data-access/PrivateRoutes';
import Footer from './features/shared/ui/footer/Footer';
import Header from './features/shared/ui/header/Header';
import { history } from './utils/history';

// const Home = lazy(() => import('home/Home'));
const Login = lazy(() => import('./features/login/Login'));
const Register = lazy(() => import('./features/register/Register'));
// const Profile = lazy(() => import('profile/Profile'));
const Settings = lazy(() => import('./features/settings/Settings'));
// const Editor = lazy(() => import('editor/Editor'));
// const Article = lazy(() => import('article/Article'));
const NotFound = lazy(() => import('./features/shared/ui/not-found/NotFound'));

function App() {
  history.navigate = useNavigate();

  const routes = useRoutes([
    // {
    //   index: true,
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <Home />
    //     </Suspense>
    //   )
    // },
    {
      path: 'login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NonPrivateRoutes>
            <Login />
          </NonPrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'register',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NonPrivateRoutes>
            <Register />
          </NonPrivateRoutes>
        </Suspense>
      )
    },
    // {
    //   path: 'profile/:username',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <PrivateRoutes>
    //         <Profile />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    {
      path: 'settings',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PrivateRoutes>
            <Settings />
          </PrivateRoutes>
        </Suspense>
      )
    },
    // {
    //   path: 'article/:slug',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <PrivateRoutes>
    //         <Article />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'editor',
    //   element: (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <PrivateRoutes>
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
      <Header />
      {routes}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
