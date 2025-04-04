import { TABLET_CAPSULE_IMAGE_FALLBACK } from "@/utils";

export default {
  id: "12345",
  imgUrl: TABLET_CAPSULE_IMAGE_FALLBACK,
  name: "Paracetamol 500mg",
  description: "A pack of 10 tablets",
  packs: 10,
  mrp: "₹50",
  timeline: [
    {
      stage: "Manufacturer",
      name: "XYZ Pharmaceuticals Ltd.",
      location: "Mumbai, India",
      date: "2025-03-01",
      status: "Manufactured",
    },
    {
      stage: "Supplier",
      name: "ABC Distributors",
      location: "Delhi, India",
      date: "2025-03-03",
      status: "Shipped to Supplier 2",
    },
    {
      stage: "Supplier",
      name: "PQR Wholesalers",
      location: "Kolkata, India",
      date: "2025-03-05",
      status: "Shipped to Supplier 3",
    },
    {
      stage: "Supplier",
      name: "LMN Pharma Traders",
      location: "Hyderabad, India",
      date: "2025-03-07",
      status: "Shipped to Retailer",
    },
    {
      stage: "Retailer",
      name: "Model Medicals",
      location: "Bangalore, India",
      date: "2025-03-10",
      status: "Available for Purchase",
    },
    {
      stage: "Consumer",
      name: "Milind Pandey",
      location: "Bangalore, India",
      date: "2025-03-12",
      status: "Purchased",
    },
  ],
};
//isGSTinVserfirs
