import { Clock } from "lucide-react";

export default function ResponseSection({ responses }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Responses</h2>

      <div className="space-y-4">
        {responses.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No responses yet</p>
        ) : (
          responses.map((response) => (
            <div
              key={response.id}
              className="border rounded-lg p-4 transition-all hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h3 className="font-medium text-gray-800">{response.studentName}</h3>
                <div className="flex items-center text-gray-500 text-xs mt-2 sm:mt-0">
                  <Clock className="w-3 h-3 mr-1" />
                  {response.timestamp}
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-1">{response.subject}</p>

              <p className="mt-3 text-sm text-gray-700 border-l-2 border-gray-200 pl-3">
                {response.last_message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
