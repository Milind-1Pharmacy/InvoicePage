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
  location: string;
  date: string;
  status: string;
}

export interface ProductData {
  id: string;
  description?: string;
  name: string;
  packs: number;
  mrp: string;
  imgUrl?: string;
}

export interface Product {
  timeline: TimelineStage[];
  productData: ProductData;
}
