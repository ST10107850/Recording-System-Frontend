import AppSidebar from "../components/AppSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <div className=" flex-1 bg-f9fafb overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
