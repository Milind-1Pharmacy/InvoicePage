import { useEffect, useRef } from "react";
import "animate.css";

interface ProductData {
  imgUrl?: string;
  name?: string;
  description?: string;
  packs?: number;
  mrp?: string;
}

const HorizontalPharmacyCard = ({ product }: { product: ProductData }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  // Merge with defaults for any missing values
  const displayProduct = { ...product };

  // Use IntersectionObserver for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (cardRef.current) {
              cardRef.current.style.opacity = "1";
            }
            if (imageRef.current) {
              imageRef.current.classList.add(
                "animate__pulse",
                "animate__infinite",
                "animate__slower"
              );
            }
            if (underlineRef.current) {
              setTimeout(() => {
                if (underlineRef.current) {
                  underlineRef.current.style.width = "100%";
                }
              }, 300);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full mx-auto  ">
      <div
        ref={cardRef}
        className="group relative  border-b border-blue-100 transition-all duration-300 overflow-hidden animate__animated opacity-0"
        style={{ opacity: 0 }}
      >
        {/* Main card content */}
        <div className="flex h-full relative z-10">
          {/* Left side: Product image with animation */}
          <div className="w-1/3 p-3  flex items-center justify-center bg-[#f0f6ff]">
            <div ref={imageRef} className="animate__animated">
              <img
                src={displayProduct.imgUrl}
                alt={displayProduct.name}
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>

          {/* Right side: Product details */}
          <div className="w-2/3 p-4 flex flex-col">
            <h2 className="text-lg font-bold mb-1 relative pb-1 line-clamp-3 overflow-hidden">
              {displayProduct.name}
              <span
                ref={underlineRef}
                className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-300 transition-all duration-1000"
              ></span>
            </h2>

            {/* Description */}
            <p className="text-xs text-slate-600 mb-2 line-clamp-2 overflow-hidden">
              {displayProduct.description}
            </p>

            {/* Product specs in a single row layout */}
            <div className="flex justify-between items-center mt-auto animate__animated animate__fadeIn animate__delay-0.5s flex-wrap-reverse">
              <div className="flex items-center gap-1">
                <span className="text-gray-600 text-xs">Units:</span>
                <span className="text-[#2e6acf] font-bold text-lg">
                  {displayProduct.packs}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-gray-600 text-xs">Price:</span>
                <span className="text-[#2e6acf] font-bold text-lg">
                  {displayProduct.mrp}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalPharmacyCard;
