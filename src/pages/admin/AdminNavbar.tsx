import { LogOut, ShieldUser, SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router";
import logo from "../../assets/logo.webp";
import { useUserStore } from "../../stores/userStore";

export const AdminNavbar = () => {
  const { user, logout } = useUserStore();
  return (
    <nav className="bg-card w-full border-b border-gray-200/20 px-4 py-4 shadow-xs shadow-gray-200/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to={"/admin/dashboard"} className="flex items-center gap-x-2">
          <img src={logo} className="size-6 md:size-10" alt="Itad logo" />
          <span className="md:text-xl">Itad Admin</span>
        </Link>
        <div className="flex items-center gap-x-2 md:gap-x-6">
          <div className="bg-primary/40 flex items-center gap-2 rounded-xl px-4 py-2 md:px-6">
            <ShieldUser className="size-5" />
            <span>{user?.username}</span>
          </div>
          <Link to={"/buy"} className="cursor-pointer" target="_blank">
            <SquareArrowOutUpRight className="size-5" />
          </Link>
          <button onClick={logout} className="cursor-pointer">
            <LogOut className="text-primary size-5 font-bold" strokeWidth={3} />
          </button>
        </div>
      </div>
    </nav>
  );
};
