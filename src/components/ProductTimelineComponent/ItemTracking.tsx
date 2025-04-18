import { useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import mockProductData from "./mockData";
import ProductTimeline from "./ProductTimeline";
import { Product } from "@/utils";

export default function ItemTracking() {
  const { itemId: productId } = useParams({ from: "/tracking/$itemId" });

  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProductData({
      productData: { serialNo: productId, ...mockProductData },
      timeline: mockProductData.timeline,
    });
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (!productData) {
    return (
      <div className="p-4 text-center text-red-500">Product not found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <ProductTimeline product={productData} />

      <Button
        className="p-6 min-w-full bg-gradient-to-r from-[#2e6acf] to-[#2554a2] text-white text-xl shadow-2xl border border-white"
        onClick={() =>
          console.log("Reorder product:", productData.productData.id)
        }
      >
        Reorder this Product{" "}
        <FontAwesomeIcon icon={faSmile} size="lg" className="ml-2" />
      </Button>
    </div>
  );
}
