import { useEffect, useRef } from "react";
import "animate.css";

interface ProductData {
  photo?: string;
  name?: string;
  description?: string;
  packs?: number;
  mrp?: string;
}

const PharmacyProductCard = ({ product }: { product: ProductData }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const circleOneRef = useRef<HTMLDivElement>(null);
  const circleTwoRef = useRef<HTMLDivElement>(null);
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
              cardRef.current.classList.add("animate__fadeInUp");
              cardRef.current.style.opacity = "1";
            }
            if (imageRef.current) {
              imageRef.current.classList.add(
                "animate__pulse",
                "animate__infinite",
                "animate__slower"
              );
            }
            if (circleOneRef.current) {
              circleOneRef.current.classList.add(
                "animate__pulse",
                "animate__infinite"
              );
            }
            if (circleTwoRef.current) {
              circleTwoRef.current.classList.add(
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
    <div className="w-full justify-between items-center mx-auto">
      <div
        ref={cardRef}
        className="group relative bg-white rounded-2xl shadow-md transition-all duration-500 overflow-hidden h-full animate__animated opacity-0 items-center justify-center"
        style={{
          opacity: 0,
        }}
      >
        {/* Pulsating circles in background using animate.css */}
        <div
          ref={circleOneRef}
          className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-[#2e6acf] opacity-10 animate__animated"
        ></div>
        <div
          ref={circleTwoRef}
          className="absolute -right-32 -bottom-32 w-64 h-64 rounded-full bg-[#2e6acf] opacity-10 animate__animated"
        ></div>

        {/* Main card content */}
        <div className="flex flex-col p-5 h-full relative z-10 mx-auto w-full">
          {/* Product image with animation */}
          <div className="relative mb-5 flex justify-center">
            <div ref={imageRef}>
              <img
                src={displayProduct.photo}
                alt={displayProduct.name}
                className="w-72 h-72 object-contain"
              />
            </div>
          </div>

          {/* Product name with underline effect */}
          <h2 className="text-xl font-bold mb-4 relative pb-2 break-words whitespace-normal line-clamp-2 overflow-hidden">
            {displayProduct.name}
            <div className="my-2 bg-[#f0f6ff] border border-gray-300 rounded-lg py-2 px-3 ">
              <p
                className="text-sm  text-slate-600 opacity-1000
            justify-center items-center"
              >
                {displayProduct.description}
              </p>
            </div>{" "}
            <span
              ref={underlineRef}
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2e6acf] transition-all duration-1000"
            ></span>
          </h2>

          {/* Product specs with touch-friendly styling */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            {/* Units/Packs info */}
            <div className="animate__animated animate__fadeIn animate__delay-1s bg-[#f0f6ff] rounded-lg p-4 transition-all duration-300 active:bg-[#e5eeff] border border-[#2e6acf] border-opacity-10 flex flex-col items-center">
              <div className="flex items-center justify-center">
                <span className="text-gray-600 text-lg">Units</span>
              </div>
              <div className="text-[#2e6acf] font-bold text-3xl mt-1 flex items-center justify-center">
                {displayProduct.packs}
              </div>
            </div>

            {/* Price info */}
            <div className="animate__animated animate__fadeIn animate__delay-1s bg-[#f0f6ff] rounded-lg p-4 transition-all duration-300 active:bg-[#e5eeff] border border-[#2e6acf] border-opacity-10">
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-lg font-medium">
                    Price
                  </span>
                </div>
                <div className="text-[#2e6acf] font-extrabold text-3xl mt-1">
                  {displayProduct.mrp}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyProductCard;
