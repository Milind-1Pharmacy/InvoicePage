import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "../ui/separator";
import React, { useRef, useEffect, useState } from "react";
import { StoreLogo } from "@/assets";

interface HeaderProps {
  storeInfo?: {
    storeName?: string;
    storeLogo?: string;
    support?: {
      phone?: string;
      whatsapp?: string;
    };
  };
}

const Header: React.FC<HeaderProps> = ({ storeInfo }) => {
  const showIcons = true;
  const storeName = storeInfo?.storeName || "Model Medicals Demo";
  const storeLogo = storeInfo?.storeLogo ?? StoreLogo;
  const whatsappLink = storeInfo?.support?.whatsapp || "#";
  const phoneLink = storeInfo?.support?.phone
    ? `tel:${storeInfo.support.phone}`
    : "#";

  const [textSize, setTextSize] = useState("text-xl");
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Adjust text size based on container width and text length
  useEffect(() => {
    const adjustTextSize = () => {
      if (!nameRef.current || !containerRef.current) return;

      const containerElement = containerRef.current;
      const containerWidth = containerElement.offsetWidth;
      const nameLength = storeName.length;

      // Base size on name length and available space with larger base sizes
      if (nameLength > 35 || containerWidth < 300) {
        setTextSize("text-base");
      } else if (nameLength > 25 || containerWidth < 400) {
        setTextSize("text-lg");
      } else {
        setTextSize("text-xl");
      }
    };

    adjustTextSize();
    window.addEventListener("resize", adjustTextSize);

    return () => {
      window.removeEventListener("resize", adjustTextSize);
    };
  }, [storeName]);

  return (
    <header className="bg-gradient-to-r from-[#1e81f1] via-[#2e6acf] to-[#2554a2] shadow-md py-2">
      <div className="max-w-7xl mx-auto py-3 px-4 flex items-center justify-between">
        {/* Logo and Store Name */}
        <div
          ref={containerRef}
          className="flex items-center gap-3 flex-1 min-w-0 pr-3"
        >
          <div className="bg-white p-2 rounded-full flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shadow-sm flex items-center justify-center">
            <img
              src={storeLogo}
              alt="Store Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1
              ref={nameRef}
              className={`${textSize} font-semibold text-white truncate line-clamp-2 sm:line-clamp-1`}
              title={storeName}
            >
              {storeName}
            </h1>
          </div>
        </div>

        {/* Contact Icons */}
        {showIcons && (
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-blue-500 transition-colors duration-200"
              aria-label="Contact us on WhatsApp"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                size="xl"
                className="text-white"
              />
            </a>

            <Separator
              orientation="vertical"
              className="bg-blue-300 h-6 w-px opacity-50 hidden sm:block"
            />

            <a
              href={phoneLink}
              className="p-2 rounded-full hover:bg-blue-500 transition-colors duration-200"
              aria-label="Call us"
            >
              <FontAwesomeIcon
                icon={faPhone}
                size="lg"
                className="text-white"
              />
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
