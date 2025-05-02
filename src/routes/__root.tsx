import { createRootRoute, Outlet, useLoaderData } from "@tanstack/react-router";
// import ProductTimelineComponent from "../components/ProductTimelineComponent/ItemTracking";
// import UserInvoiceInfo from "@/components/InvoiceComponents";
import { Layout } from "../components/commanComponents/Layout";
import { fetchInvoiceData, fetchProductData } from "@/services/api";
import { InvoiceApiResponse, ItemTrackingApiResponse } from "@/utils/types";
import { TruckLoader } from "@/components/commanComponents";
import React, { Suspense } from "react";

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
    // console.log("printCode", printCode);

    const loaderData = useLoaderData({ from: "__root__" }) as {
      data: InvoiceApiResponse | ItemTrackingApiResponse | null;
      isLoading?: boolean;
    };
    const { data } = loaderData;

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

    // if (printCode?.startsWith("P")) {
    //   printCode = printCode.substring(1);
    // }

    if (invoiceId) {
      try {
        const data = await fetchInvoiceData(invoiceId);
        return { data, isLoading: false };
      } catch (error) {
        console.error("Failed to fetch invoice data:", error);
        return { data: null, isLoading: false };
      }
    }

    if (printCode) {
      try {
        const data = await fetchProductData(printCode);
        return { data, isLoading: false };
      } catch (error) {
        console.error("Failed to fetch product data:", error);
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
