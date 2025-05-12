import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "FLEXIBLE SCHEDULING",
    answer:
      "Our team offers unparalleled flexibility when scheduling, accommodating for the demands of students and tutors. Whether you're juggling school, work, or other activities, you can easily find a time that fits your schedule. Our tutors are available evenings and weekends, ensuring your education never takes a backseat. With our intuitive booking system, making it easier to maintain consistent study sessions, leading to better academic outcomes without the stress.",
  },
  {
    id: 2,
    question: "AFFORDABLE PRICING",
    answer:
      "We offer competitive rates that make quality education accessible to everyone. Our pricing structure is transparent with no hidden fees or long-term commitments required.",
  },
  {
    id: 3,
    question: "INDUSTRY-EXPERT TUTORS",
    answer:
      "All our tutors are thoroughly vetted professionals with extensive experience in their fields. Many have advanced degrees and years of teaching experience in academic and professional settings.",
  },
  {
    id: 4,
    question: "CUSTOMIZED SUPPORT",
    answer:
      "We tailor our teaching approach to match your learning style and specific goals. Whether you need help with exam preparation, ongoing academic support, or skill development, we create a personalized learning plan just for you.",
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="bg-cyan-500 py-16">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">FAQ</h2>
          <p className="mt-4 text-gray-700 text-sm sm:text-base">
            Explore our FAQ section to find answers to common queries about our online tutoring services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
              <button
                className={`flex w-full items-center justify-between p-4 text-left transition-colors ${
                  openFaq === faq.id ? "bg-black text-white" : "bg-white text-gray-900"
                }`}
                onClick={() => toggleFaq(faq.id)}
              >
                <span className="text-base sm:text-lg font-medium">{faq.question}</span>
                {openFaq === faq.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openFaq === faq.id && (
                <div className="bg-white p-4 text-sm sm:text-base">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-cyan-100 p-6 shadow-md">
          <h3 className="text-xl sm:text-2xl font-bold text-black">What makes us the best academy online?</h3>
          <p className="mt-4 text-gray-800 text-sm sm:text-base">
            Our combination of expert tutors, flexible scheduling, personalized learning approaches, and affordable
            pricing sets us apart from other online tutoring platforms. We're committed to your success and provide
            the tools and support you need to achieve your academic goals.
          </p>
        </div>
      </div>
    </section>
  );
}
