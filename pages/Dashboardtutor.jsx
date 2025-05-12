import { Star } from "lucide-react";
import davidImg from "/public/david.jpg";
import bobImg from "/public/bob.jpg";
import sarahImg from "/public/sarah.jpg";

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
  return (
    <>
      <hr />
      <section className="bg-teal-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-black">Best Tutors</h2>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
              Connect with top-rated tutors who provide personalized and effective teaching. Achieve your goals with
              expert help in academics, test prep, and skill development. Learn with the best!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-gray-200">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
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
                  <span className="inline-block rounded bg-purple-100 px-2 py-1 text-xs font-medium text-gray-700">
                    {tutor.education}
                  </span>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Subjects:</span> {tutor.subjects}
                  </div>
                  <p className="text-sm text-gray-600">{tutor.description}</p>
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-start">
                  <button className="rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-500">
                    Book This Tutor
                  </button>
                  <button className="rounded-full border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-500 transition-colors hover:bg-purple-50">
                    View Full Schedule
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
