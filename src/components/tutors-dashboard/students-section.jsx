import { Mail, MessageSquare } from "lucide-react";

export default function StudentsSection({ students }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Current Students</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="border rounded-lg p-4 transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center mb-4">
              <div>
                <h3 className="font-medium text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {Array.isArray(student.subjects) ? student.subjects.join(", ") : student.subjects}
                </p>
              </div>
              <div className="bg-blue-50 rounded-full p-2 mt-2 sm:mt-0">
                <span className="text-xs font-medium text-blue-600">
                  {student.start_date}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-4 flex flex-wrap gap-2 sm:gap-4 justify-between">
              <a
                href={`https://wa.me/${student.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-sm bg-blue-50 text-blue-600 rounded-md px-3 py-1.5 hover:bg-blue-100 transition-colors w-full sm:w-auto"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                WhatsApp
              </a>
              <a
                href={`mailto:${student.email}`}
                className="flex items-center justify-center text-sm bg-gray-50 text-gray-600 rounded-md px-3 py-1.5 hover:bg-gray-100 transition-colors w-full sm:w-auto"
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
