import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import AuthLayout from 'src/layouts/AuthLayout';
import DoctorLayout from 'src/layouts/DoctorLayout';
import PatientLayout from 'src/layouts/PatientLayout';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';
import HomeView from 'src/pages/home';
import LoadingScreen from 'src/components/LoadingScreen';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/pages/errors/NotFoundView')),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: AuthLayout,
    path: '/login',
    component: lazy(() => import('src/pages/auth/Login')),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: AuthLayout,
    path: '/register',
    component: lazy(() => import('src/pages/auth/Register')),
  },
  {
    path: '/lab',
    guard: AuthGuard,
    layout: DoctorLayout,
    routes: [
      {
        exact: true,
        path: '/lab/report/:patientId/all',
        component: lazy(() => import('src/pages/management/LabRecord/Records')),
      },
    ]
  },
  {
    path: '/patient',
    guard: AuthGuard,
    layout: PatientLayout,
    routes: [
      {
        exact: true,
        path: '/patient/dashboard',
        component: lazy(() => import('src/pages/errors/PageInView')),
      },
      {
        exact: true,
        path: '/patient',
        component: () => <Redirect to='/patient/dashboard' />,
      },
    ],
  },
  {
    path: '/doctor',
    guard: AuthGuard,
    layout: DoctorLayout,
    routes: [
      {
        exact: true,
        path: '/doctor/dashboard',
        component: lazy(() => import('src/pages/management/Dashboard')),
      },
      {
        exact: true,
        path: '/doctor/appointment',
        component: lazy(() =>
          import('src/pages/management/Appointment/Calendar')
        ),
      },
      {
        exact: true,
        path: '/doctor/management/patients',
        component: lazy(() =>
          import('src/pages/management/Patient/PatientList')
        ),
      },
      {
        exact: true,
        path: [
          '/doctor/management/patients/new',
          '/doctor/management/patients/:patientId/edit',
        ],
        component: lazy(() =>
          import('src/pages/management/Patient/PatientForm')
        ),
      },
      {
        exact: true,
        path: '/doctor/management/patients/:patientId/:label?',
        component: lazy(() =>
          import('src/pages/management/Patient/PatientDetails')
        ),
      },
      {
        exact: true,
        path: '/doctor/management/all',
        component: lazy(() =>
          import('src/pages/management/Employee/EmployeeListView')
        ),
      },
      {
        exact: true,
        path: '/doctor/management/finances',
        component: lazy(() => import('src/pages/management/Finance')),
      },
      {
        exact: true,
        path: '/doctor/management/finances/:id',
        component: lazy(() => import('src/pages/errors/PageInView')),
      },
      {
        exact: true,
        path: '/doctor/management/records',
        component: lazy(() => import('src/pages/management/LabRecord')),
      },
      {
        exact: true,
        path: '/doctor/management/records/:id',
        component: lazy(() => import('src/pages/errors/PageInView')),
      },
      {
        exact: true,
        path: '/doctor/chat',
        component: lazy(() => import('src/pages/errors/PageInView')),
      },
      {
        exact: true,
        path: '/doctor/account',
        component: lazy(() => import('src/pages/errors/PageInView')),
      },
      {
        exact: true,
        path: '/doctor/pricing',
        component: lazy(() => import('src/pages/errors/PageInView')),
      },
      {
        exact: true,
        path: '/doctor',
        component: () => <Redirect to='/doctor/dashboard' />,
      },
      {
        component: () => <Redirect to='/404' />,
      },
    ],
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: HomeView,
      },
      {
        exact: true,
        path: '/contact',
        component: lazy(() => import('src/pages/contact')),
      },
      {
        component: () => <Redirect to='/404' />,
      },
    ],
  },
];

export default routes;
