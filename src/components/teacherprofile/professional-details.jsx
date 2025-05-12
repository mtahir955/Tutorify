import React from "react";

export default function ProfessionalDetails({ professional }) {
  const experience = professional?.experience || "N/A";

  
  const parseArray = (data) => {
    if (Array.isArray(data)) return data;
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : data?.split(",") || [];
    } catch {
      return data?.split(",") || [];
    }
  };

  const educationList = parseArray(professional?.education);
  const certificationsList = parseArray(professional?.certifications);
  const expertiseList = parseArray(professional?.expertise);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Professional Details</h2>

      <div className="space-y-5">
        <div>
          <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-2">Experience</h3>
          <p className="text-gray-800 font-medium">
            {experience} Years of Teaching Experience
          </p>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-2">Education</h3>
          <ul className="list-disc pl-5 text-gray-800">
            {educationList.map((edu, index) => (
              <li key={index}>{edu.trim()}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-2">Certifications</h3>
          <ul className="list-disc pl-5 text-gray-800">
            {certificationsList.map((cert, index) => (
              <li key={index}>{cert.trim()}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-2">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {expertiseList.map((area, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm sm:text-base rounded-full"
              >
                {area.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
