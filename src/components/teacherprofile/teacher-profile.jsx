import React, { useState, useEffect } from "react";
import ProfileHeader from "./profile-header";
// import ContactInfo from "./contact-info";
import ProfessionalDetails from "./professional-details";
import CoursesOffered from "./courses-offered";
import axios from "axios";

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get("https://tutorify.live/api/getteacherprofile.php", {
          withCredentials: true,
        });

        if (response.data.success) {
          setTeacher(response.data.data);
        } else {
          setError(response.data.message || "Failed to load data.");
        }
      } catch (err) {
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!teacher) return null;

  const {
    full_name,
    father_name,
    cnic,
    gender,
    bio,
    photo,
    email,
    phone,
    country,
    state,
    city,
    expertise,
    experience,
    education,
    certifications,
    courses_offered,
  } = teacher;

  // Safely parse JSON fields or fallback
  const parseJSON = (data) => {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  const experty = expertise.split(',').map(item => item.trim());

  const professional = {
    experience,
    education,
    certifications,
    expertise: experty,
  };

  const courses = courses_offered.split(',').map(course => course.trim());


  return (
    <div className="max-w-full sm:max-w-4xl mx-auto px-4 sm:px-8">
      <div className="space-y-8">
        <ProfileHeader
          name={full_name}
          bio={bio}
          avatar={photo}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* <ContactInfo contact={teacherData.contact} /> */}
            <ProfessionalDetails professional={professional} />
          </div>

          <div>
            <CoursesOffered courses={courses} />
          </div>
        </div>
      </div>
    </div>
  );
}
