import { TABLET_CAPSULE_IMAGE_FALLBACK } from "@/utils/constants/Fallbacks";
import {
  faShoppingCart,
  faTruckMoving,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItemCard from "../HouseOfCards/CartItemCard";
// Main Cart Invoice Component
const UserCartDetail = () => {
  // Sample cart items
  const cartItems = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      manufacturer: "ABC Pharmaceuticals",
      packaging: "Strip of 10 Tablets",
      qty: 2,
      mrp: 28.5,
      imageUrl: TABLET_CAPSULE_IMAGE_FALLBACK,
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      manufacturer: "XYZ Pharma Ltd",
      packaging: "Box of 15 Capsules",
      qty: 1,
      mrp: 125.75,
      imageUrl: TABLET_CAPSULE_IMAGE_FALLBACK,
    },
    {
      id: 3,
      name: "Vitamin C 500mg",
      manufacturer: "Health Essentials",
      packaging: "Bottle of 30 Tablets",
      qty: 3,
      mrp: 220.0,
      imageUrl: TABLET_CAPSULE_IMAGE_FALLBACK,
    },
  ];

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="mt-3 border border-gray-100 shadow-lg bg-white rounded-lg overflow-hidden">
      <div className="relative overflow-hidden border border-gray-100">
        <div className="absolute -top-15 -left-15 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-pulse" />
        <div className="absolute -bottom-12 -right-10 w-24 h-24 bg-blue-500 rounded-full opacity-30 animate-pulse" />

        <div className="flex  items-center justify-center shadow-md py-4 relative">
          <h1 className="text-xl font-semibold text-black p-2">
            Your Cart Summary
          </h1>
          <span>
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="lg"
              className="text-custom"
            />
          </span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {cartItems.map((item, index) => (
          <CartItemCard key={`${item.id}_${index}`} item={item} />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-gray-50 p-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Total Items:</span>
          <span className="font-medium">
            {cartItems.length} items ({totalQty} units)
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">₹ 1200</span>
        </div>
        {/* <div className="flex justify-between mb-2">
          <span className="text-gray-600">Delivery Charges:</span>
          <span className="font-medium text-green-600">FREE</span>
        </div> */}
        <div className="h-px bg-gray-200 my-2"></div>
        <div className="flex justify-between">
          <span className="text-gray-800 font-medium">Total Amount:</span>
          <span className="font-semibold text-lg">₹ 1200.00</span>
        </div>
      </div>
      <div className="px-5 py-4 border-t border-gray-100">
        <button className="w-full bg-gradient-to-r from-[#2e6acf] to-[#2554a2] hover:bg-blue-700 text-white py-3 rounded-md transition-colors font-medium">
          Track your Order
          <span>
            <FontAwesomeIcon
              icon={faTruckMoving}
              size="lg"
              style={{
                marginLeft: 12,
              }}
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default UserCartDetail;
