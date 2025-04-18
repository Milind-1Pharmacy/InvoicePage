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
  status?: string;
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
