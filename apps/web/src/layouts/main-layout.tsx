import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="max-w-[90%] mx-auto py-6">
      <Header />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
