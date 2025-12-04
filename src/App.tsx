import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import BuyTickets from "./pages/BuyTicket";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import { Login } from "./pages/admin/Login";

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
    {
      path: "login",
      element: <Login />,
    },

    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
