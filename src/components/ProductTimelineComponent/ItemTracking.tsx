import { useState, useEffect } from "react";
// import mockProductData from "./mockData";
import ProductTimeline from "./ProductTimeline";
import { Product } from "@/utils";
// import LoadingOverlay from "../commanComponents/LoadingOverlay";

export default function ItemTracking({
  printCode: productId,
  productData: data,
}: {
  printCode: string;
  productData: any;
}) {
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    if (data) {
      setProductData({
        productData: { serialNo: productId, ...data },
        timeline: data.timeline,
      });
    }
  }, [productId, data]);

  if (!productData) {
    return (
      <div className="p-4 text-center text-red-500">Product not found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <ProductTimeline product={productData} />
    </div>
  );
}
