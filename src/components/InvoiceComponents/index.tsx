import {
  faUser,
  faCircleCheck,
  faSmileBeam,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InvoiceDetails from "./InvoiceDetails";
// import UserCartDetail from "./UserCartDetail";

const UserInvoiceInfo = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm py-4 px-3 mt-4 sm:mx-3 max-w-md mb-4 mx-3">
      <div className="flex items-center mb-3 relative overflow-hidden p-4 rounded-2xl border border-gray-100">
        <div className="absolute -top-13 -left-10 w-32 h-24 bg-blue-200 rounded-full opacity-50 animate-pulse " />
        <div className="absolute -bottom-6 -right-8 w-24 h-16 bg-blue-500 rounded-full opacity-30 animate-pulse" />

        <div className="flex items-center space-x-3 z-10">
          <div className="bg-gradient-to-br from-blue-500 to-[#266acf] text-white p-4 rounded-full shadow-md transform hover:scale-105 transition-transform">
            <FontAwesomeIcon icon={faUser} size="xl" />
          </div>
          <div className="animate-fadeIn">
            <h1 className="text-xl font-semibold text-gray-800">
              Hello Abhisekh,
            </h1>
            <div className="flex items-center text-orange-400 gap-1 mt-0.5">
              <FontAwesomeIcon icon={faCircleCheck} size="xs" />
              <p className="text-sm">Payment Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice notification */}
      <div className="bg-gray-50 border border-gray-100 rounded-lg py-2 px-3">
        <div className="flex items-center space-x-3 ">
          <div className="text-blue-500 mt-1 p-2 bg-blue-100 rounded-2xl ">
            <FontAwesomeIcon icon={faSmileBeam} size="xl" color="#2e6acf" />
          </div>
          <div className="flex ">
            <p
              className="text-sm text-gray-600 leading-relaxed
            justify-center items-center"
            >
              Thank You for Shopping with us.
            </p>
            {/* <p className="text-sm text-gray-600 leading-relaxed">
              Your invoice has been generated and is ready for review.
            </p> */}
          </div>
        </div>
      </div>
      {/* Invoice details component */}
      <InvoiceDetails />
      {/* <UserCartDetail /> */}
    </div>
  );
};

export default UserInvoiceInfo;

// manf -> dist -> supplier1 - > supplier2 -> ret -> ChartNoAxesColumnDecreasing;
