import { Star } from "lucide-react";
import davidImg from "/public/david.jpg";
import bobImg from "/public/bob.jpg";
import sarahImg from "/public/sarah.jpg";
import { useNavigate } from "react-router-dom";

const tutors = [
  {
    id: 1,
    name: "DAVID BLACK",
    image: davidImg,
    rating: 5,
    fee: "50,000Rs",
    education: "MASTER of Mathematics",
    subjects: "Mathematics",
    description: "Specialized in Mathematics, with a strong focus on problem-solving and analytical thinking skills.",
  },
  {
    id: 2,
    name: "BOB BROWN",
    image: bobImg,
    rating: 4.8,
    fee: "60,000Rs",
    education: "DOCTOR of Business Administration",
    subjects: "Biology",
    description: "Specialized in Biology, with a strong focus on scientific communication and practical laboratory skills.",
  },
  {
    id: 3,
    name: "SARAH JOHNSON",
    image: sarahImg,
    rating: 4.6,
    fee: "50,000Rs",
    education: "DOCTOR of Physics",
    subjects: "Languages, Coding, Physics",
    description: "Experienced tutor in science subjects & programming",
  },
];

export default function Tutors() {
  const navigate=useNavigate();
  return (
    <>
      <hr />
      <section className="bg-teal-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-black">Best Tutors</h2>
            <p className="mt-4 text-gray-700">
              Connect with top-rated tutors who provide personalized and effective teaching. Achieve your goals with
              expert help in academics, test prep, and skill development. Learn with the best!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="overflow-hidden rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-700">{tutor.name}</h3>
                    <div className="mt-1 flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4"
                            fill={i < Math.floor(tutor.rating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-600">{tutor.rating}</span>
                    </div>
                    <div className="mt-1 text-lg font-bold text-gray-700">{tutor.fee}</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-gray-700">
                      {tutor.education}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Subjects:</span> {tutor.subjects}
                  </div>
                  <p className="text-sm text-gray-600">{tutor.description}</p>
                </div>

                <div className="mt-6 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <button className="rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-500"
                  onClick={()=>(navigate("/login"))}
                  >
                    Book This Tutor
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
