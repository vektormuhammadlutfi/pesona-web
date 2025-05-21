import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/layout";
import { HomePage } from "@/pages/home-page";
import { ProductDetailPage } from "@/pages/product-detail-page";
import { ErrorBoundary } from "@/components/error-boundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:slug",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}