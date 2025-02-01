import { Outlet } from "react-router";
import { Sidebar } from "./components/sidebar";

export const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};
