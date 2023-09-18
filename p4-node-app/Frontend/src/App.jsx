import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Homepage";
import { ItemsProvider } from "./model/providers/itemprovider";
import CheckoutPage from "./pages/CheckoutPage";
import { OpenDivProvider } from "./model/providers/opendivprovider";
import SellerPage from "./pages/SellerPage";
import { InActiveItemsProvider } from "./model/providers/inactiveitemsprovider";
import RecycleBinPage from "./pages/productrecylebin";
import LoginPage from "./pages/LogInPage";
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from "./components/Authguard";
import { CartProvider } from "./model/providers/cartProvider";
import { AuthProvider } from "./model/providers/authprovider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <CheckoutPage />,
  },
  {
    path: "/sellerhub",
    element: (
      <AuthGuard>
        <SellerPage />
      </AuthGuard>
    ),
  },
  {
    path: "/recyclebin",
    element: (
      <AuthGuard>
        <RecycleBinPage />
      </AuthGuard>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <CartProvider>
      <InActiveItemsProvider>
        <ItemsProvider>
          <OpenDivProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </OpenDivProvider>
        </ItemsProvider>
      </InActiveItemsProvider>
    </CartProvider>
  );
}

export default App;
