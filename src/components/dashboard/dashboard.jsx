import React, { useEffect, useState } from "react";
import Axios from "axios";
import HeroSection from "./hero-section";
import TeachersSection from "./teachers-section";
import RequestInboxSection from "./request-inbox-section";

export default function Dashboard() {
  const [studentData, setStudentData] = useState(null);
  const [tutorsData, setTutorsData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  // const [messagesData, setMessagesData] = useState([]);
  const [tutData, settutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://tutorify.live/api/student_dashboard.php");
        const data = response.data;

        if (data.success) {
          // Parse course strings if needed
          const normalizedTutors = data.data.tutors.map((tutor) => ({
            ...tutor,
            courses_offered: Array.isArray(tutor.courses_offered)
              ? tutor.courses_offered
              : (() => {
                  try {
                    const parsed = JSON.parse(tutor.courses_offered);
                    return Array.isArray(parsed) ? parsed : [tutor.courses_offered];
                  } catch {
                    return tutor.courses_offered ? [tutor.courses_offered] : [];
                  }
                })()
          }));

          setStudentData(data.data.student);
          setTutorsData(normalizedTutors);
          setRequestsData(data.data.requests);
          // setMessagesData(data.data.messages);
          settutData(data.data.tutorss);

        } else {
          console.error("Failed to fetch data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection
        studentName={studentData.full_name}
        headline="Brighter Future Starts with Better Learning."
        ctaText="Find Your Tutor"
      />
      
      <section className="mt-12">
        <TeachersSection tutors={tutorsData} />
      </section>

      <section className="mt-12">
        <RequestInboxSection requests={requestsData} tutors={tutData} />
      </section>
    </div>
  );
}
