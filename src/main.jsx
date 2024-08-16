import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCart from "./USER/pages/ShoppingCart.jsx";
import Main from "./USER/pages/Main.jsx";
import CheckOut from "./USER/pages/CheckOut.jsx";
import store from "./USER/store/store.jsx";
import { Provider } from "react-redux";
import AboutUs from "./USER/pages/AboutUs.jsx";
import ContactUs from "./USER/pages/ContactUs.jsx";
import Login from "./USER/pages/Login.jsx";
import Register from "./USER/pages/Register.jsx";
import ProductView from "./USER/pages/ProductView.jsx";
import ProtectedRoute from "./USER/routes/ProtectedRoutes.jsx"; // Import the ProtectedRoute component
import WishList from "./USER/pages/WishList.jsx";
import ProductCategories from "./USER/pages/Categories/ProductCategories.jsx";
import CategoriesPage from "./USER/pages/CategoriesPage.jsx";
import Thanks from "./USER/pages/Thanks.jsx";

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
        path: "/cart",
        element: <ShoppingCart />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/products/:id/:slug",
        element: <ProductView />,
      },
      {
        path: "/category/:id/:slug",
        element: <CategoriesPage />,
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
  {
    path: "/thanks",
    element: <Thanks />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
