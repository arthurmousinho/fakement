import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/main-layout";
import { ApiKeysPage } from "@/pages/api-keys";
import { PaymentsPage } from "@/pages/payments";
import { WebhooksPage } from "@/pages/webhooks";
import { CheckoutPage } from "@/pages/checkout";
import { ApiDoc } from "@/pages/api-doc";
import { CheckoutDefaultSuccessPage } from "@/pages/checkout-default-success";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <h1>dahboard</h1> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "webhooks", element: <WebhooksPage /> },
      { path: "api-keys", element: <ApiKeysPage /> },
      { path: "api-doc", element: <ApiDoc /> },
    ],
  },
  { path: "checkout/:id", element: <CheckoutPage /> },
  { path: "success-checkout", element: <CheckoutDefaultSuccessPage /> },
]);
