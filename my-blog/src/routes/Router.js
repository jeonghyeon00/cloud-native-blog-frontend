import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Information = Loadable(lazy(() => import('../views/dashboard/Information')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Board = Loadable(lazy(() => import('../views/utilities/Board')));
const BoardByOne = Loadable(lazy(() => import('../views/utilities/BoardByOne')));
const BoardsWrite = Loadable(lazy(() => import('../views/utilities/BoardsWrite')));
const BoardUpdate = Loadable(lazy(() => import('../views/utilities/BoardUpdate')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Todo = Loadable(lazy(() => import('../views/utilities/Todo')));
const TodoWrite = Loadable(lazy(() => import('../views/utilities/TodoWrite')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/information" /> },
      { path: '/information', exact: true, element: <Information /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/boards', exact: true, element: <Board /> },
      { path: '/boards/write', exact: true, element: <BoardsWrite /> },
      { path: '/boards/update/*', exact: true, element: <BoardUpdate /> },
      { path: '/boards/*', exact: true, element: <BoardByOne /> },
      { path: '/todo', exact: true, element: <Todo /> },
      { path: '/todo/write', exact: true, element: <TodoWrite /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
