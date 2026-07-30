import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/main-layout";
import { ApiKeysPage } from "@/pages/api-keys";
import { PaymentsPage } from "@/pages/payments";
import { PaymentEventsPage } from "@/pages/payment-events";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <h1>dahboard</h1> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "events", element: <PaymentEventsPage /> },
      { path: "api-keys", element: <ApiKeysPage /> },
    ],
  },
]);
