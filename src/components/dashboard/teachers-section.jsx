import React from "react";
import { Star } from "lucide-react";

export default function TeachersSection({ tutors }) {
  return (
    <section className="bg-gray-50 rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center sm:text-left">
        Meet Our Top Teachers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}

function TutorCard({ tutor }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={tutor.photo || "/uploads/defaulttutor.jpg"}
          alt={tutor.name}
          className="object-cover m-auto h-full"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{tutor.name}</h3>
        <p className="text-cyan-500 font-medium">{tutor.subject}</p>

        <div className="mt-2 text-sm text-gray-600">
          <p>{tutor.experience} years experience</p>
          <p>{tutor.education}</p>
        </div>

        <div className="mt-3 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < tutor.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({tutor.reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  );
}
