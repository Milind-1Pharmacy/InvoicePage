import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "../ui/separator";
import React from "react";
import { StoreLogo } from "@/assets";

interface HeaderProps {
  storeInfo?: {
    storeName?: string;
    storeLogo?: string;
    support?: {
      phone?: string;
      whatsapp?: string; // e.g. "https://wa.me/8310287845"
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

  return (
    <header className="bg-gradient-to-r from-[#1e81f1] via-[#2e6acf] to-[#2554a2] shadow-md py-2">
      <div className="max-w-7xl mx-auto py-3 px-4 flex items-center justify-between">
        {/* Logo and Store Name */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="bg-white p-2 rounded-full flex-shrink-0 w-14 h-14 shadow-sm flex items-center justify-center">
            <img
              src={storeLogo}
              alt="Store Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <h1
            className="text-xl font-medium text-white truncate line-clamp-1"
            title={storeName}
          >
            {storeName}
          </h1>
        </div>

        {/* Contact Icons */}
        {showIcons && (
          <div className="flex items-center gap-2">
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
                className="text-white"
                size="lg"
              />
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
