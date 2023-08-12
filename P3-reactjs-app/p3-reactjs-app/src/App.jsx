import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Homepage";
import { ItemsProvider } from "./components/itemprovider";
import CheckoutPage from "./pages/CheckoutPage";
import { OpenDivProvider } from "./components/opendivcontext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <CheckoutPage />,
  },
]);

function App() {
  return (
    <ItemsProvider>
      <OpenDivProvider>
        <RouterProvider router={router} />
      </OpenDivProvider>
    </ItemsProvider>
  );
}

export default App;
