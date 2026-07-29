import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <div className="max-w-[80%] min-h-250 mx-auto p-4">
        <Header />
        <div className="mt-4 px-6 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
