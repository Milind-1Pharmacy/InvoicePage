import { faUser, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InvoiceDetails from "./InvoiceDetails";

// import UserCartDetail from "./UserCartDetail";

const UserInvoiceInfo = ({ invoiceId }: { invoiceId: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm py-4 px-3 mt-4 sm:mx-3 max-w-md mb-4 mx-3">
      {/* User greeting section - made slightly larger */}
      <div className="flex items-center mb-4 relative overflow-hidden p-3 rounded-2xl border border-gray-100">
        <div className="absolute -top-13 -left-10 w-32 h-24 bg-blue-200 rounded-full opacity-50 animate-pulse " />
        <div className="absolute -bottom-6 -right-8 w-24 h-16 bg-blue-500 rounded-full opacity-30 animate-pulse" />

        <div className="flex items-center space-x-4 z-10">
          <div className="bg-gradient-to-br from-blue-500 to-[#266acf] text-white p-5 rounded-full shadow-md transform hover:scale-105 transition-transform">
            <FontAwesomeIcon icon={faUser} size="xl" />
          </div>
          <div className="animate-fadeIn">
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
              Hello Abhisekh,
            </h1>
            <div className="flex items-center text-orange-400 gap-1 mt-1">
              <FontAwesomeIcon icon={faCircleCheck} size="xs" />
              <p className="text-sm font-medium">Payment Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice details component */}
      <InvoiceDetails invoiceId={invoiceId} />
    </div>
  );
};

export default UserInvoiceInfo;
