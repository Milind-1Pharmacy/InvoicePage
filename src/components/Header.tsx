import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/1P-LOGO.svg";
import { Separator } from "../components/ui/separator";
import React from "react";

interface HeaderProps {
  storeName: string;
  showIcons: boolean;
}

const Header: React.FC<HeaderProps> = ({ storeName, showIcons }) => {
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
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="bg-white p-2 rounded-full flex-shrink-0 w-10 h-10 shadow-sm flex items-center justify-center">
            <img
              src={logo}
              alt="Store Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <h1
            className="text-xl font-medium text-white truncate"
            title={storeName} // Shows full name on hover
          >
            {storeName}
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
                size="lg"
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
              <FontAwesomeIcon icon={faPhone} className="text-white" />
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
