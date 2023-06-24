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
      <ProtectedRoute isSignedIn={true}>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/locations',
        element: <Locations />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/locations/:locationId',
        element: <Location />,
      },
      {
        path: 'locations/add',
        element: <AddLocation />,
      },
      {
        path: '/developers/add',
        element: <AddDeveloper />,
      },
      {
        path: '/locations/:locationId/edit',
        element: <EditLocation />,
      },
    ],
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
