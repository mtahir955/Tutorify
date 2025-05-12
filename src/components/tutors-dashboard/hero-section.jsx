import { GraduationCap } from "lucide-react";

export default function HeroSection({ teacherName, students, requests }) {
  const totalStudents = students.length;
  const pendingRequests = requests.filter((req) => req.status.toLowerCase() === "pending").length;

  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome, {teacherName}</h1>
          <p className="text-gray-600 mt-2 text-lg">Welcome to your dashboard</p>
        </div>
        <div className="mt-4 sm:mt-0 bg-blue-50 p-4 rounded-full">
          <GraduationCap className="w-10 h-10 text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold text-gray-800">{totalStudents}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Pending Requests</p>
          <p className="text-2xl font-bold text-gray-800">{pendingRequests}</p>
        </div>
      </div>
    </div>
  );
}
