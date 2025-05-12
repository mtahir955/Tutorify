// Categories.jsx
import { Link } from "react-router-dom";
import { BookOpen, Code, Calculator, Languages } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "English",
    icon: <Languages className="h-10 w-10 text-cyan-500" />,
    color: "bg-red-100",
  },
  {
    id: 2,
    title: "Mathematics",
    icon: <Calculator className="h-10 w-10 text-cyan-500" />,
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Coding",
    icon: <Code className="h-10 w-10 text-cyan-500" />,
    color: "bg-green-100",
  },
  {
    id: 4,
    title: "Biology",
    icon: <BookOpen className="h-10 w-10 text-cyan-500" />,
    color: "bg-yellow-100",
  },
];

export default function Categories() {
  return (
    <>
      <hr />
      <section className="bg-cyan-500 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              Popular Categories
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-800">
              Find the perfect tutor for your needs, from test prep to language learning and academic help. Our
              experienced tutors are here to guide you to success.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-start rounded-xl bg-white p-6 shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${category.color}`}
                >
                  {category.icon}
                </div>
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-800">
                  {category.title}
                </h3>
                <Link
                  to={`/category/${category.title.toLowerCase()}`}
                  className="mt-auto inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-600 hover:bg-cyan-200 transition"
                >
                  See More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
