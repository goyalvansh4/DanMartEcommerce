import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCart from "./USER/pages/Orders/ShoppingCart.jsx";
import Main from "./USER/pages/Main.jsx";
import CheckOut from "./USER/pages/Orders/CheckOut.jsx";
import store from "./USER/store/store.jsx";
import { Provider } from "react-redux";
import AboutUs from "./USER/pages/AboutUs.jsx";
import ContactUs from "./USER/pages/ContactUs.jsx";
import Login from "./USER/pages/Authentication/Login.jsx";
import Register from "./USER/pages/Authentication/Register.jsx";
import ProductView from "./USER/pages/Products/ProductView.jsx";
import WishList from "./USER/pages/WishList.jsx";
import CategoriesPage from "./USER/pages/Categories/CategoriesPage.jsx";
import Thanks from "./USER/pages/Payment/Thanks.jsx";
import TopProducts from "./USER/pages/Products/TopProducts.jsx";
import FeatureProducts from "./USER/pages/Products/FeatureProducts.jsx";
import OrderHistory from "./USER/pages/Orders/OrderHistory.jsx";
import PaymentCancel from "./USER/pages/Payment/PaymentCancel.jsx";
import PaymentFailed from "./USER/pages/Payment/PaymentFailed.jsx";
import TrackOrder from "./USER/pages/Orders/TrackOrder.jsx";

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
      {
        path: "/top-products",
        element: <TopProducts />,
      },
      {
        path: "/feature-products",
        element: <FeatureProducts />,
      },
      {
        path: "/orders",
        element: <OrderHistory />,
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
  {
    path: "/cancel",
    element: <PaymentCancel />,
  },
  {
    path: "/failed",
    element: <PaymentFailed />,
  },
  {
    path: "/track",
    element: <TrackOrder />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
