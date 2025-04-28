// src/routes/__root.tsx
import {
  createRootRoute,
  Outlet,
  useLoaderData,
  useSearch,
  useRouterState,
} from "@tanstack/react-router";
import ProductTimelineComponent from "../components/ProductTimelineComponent/ItemTracking";
import UserInvoiceInfo from "@/components/InvoiceComponents";
import { Layout } from "../components/commanComponents/Layout";
import { fetchInvoiceData } from "@/services/api";
import { InvoiceApiResponse } from "@/utils/types";
import { TruckLoader } from "@/components/commanComponents";
import { useState, useEffect } from "react";

interface RootSearchParams {
  i?: string;
  t?: string;
}

export const Route = createRootRoute({
  component: () => {
    const search = useSearch({ strict: false }) as RootSearchParams;
    const routerState = useRouterState();
    const loaderData = useLoaderData({ from: "__root__" }) as {
      data: InvoiceApiResponse | null;
      isLoading?: boolean;
    };
    const { data, isLoading } = loaderData;

    // State to track if we're loading data
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
      // Show loader when:
      // 1. Route is loading, OR
      // 2. We have an invoice ID but no data yet, OR
      // 3. The loader is explicitly in loading state
      const shouldLoad =
        routerState.isLoading || (search.i && !data) || isLoading;
      console.log("Setting isLoadingData to:", shouldLoad);
      setIsLoadingData(shouldLoad ?? false);
    }, [routerState.isLoading, search.i, data, isLoading]);

    console.log("Current isLoadingData:", isLoadingData);

    // Show loading state when data is being fetched
    if (isLoadingData) {
      return (
        <Layout>
          <div className="flex justify-center items-center h-screen">
            <TruckLoader />
          </div>
        </Layout>
      );
    }

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
          {!isLoading ? (
            <UserInvoiceInfo invoiceData={data.data} />
          ) : (
            <TruckLoader />
          )}{" "}
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
      try {
        const data = await fetchInvoiceData(invoiceId);
        return { data, isLoading: false };
      } catch (error) {
        console.error("Failed to fetch invoice data:", error);
        return { data: null, isLoading: false };
      }
    }
    return { data: null, isLoading: false };
  },
  errorComponent: () => (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        Error occurred...
      </div>
    </Layout>
  ),
  pendingComponent: () => (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <TruckLoader />
      </div>
    </Layout>
  ),
});
