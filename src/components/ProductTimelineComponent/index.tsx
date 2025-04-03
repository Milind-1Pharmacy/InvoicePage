// ItemTracking.tsx (Main Component)
import { useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ProductInfoCard } from "../HouseOfCards";
import { ProductTimeline } from "../commanComponents";

// Import mock data
import mockProductData from "./mockData";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";

export default function ItemTracking() {
  const { itemId: productId } = useParams({ from: "/tracking/$itemId" });
  const [productData, setProductData] = useState<{
    id: string;
    photo: string;
    name: string;
    packs: number;
    mrp: string;
    timeline: {
      stage: string;
      name: string;
      location: string;
      date: string;
      status: string;
    }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch data based on productId
    // For now, use mock data
    setProductData(mockProductData);
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="p-4 text-center text-red-500">
        <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Product Info Card with large image */}
      <ProductInfoCard product={productData} />

      {/* Product Timeline */}
      <ProductTimeline timeline={productData.timeline} />

      <Button className="p-6 min-w-full bg-gradient-to-r from-[#2e6acf] to-[#2554a2] text-white text-xl shadow-2xl border border-white">
        {" "}
        Reorder this Product <FontAwesomeIcon icon={faSmile} size="lg" />{" "}
      </Button>
    </div>
  );
}
