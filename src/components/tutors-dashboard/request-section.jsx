"use client";

import { Check, X } from "lucide-react";

export default function RequestSection({ requests, onAccept, onDecline }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Student Requests</h2>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No pending requests</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="border rounded-lg p-4 transition-all hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{request.studentName}</h3>
                  <p className="text-sm text-gray-600">{request.subject}</p>
                  <div className="mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>

                {request.status === "Pending" && (
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => onAccept(request.id)}
                      className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
                      aria-label="Accept request"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDecline(request.id)}
                      className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                      aria-label="Decline request"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-2 text-sm text-gray-500">{request.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
