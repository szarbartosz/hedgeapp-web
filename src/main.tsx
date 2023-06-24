import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import ErrorPage from './pages/error-page';
import { SignIn } from './pages/login-page';
import { SignUp } from './pages/register-page';
import './index.css';
import Locations from './pages/locations-page';
import AddLocation from './pages/add-location-page';
import Location from './pages/location-details';
import AddDeveloper from './pages/add-developer-page';
import EditLocation from './pages/edit-location-page';
import Settings from './pages/settings-page';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './pages/not-found';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/locations',
        element: (
          <ProtectedRoute>
            <Locations />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: '/locations/:locationId',
        element: (
          <ProtectedRoute>
            <Location />
          </ProtectedRoute>
        ),
      },
      {
        path: 'locations/add',
        element: (
          <ProtectedRoute>
            <AddLocation />
          </ProtectedRoute>
        ),
      },
      {
        path: '/developers/add',
        element: (
          <ProtectedRoute>
            <AddDeveloper />
          </ProtectedRoute>
        ),
      },
      {
        path: '/locations/:locationId/edit',
        element: (
          <ProtectedRoute>
            <EditLocation />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: (
          <ProtectedRoute>
            <PageNotFound />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
