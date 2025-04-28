// src/routes/__root.tsx
import {
  createRootRoute,
  Outlet,
  useLoaderData,
  useSearch,
} from "@tanstack/react-router";
import ProductTimelineComponent from "../components/ProductTimelineComponent/ItemTracking";
import UserInvoiceInfo from "@/components/InvoiceComponents";
import { Layout } from "../components/commanComponents/Layout";
import { fetchInvoiceData } from "@/services/api";
import { InvoiceApiResponse } from "@/utils/types";

interface RootSearchParams {
  i?: string;
  t?: string;
}

export const Route = createRootRoute({
  component: () => {
    const search = useSearch({ strict: false }) as RootSearchParams;
    const { data } = useLoaderData({ from: "__root__" }) as {
      data: InvoiceApiResponse | null;
    };

    if (search.t) {
      return (
        <Layout>
          <ProductTimelineComponent itemId={search.t} />
        </Layout>
      );
    }

    if (search.i && data) {
      return (
        <Layout storeInfo={data.data.storeActions}>
          <UserInvoiceInfo invoiceData={data.data} />
        </Layout>
      );
    }

    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  },
  loader: async ({ location }) => {
    const searchParams = new URLSearchParams(location.search);
    const invoiceId = searchParams.get("i");
    if (invoiceId) {
      return {
        data: await fetchInvoiceData(invoiceId),
      };
    }

    return { data: null };
  },
  pendingComponent: () => <div>Loading...</div>,
});
