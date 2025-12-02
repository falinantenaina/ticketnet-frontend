import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl px-4 py-4 print:h-max print:min-h-0">
      <Outlet />
    </div>
  );
};

export default Layout;
