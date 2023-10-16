import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./controllers.jsx/home";
import { ProjProvider } from "./providers.jsx/projProviders";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
   
      <ProjProvider>
        <RouterProvider router={router} />
      </ProjProvider>
   
  );
}

export default App;
