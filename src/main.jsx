import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ShoppingCart from './pages/ShoppingCart.jsx';
import Main from './pages/Main.jsx';
import CheckOut from './pages/CheckOut.jsx';
import store from './store/store.jsx';
import { Provider } from 'react-redux';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProductView from './pages/ProductView.jsx';
import ProtectedRoute from './routes/ProtectedRoutes.jsx';  // Import the ProtectedRoute component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path:"/cart",
        element: <ShoppingCart/>
      },
      {
        path:"/checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path:"/about",
        element: <AboutUs/>
      },
      {
        path:"/contact",
        element: <ContactUs/>
      },
      {
        path: "/products",
        element: <ProductView />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
