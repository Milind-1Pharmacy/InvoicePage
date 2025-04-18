import { useEffect, useRef, useState } from "react";
import "animate.css";
import { Package, Fingerprint, IndianRupee } from "lucide-react";

interface ProductData {
  imgUrl?: string;
  name?: string;
  description?: string;
  mrp?: string;
  serialNo?: string;
  batchNo?: string;
}

const HorizontalPharmacyCard = ({ product }: { product: ProductData }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const displayProduct = { ...product };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (cardRef.current) {
              cardRef.current.classList.add("animate__fadeIn");
              cardRef.current.style.opacity = "1";
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div className="w-full mx-auto p-2">
      <div
        ref={cardRef}
        className="group relative transition-all duration-300 overflow-hidden animate__animated opacity-0 bg-white rounded-lg border border-gray-100 "
        style={{ opacity: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-full relative z-10">
          {/* Image */}
          <div className="w-1/3 p-4 flex items-center justify-center bg-blue-50 rounded-l-lg">
            <div
              ref={imageRef}
              className={`transition-transform duration-500 ${
                isHovered ? "scale-110" : ""
              }`}
            >
              <img
                src={displayProduct.imgUrl || "/api/placeholder/100/100"}
                alt={displayProduct.name}
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {displayProduct.name}
                <div
                  className={`h-0.5 bg-blue-500 mt-1 transition-all duration-500 ${
                    isHovered ? "w-full" : "w-0"
                  }`}
                ></div>
              </h2>

              {displayProduct.description && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {displayProduct.description}
                </p>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              {displayProduct.serialNo && (
                <p className="text-xs text-gray-600 flex items-center gap-2">
                  <Fingerprint size={14} className="text-blue-500" />{" "}
                  <span className="font-medium">Serial No:</span>{" "}
                  <span className="font-light">{displayProduct.serialNo}</span>
                </p>
              )}

              {displayProduct.batchNo && (
                <p className="text-xs text-gray-600 flex items-center gap-2">
                  <Package size={14} className="text-blue-500" />{" "}
                  <span className="font-medium">Batch No:</span>{" "}
                  <span className="font-light">{displayProduct.batchNo}</span>
                </p>
              )}

              {displayProduct.mrp && (
                <p className="text-sm flex items-center gap-2 mt-1 text-gray-800">
                  <IndianRupee size={14} className="text-blue-600" />{" "}
                  <span className="font-medium">Price:</span>{" "}
                  <span className="text-slate-600 font-bold">
                    {displayProduct.mrp}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalPharmacyCard;
