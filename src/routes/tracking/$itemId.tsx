import { createFileRoute } from "@tanstack/react-router";
import ProductTimelineComponent from "../../components/ProductTimelineComponent/ItemTracking";

export const Route = createFileRoute("/tracking/$itemId")({
  component: ProductTimelineComponent,
});
