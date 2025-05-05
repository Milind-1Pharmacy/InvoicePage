// src/services/api.ts
import axios from "axios";

export const fetchInvoiceData = async (billId: string) => {
  try {
    const response = await axios.get(
      "https://apiv2.1pharmacy.io/staging/fetch_invoice_tracking_details",
      {
        params: {
          billId: billId,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch invoice data: ${error.message}`);
    }
    throw new Error("Failed to fetch invoice data");
  }
};

export const fetchProductData = async (printCode: string) => {
  try {
    const response = await axios.get(
      "https://apiv2.1pharmacy.io/test3/fetch_item_tracking_details",
      {
        params: {
          printCode: printCode,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch invoice data: ${error.message}`);
    }
    throw new Error("Failed to fetch invoice data");
  }
};
