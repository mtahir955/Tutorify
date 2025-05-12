"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "../tutors-dashboard/hero-section";
import RequestSection from "../tutors-dashboard/request-section";
import ResponseSection from "../tutors-dashboard/response-section";
import StudentsSection from "../tutors-dashboard/students-section";

export default function Dashboard() {
  const [data, setData] = useState({
    teacherName: "",
    requests: [],
    responses: [],
    students: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tutorify.live/api/tutor_dashboard.php",
          {
            withCredentials: true,
          }
        );

        if (res.data.success === true) {
          const incoming = res.data.data;

          const parsedStudents = incoming.students.map((s) => ({
            ...s,
            subjects:
              typeof s.subjects === "string"
                ? s.subjects.includes(",")
                  ? s.subjects.split(",").map((sub) => sub.trim())
                  : [s.subjects]
                : Array.isArray(s.subjects)
                ? s.subjects
                : [],
          }));

          setData({
            teacherName: incoming.teacherName,
            requests: incoming.requests,
            responses: incoming.responses,
            students: parsedStudents,
          });
        } else {
          setError(res.data.message || "Failed to load dashboard data.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const res = await axios.post(
        "https://tutorify.live/api/handle_request.php",
        {
          request_id: requestId,
          status: "Accepted",
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setData((prev) => ({
          ...prev,
          requests: prev.requests.map((r) =>
            r.id === requestId ? { ...r, status: "Accepted" } : r
          ),
        }));
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const res = await axios.post(
        "https://tutorify.live/api/handle_request.php",
        {
          request_id: requestId,
          status: "Declined",
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setData((prev) => ({
          ...prev,
          requests: prev.requests.map((r) =>
            r.id === requestId ? { ...r, status: "Declined" } : r
          ),
        }));
      }
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-6">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection
        teacherName={data.teacherName}
        students={data.students}
        requests={data.requests}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RequestSection
          requests={data.requests}
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
        />
        <ResponseSection responses={data.responses} />
      </div>

      <StudentsSection students={data.students} />
    </div>
  );
}
