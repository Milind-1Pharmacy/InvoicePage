import { createRootRoute, Outlet, useLoaderData } from "@tanstack/react-router";
import { Layout } from "../components/commanComponents/Layout";
import { fetchInvoiceData, fetchProductData } from "@/services/api";
import { InvoiceApiResponse, ItemTrackingApiResponse } from "@/utils/types";
import { ErrorComponent, TruckLoader } from "@/components/commanComponents";
import React, { Suspense } from "react";

if (typeof window !== "undefined") {
  window.__LAST_API_RESPONSE = window.__LAST_API_RESPONSE || {};
}
const ProductTimelineComponent = React.lazy(
  () => import("../components/ProductTimelineComponent/ItemTracking")
);

const UserInvoiceInfo = React.lazy(
  () => import("../components/InvoiceComponents")
);

interface RootSearchParams {
  i?: string;
  t?: string;
}

export const Route = createRootRoute({
  component: () => {
    const searchParams = new URLSearchParams(window.location.search);
    const search = {
      i: searchParams.get("i") || undefined,
      t: searchParams.get("t") || undefined,
    } as RootSearchParams;

    const printCode = search.t?.startsWith("P")
      ? search.t.substring(1)
      : search.t;

    const loaderData = useLoaderData({ from: "__root__" }) as {
      data: InvoiceApiResponse | ItemTrackingApiResponse | null;
      isLoading?: boolean;
      error?: { userMessage: string; errorCode: number };
    };

    const { data, error } = loaderData;

    // If there's an error, save it to window object and render the error component
    if (error) {
      if (typeof window !== "undefined") {
        window.__LAST_API_RESPONSE = { error };
      }
      return <ErrorComponent />;
    }

    if (printCode && data && "item" in data.data) {
      return (
        <Layout storeInfo={data?.data?.item?.storeActions ?? undefined}>
          <Suspense fallback={<TruckLoader />}>
            <ProductTimelineComponent
              printCode={printCode}
              productData={data.data.item}
            />
          </Suspense>
        </Layout>
      );
    }

    if (search.i && data) {
      return (
        <Layout storeInfo={data.data.storeActions}>
          <Suspense fallback={<TruckLoader />}>
            <UserInvoiceInfo invoiceData={data.data} />
          </Suspense>
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
    let printCode = searchParams.get("t");
    const invoiceId = searchParams.get("i");

    if (invoiceId) {
      try {
        const response = await fetchInvoiceData(invoiceId);

        // Check if response contains an error despite 200 status
        if (response && response.error) {
          return {
            data: null,
            isLoading: false,
            error: response.error,
          };
        }

        return { data: response, isLoading: false };
      } catch (error) {
        console.error("Failed to fetch invoice data:", error);
        return {
          data: null,
          isLoading: false,
          error: {
            userMessage: "Failed to fetch invoice data",
            errorCode: 500,
          },
        };
      }
    }

    if (printCode) {
      try {
        const response = await fetchProductData(printCode);

        if (response && response.error) {
          return {
            data: null,
            isLoading: false,
            error: response.error,
          };
        }

        return { data: response, isLoading: false };
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        return {
          data: null,
          isLoading: false,
          error: {
            userMessage: "Failed to fetch product data",
            errorCode: 500,
          },
        };
      }
    }
    return { data: null, isLoading: false };
  },
  errorComponent: () => <ErrorComponent />,
  pendingComponent: () => (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <TruckLoader />
      </div>
    </Layout>
  ),
});
