import { RUPEE_SYMBOL } from "@/utils";
import {
  faCalendarAlt,
  faList,
  faFileInvoice,
  faSmileBeam,
  faClock,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CheckCircle,
  LucideBadgeCheck,
} from "lucide-react";

interface InvoiceDetailsProps {
  billDetail: any;
  isPaid: boolean;
}

const InvoiceDetails = ({ billDetail, isPaid }: InvoiceDetailsProps) => {
  const epochValue = billDetail.issuedEpoch;
  const issuedDate = new Date(epochValue * 1000);
  const formattedDate = issuedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = issuedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4 border border-gray-100">
        {/* Header with status banner */}
        <div className="relative">
          {isPaid ? (
            <div className="absolute top-0 right-0 w-28 h-28">
              <div className="bg-orange-400 text-white text-xs font-bold py-1 px-8 rotate-45 translate-x-6 translate-y-6 w-32">
                PENDING
              </div>
            </div>
          ) : (
            <>
              <div className="absolute top-0 right-0 w-30 h-28">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white  font-bold py-1 px-8 rotate-43 translate-x-6 translate-y-9 w-44 flex gap-1.5 text-sm items-center">
                  PAID
                  <LucideBadgeCheck size={16} />
                </div>
              </div>
            </>
          )}

          <div className="pt-5 pb-3 px-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
                <FontAwesomeIcon icon={faFileInvoice} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Invoice</h2>
                <p className="text-gray-500 text-sm">#{billDetail.billId}</p>
              </div>
            </div>
          </div>

          {/* Amount section */}
          <div className="bg-gradient-to-r from-[#4a90e2] via-[#2e6acf] to-[#2554a2] shadow-md text-white px-6 py-4  ">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">Amount Due</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold">
                    {RUPEE_SYMBOL} {billDetail.amount}
                  </span>
                  <span className="text-sm opacity-80 ml-1">INR</span>
                </div>
              </div>
              <button
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all transform hover:scale-105"
                onClick={() => {
                  console.log("Download Invoice");
                }}
              >
                <FontAwesomeIcon
                  icon={faFileDownload}
                  color="#2e6afc"
                  size="lg"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Redesigned info section with cards */}
        <div className=" m-3  grid rounded-xl bg-gray-50">
          {/* Issued on card */}
          <div className="bg-white  px-4 py-2   hover:shadow-md transition-shadow rounded-tl-xl rounded-tr-xl ">
            <div className="flex justify-between items-start py-1  ">
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Issued on
                </span>
                <span className="block font-semibold text-gray-800">
                  {formattedDate}
                </span>
                <div className="flex items-center mt-2 text-gray-500">
                  <FontAwesomeIcon icon={faClock} className="text-xs mr-1" />
                  <span className="text-xs">{formattedTime}</span>
                </div>
              </div>
              <div className="bg-blue-100 p-2 mt-3 rounded-full">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Summary card */}
          <div className="bg-white  px-4 py-2  border-t-1 border-gray-100 hover:shadow-md transition-shadow rounded-bl-xl rounded-br-xl">
            <div className="flex justify-between items-start">
              <div className="py-2 ">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Summary
                </span>
                <span className="block text-lg font-semibold text-gray-800">
                  {billDetail?.itemsSummary.totalItems} Items
                </span>
              </div>
              <div className="bg-green-100 p-2 mt-3 rounded-full">
                <FontAwesomeIcon icon={faList} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="px-6 py-5 border-t border-gray-100">
          {isPaid ? (
            <button className="w-full bg-gradient-to-r from-[#2e6acf] to-[#2554a2] hover:bg-blue-700 text-white py-3 rounded-md transition-colors font-medium flex items-center justify-center">
              <span>Pay Now</span>
            </button>
          ) : (
            <button
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-md transition-all duration-300 font-medium flex items-center justify-center shadow-md"
              disabled
            >
              <span className="flex items-center gap-2">
                Paid <CheckCircle size={16} />
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="bg-gray-100 p-1 justify-center items-center">
        {/* Invoice notification */}
        <div className="  rounded-lg px-2 ">
          <div className="flex space-x-2 *: p-2 justify-center items-center mx-auto">
            <div className=" rounded-2xl flex-shrink-0">
              <FontAwesomeIcon icon={faSmileBeam} size="lg" color="#2e6acf" />
            </div>
            <div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Thank You for Shopping with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
