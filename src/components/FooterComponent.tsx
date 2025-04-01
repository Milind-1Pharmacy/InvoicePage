import React from "react";
import {
  faWhatsapp,
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Separator } from "./ui/separator";
const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}

        {/* Contact & Social */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Connect With Us</h3>
          <p className="text-gray-300 mb-2 text-sm">
            If you have any questions about your invoice or our services, please
            contact our support team.
          </p>
          <Separator className="bg-white opacity-25 my-2" />
          <div className="flex space-x-4 justify-center items-center">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <FontAwesomeIcon icon={faPhone} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
