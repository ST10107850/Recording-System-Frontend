// components/Sidebar.js
import {
  Home,
  ShoppingCart,
  ShoppingBag,
  FolderOpen,
  Users,
  UserCheck,
  CheckSquare,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: <Home size={20} /> },
  { title: "Sales", url: "/sales", icon: <ShoppingCart size={20} /> },
  { title: "Purchases", url: "/purchases", icon: <ShoppingBag size={20} /> },
  { title: "Projects", url: "/projects", icon: <FolderOpen size={20} /> },
  { title: "Staff", url: "/staff", icon: <Users size={20} /> },
  { title: "Resellers", url: "/resellers", icon: <UserCheck size={20} /> },
  { title: "Tasks", url: "/tasks", icon: <CheckSquare size={20} /> },
  { title: "Invoicing", url: "/invoices", icon: <FileText size={20} /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-fafafa shadow-md flex flex-col border-r border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">DB</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Dough Better
            </h2>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            className={`flex items-center gap-3 p-2 text-sm text-customGray rounded space-y-2 hover:bg-blue-100 ${
              location.pathname === item.url ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto text-sm text-gray-500 p-4 border-t border-gray-200">
        V 1.3.4 <br></br>© Copyright 2023<br></br> Mhlantuma (Pty) Ltd
      </div>
    </div>
  );
};

export default Sidebar;
