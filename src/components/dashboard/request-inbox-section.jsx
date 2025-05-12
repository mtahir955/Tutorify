import React from "react";
import { Clock, CheckCircle, XCircle, MessageSquare, Mail } from "lucide-react";

export default function RequestInboxSection({ requests, tutors }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <RequestsSection requests={requests} />
      <InboxSection tutors={tutors} />
    </section>
  );
}

function RequestsSection({ requests }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your Tutor Requests</h2>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900">{request.tutor_name}</h3>
              <p className="text-sm text-gray-600">{request.courses_offered}</p>
            </div>

            <div className="flex items-center">
              {request.status === "pending" && (
                <span className="flex items-center text-yellow-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Pending</span>
                </span>
              )}
              {request.status === "accepted" && (
                <span className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Accepted</span>
                </span>
              )}
              {request.status === "rejected" && (
                <span className="flex items-center text-red-600">
                  <XCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Rejected</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InboxSection({ tutors }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">My Tutors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="border rounded-lg p-4 transition-all hover:shadow-md flex flex-col"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-800">{tutor.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {Array.isArray(tutor.subjects) ? tutor.subjects.join(", ") : tutor.subjects}
                </p>
              </div>
              <div className="bg-blue-50 rounded-full p-2">
                <span className="text-xs font-medium text-blue-600">{tutor.start_date}</span>
              </div>
            </div>

            <div className="mt-auto pt-4 flex space-x-2">
              <a
                href={`https://wa.me/${tutor.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-sm bg-blue-50 text-blue-600 rounded-md px-3 py-1.5 hover:bg-blue-100 transition-colors flex-1"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                WhatsApp
              </a>
              <a
                href={`mailto:${tutor.email}`}
                className="flex items-center justify-center text-sm bg-gray-50 text-gray-600 rounded-md px-3 py-1.5 hover:bg-gray-100 transition-colors flex-1"
              >
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
