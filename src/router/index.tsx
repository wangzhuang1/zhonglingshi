import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Test from '../pages/Test';
import GuPiao from '../pages/GuPiao';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/gupiao',
    element: <GuPiao />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);
