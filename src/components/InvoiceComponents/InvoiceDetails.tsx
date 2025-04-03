import { RUPEE_SYMBOL } from "@/utils";
import {
  faDownload,
  faCalendarAlt,
  faList,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InvoiceDetailsProps {
  invoiceId: string;
}
//this all will be fetch from the Context
const InvoiceDetails = ({ invoiceId }: InvoiceDetailsProps) => {
  // const [expanded, setExpanded] = useState(false);
  // const [contentHeight, setContentHeight] = useState(0);
  // const contentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (contentRef.current) {
  //     // Get the full height of the content when it's mounted or updated
  //     setContentHeight(expanded ? contentRef.current.scrollHeight : 0);
  //   }
  // }, [expanded]);

  // const toggleExpand = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-3 border border-gray-100">
      {/* Header with status banner */}
      <div className="relative">
        <div className="absolute top-0 right-0 w-28 h-28">
          <div className="bg-orange-400 text-white text-xs font-bold py-1 px-8 rotate-45 translate-x-6 translate-y-6 w-32">
            PENDING
          </div>
        </div>

        <div className="pt-6 pb-4 px-5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
              <FontAwesomeIcon icon={faFileInvoice} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Invoice</h2>
              <p className="text-gray-500 text-sm">#{invoiceId}</p>
            </div>
          </div>
        </div>

        {/* Amount section */}
        <div className="bg-gradient-to-r from-[#4a90e2] via-[#2e6acf] to-[#2554a2] shadow-md text-white px-5 py-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Amount Due</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold mt-1">
                  {RUPEE_SYMBOL} 1,200
                </span>
                <span className="text-sm opacity-80">INR</span>
              </div>
            </div>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all transform hover:scale-105">
              <FontAwesomeIcon icon={faDownload} color="#2e6acf" />
            </button>
          </div>
        </div>
      </div>

      {/* Details toggle button */}
      <div className="px-5 py-4 border-t border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
        <span className="font-medium text-gray-700">Invoice Details</span>
      </div>

      {/* Expandable content with smooth animation */}
      <div
        className="px-5 bg-gray-50 border-t border-gray-100 overflow-hidden"
        style={{
          transition: "max-height 0.4s ease-in-out",
        }}
      >
        <div className="py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-gray-400 mt-1"
              />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  Issued on
                </span>
                <span className="block text-sm text-gray-500">2023-10-27</span>
                <span className="block text-xs text-gray-400">11:43 AM</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faList} className="text-gray-400 mt-1" />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  Summary
                </span>
                <span className="block text-sm text-gray-500">3 Items</span>
                <span className="block text-xs text-gray-400">
                  View details
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="px-5 py-4 border-t border-gray-100">
        <button className="w-full bg-gradient-to-r from-[#2e6acf] to-[#2554a2] hover:bg-blue-700 text-white py-3 rounded-md transition-colors font-medium">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetails;
