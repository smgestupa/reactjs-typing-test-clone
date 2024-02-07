import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css';

// Components
import Nav from './components/nav';

// Routes
import Index from './routes/index';
import Play from './routes/play';
import Leaderboard from './routes/leaderboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/play",
    element: <Play />
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
