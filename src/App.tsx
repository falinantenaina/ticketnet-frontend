import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import BuyTickets from "./pages/BuyTicket";
import HomePage from "./pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/buy",
          element: <BuyTickets />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
