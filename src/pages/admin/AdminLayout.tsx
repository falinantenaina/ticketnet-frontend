import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useUserStore } from "../../stores/userStore";
import { AdminNavbar } from "./AdminNavbar";

const AdminLayout = () => {
  const { user, getProfil } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProfil();
  }, []);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);
  return (
    <div>
      <AdminNavbar />
      <main className="px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
