import { SideMenu } from "../components";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores";

export const DashboardLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkStatus);

  if (authStatus === "pending") {
    checkAuthStatus();
    return <div>Loading...</div>;
  }

  if (authStatus === "unauthorized") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="w-screen h-screen overflow-y-scroll antialiased bg-slate-200 text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="relative flex flex-row w-screen">
        <SideMenu />

        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};