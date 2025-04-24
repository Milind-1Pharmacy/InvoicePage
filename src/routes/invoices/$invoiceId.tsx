// src/routes/invoices/$invoiceId.tsx
import UserInvoiceInfo from "@/components/InvoiceComponents";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/invoices/$invoiceId")({
  component: ({ params }) => <UserInvoiceInfo invoiceId={params.invoiceId} />,
});
