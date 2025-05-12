import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

export default function ContactInfo({ contact }) {
  const getSocialIcon = (icon) => {
    switch (icon) {
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "github":
        return <Github className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>

      <div className="space-y-3">
        {/* Email */}
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-gray-500 mr-3" />
          <a href={`mailto:${contact.email}`} className="text-teal-600 hover:underline">
            {contact.email}
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-gray-500 mr-3" />
          <a href={`tel:${contact.phone}`} className="text-gray-700">
            {contact.phone}
          </a>
        </div>

        {/* Location */}
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-gray-500 mr-3" />
          <span className="text-gray-700">{contact.location}</span>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-3">Connect</h3>
        <div className="flex space-x-3 justify-start sm:justify-center">
          {contact.social.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label={link.platform}
            >
              {getSocialIcon(link.icon)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
