import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Homepage";
import { ItemsProvider } from "./components/itemProvider";
import Itempage from "./pages/Itempage";
import Modal from "./components/Modal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <Itempage />,
  },
]);

function App() {
  return (
    <ItemsProvider>
      <RouterProvider router={router} />
    </ItemsProvider>
  );
}

export default App;
