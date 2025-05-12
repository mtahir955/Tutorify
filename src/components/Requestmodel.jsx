import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import axios from "axios";

export default function RequestModal({ isOpen, onClose, tutor }) {
  const [message, setMessage] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://tutorify.live/api/send_request.php", {
        tutor_id: tutor.id,
        message,
        courses_offered: selectedCourses
      });

      if (response.data.success) {
        alert("Request sent successfully!");
        onClose();
      } else {
        alert("Failed to send request.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Error sending request.");
    }
  };

  const toggleCourse = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full space-y-4">
          <Dialog.Title className="text-xl font-bold">Request {tutor.name}</Dialog.Title>
          <Textarea
            placeholder="Write a message to the tutor..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div>
            <h4 className="font-semibold mb-2">Select Courses:</h4>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(tutor.subjects) ? tutor.subjects : []).map((course) => (
                <Button
                  key={course}
                  variant={selectedCourses.includes(course) ? "default" : "outline"}
                  onClick={() => toggleCourse(course)}
                >
                  {course}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} className="bg-purple-600 text-white">Send Request</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
