import UserInvoiceInfo from "@/components/InvoiceComponents";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/invoice")({
  component: UserInvoiceInfo,
});
