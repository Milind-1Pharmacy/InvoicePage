import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "../ui/separator";
import React from "react";

interface HeaderProps {
  storeInfo?: any;
}

const Header: React.FC<HeaderProps> = ({ storeInfo }) => {
  const showIcons = true;

  return (
    <header
      className="bg-gradient-to-r from-[#1e81f1]  via-[#2e6acf] to-[#2554a2] shadow-md py-2"
      style={
        {
          // borderBottomRightRadius: "24px",
          // borderBottomLeftRadius: "24px",
        }
      }
    >
      <div className="max-w-7xl mx-auto py-3 px-4 flex items-center justify-between">
        {/* Logo and Store Name */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="bg-white p-2 rounded-full flex-shrink-0 w-14 h-14 shadow-sm flex items-center justify-center">
            <img
              src={storeInfo.storeLogo}
              alt="Store Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <h1
            className="text-xl font-medium text-white truncate line-clamp-1"
            title={storeInfo.storeName} // Shows full name on hover
          >
            {storeInfo.storeName}
          </h1>
        </div>

        {/* Contact Icons */}
        {showIcons && (
          <div className="flex items-center gap-2">
            <a
              href="#"
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
              href="#"
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
