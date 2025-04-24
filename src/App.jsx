import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./pages/Home";
import Error404Page from "./pages/Error404Page";
import Applayout from "./components/Applayout";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import UserPage from "./pages/UserPage";
import UserPersonalDetails from "./pages/UserPersonalDetails";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import UserAddress from "./pages/UserAddress";
import SingleItemDetails from "./pages/SingleItemDetails";
import ReviewPage from "./pages/ReviewPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    errorElement: <Error404Page />,
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: (
          <ProtectedRoutes>
            <UserPage />
          </ProtectedRoutes>
        ),
        // loader: menueLoader,
      },
      {
        path: "/user/details",
        element: (
          <ProtectedRoutes>
            <UserPersonalDetails />
          </ProtectedRoutes>
        ),
        // loader: menueLoader,
      },
      {
        path: "/user/address",
        element: (
          <ProtectedRoutes>
            <UserAddress />
          </ProtectedRoutes>
        ),
        // loader: menueLoader,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: (
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/signin",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/product/:itemID",
        element: <SingleItemDetails />,
      },
      {
        path: "/review/:itemID",
        element: (
          <ProtectedRoutes>
            <ReviewPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoutes>
            <CheckoutPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        gutter={12}
        reverseOrder={false}
        containerStyle={{ margin: "8px", padding: "10px 20px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 10000,
          },

          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f7f7f7",
            color: "#222222",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
