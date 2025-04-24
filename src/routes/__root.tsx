// src/routes/__root.tsx
import { createRootRoute, Outlet, useSearch } from "@tanstack/react-router";
import ProductTimelineComponent from "../components/ProductTimelineComponent/ItemTracking";
import UserInvoiceInfo from "@/components/InvoiceComponents";
import { Layout } from "../components/commanComponents/Layout";

export const Route = createRootRoute({
  component: () => {
    const search = useSearch({
      strict: false,
    }) as { t?: string; i?: string };

    // If we have specific query parameters, render those components
    if (search.t) {
      return (
        <Layout>
          <ProductTimelineComponent itemId={search.t} />
        </Layout>
      );
    }

    if (search.i) {
      return (
        <Layout>
          <UserInvoiceInfo invoiceId={search.i} />
        </Layout>
      );
    }

    // Default case: render the Layout with Outlet for nested routes
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  },
});
