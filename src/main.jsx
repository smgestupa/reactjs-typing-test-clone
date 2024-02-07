import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css';

// Routes
import Index from './routes/index';
import Leaderboard from './routes/leaderboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
