import { RUPEE_SYMBOL } from "@/utils";
import { TABLET_CAPSULE_IMAGE_FALLBACK } from "@/utils/constants/Fallbacks";
const CartItemCard = (props: any) => {
  const { item } = props;
  return (
    <div className="py-3 border-b border-gray-200 last:border-b-0 px-3 hover:bg-gray-50 transition-duration-300">
      <div className="flex space-x-2 items-center">
        <div className="flex-shrink-0">
          <img
            src={item.imageUrl || TABLET_CAPSULE_IMAGE_FALLBACK}
            alt={item.name}
            className="w-16 h-16 object-contain rounded-md "
          />
        </div>
        <div className="flex-1 flex flex-col items-start">
          <div className="w-full flex items-center justify-between">
            <span className="text-sm font-medium leading-tight">
              {item.name}
            </span>
          </div>

          <div className="text-xs text-gray-600 mt-1">
            Mfr: {item.manufacturer}
          </div>

          <div className="text-xs text-gray-600">Pack: {item.packaging}</div>

          <div className="w-full flex items-center justify-between mt-1">
            <span className="text-base font-semibold">
              {RUPEE_SYMBOL}{" "}
              {(item.mrp || item.price || 0).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </span>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
              Qty: {item.qty}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
