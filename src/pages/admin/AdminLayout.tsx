import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import logo from "../../assets/logo.webp";
import { useUserStore } from "../../stores/userStore";

const AdminLayout = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="bg-background w-full">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center justify-center gap-x-1">
            <img src={logo} alt="Itad logo" className="size-10" />
            <span className="text-primary text-xl font-semibold">Admin</span>
          </div>
          <div className="flex gap-x-2">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Link to={"/admin/dashboard"}>Plan</Link>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>Copryrigth</footer>
    </div>
  );
};

export default AdminLayout;
