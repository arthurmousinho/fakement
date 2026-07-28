import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <Header />
      <div className="mt-4 px-6 py-2">
        <Outlet />
      </div>
    </div>
  );
}
