import { useEffect, useRef, useState } from "react";
import "animate.css";
import {
  Package,
  Fingerprint,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { AuthenticBadge } from "@/assets";
interface ProductData {
  imgUrl?: string;
  name?: string;
  description?: string;
  mrp?: string;
  serialNo?: string;
  batchNo?: string;
  storeLink?: string;
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
    <div className="w-full mx-auto p-2 ">
      <div className="bg-green-200 p-2 rounded-tl-lg rounded-tr-lg border-b border-green-300">
        <div className="flex items-center justify-between  ">
          <div className="flex items-center">
            <img
              src={AuthenticBadge}
              alt="Authentic"
              className="h-10 w-10 mr-2"
            />
            <p className="text-green-900 font-bold ">
              This Product is Verified.
            </p>
          </div>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
            <ShieldCheck size={14} className="mr-1" />
            <span className="font-medium text-xs">Authentic </span>
          </div>
        </div>
      </div>
      <div
        ref={cardRef}
        className="group relative transition-all duration-300 overflow-hidden animate__animated opacity-0 bg-white rounded-bl-lg rounded-br-lg border border-gray-100 "
        style={{ opacity: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-full relative z-10">
          {/* Image */}
          <div className="w-1/3 p-2 flex items-center justify-center bg-blue-50 rounded-bl-lg">
            <div
              ref={imageRef}
              className={`transition-transform duration-500 ${
                isHovered ? "scale-110" : ""
              }`}
            >
              <img
                src={displayProduct.imgUrl || "/api/placeholder/100/100"}
                alt={displayProduct.name}
                className="w-28 h-28 object-contain"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-2/3 p-3 flex flex-col justify-between">
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
      <div className="flex justify-center mt-3">
        <Button
          className="group relative px-4 py-5 w-full bg-gradient-to-r from-[#1e81f1] via-[#2e6acf] to-[#2554a2] hover:from-blue-700 hover:to-blue-800 
               text-white text-lg font-medium tracking-wide rounded-lg
               shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1
               border border-blue-400/30 overflow-hidden"
          onClick={() => {
            window.open(
              "https://webstore.urmedz.com/urmedz_sheraton/cart",
              "_blank"
            );
          }}
        >
          <span className="flex items-center justify-center">
            <span>Reorder this Product</span>
            <FontAwesomeIcon
              icon={faSmile}
              size="lg"
              className="ml-2 transform transition-all duration-300 group-hover:rotate-12"
            />
          </span>
          <span className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </Button>
      </div>
    </div>
  );
};

export default HorizontalPharmacyCard;
