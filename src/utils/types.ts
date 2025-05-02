// src/components/ProductTimelineComponent/types.ts
export type TimelineStatus = "completed" | "in-progress" | "pending";
export type ProductStage =
  | "manufacturer"
  | "supplier"
  | "retailer"
  | "consumer";

export interface TimelineStage {
  stage: ProductStage | string;
  name: string;
  location?: string;
  date?: string;
  gstIn?: string;
  phoneNo?: string;
}

export interface ProductData {
  id: string;
  description?: string;
  name: string;
  mrp: string;
  imgUrl?: string;
  serialNo?: string;
  batchNo?: string;
}

export interface Product {
  timeline: TimelineStage[];
  productData: ProductData;
}

export interface InvoiceApiResponse {
  data: {
    storeActions: {
      storeName: string;
      storeLogo: string;
    };
    user: {
      name: string;
      phone: string;
    };
    invoiceDetail: {
      invoiceId: string;
      amount: number;
      issuedEpoch: number;
      itemsSummary: {
        totalItems: number;
      };
      paymentLink: string;
    };
    userMessage: string;
  };
  statusCode: number;
}

export interface RootSearchParams {
  i?: string; // invoice ID
  t?: string; // tracking ID
}


export interface ItemTrackingApiResponse {
  data: {
    storeActions: {
      storeName: string;
      storeLogo: string;
    };
    item :{
      storeActions: undefined;
      id : string;
      name: string;
      mrp: string;
      imgUrl?: string;
      serialNo: string;
      batchNo: string;
      timeline: TimelineStage[];
    }
  };
}