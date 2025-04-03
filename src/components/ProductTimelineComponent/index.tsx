// src/components/ItemTracking.tsx
import { useParams } from "@tanstack/react-router";


export default function ItemTracking() {
  const { itemId: productId } = useParams({ from: "/tracking/$itemId" });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Journey Timeline</h2>
      <p>Tracking product: {productId}</p>
      {/* Implement your timeline UI here */}
    </div>
  );
}
