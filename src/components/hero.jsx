import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background color adjustment */}
      <div className="absolute bottom-0 right-0 h-1/2 w-full bg-cyan-500 md:h-full md:w-1/2 lg:w-1/2"></div>
      
      {/* Container for the section */}
      <div className="container relative mx-auto px-4 py-12 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* Left Text Section */}
          <div className="text-left">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              With Tutorify, <br />
              Everything Is Easier
            </h1>
            <p className="mt-4 max-w-md text-gray-600">
              Our platform connects you with expert tutors in a wide range of subjects, providing personalized and
              flexible learning experiences tailored to your needs.
            </p>
            <div className="mt-8">
              <Link
                to="/tutors"
                className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
              >
                Find a Tutor
              </Link>
            </div>
          </div>
          
          {/* Right Image Section */}
          <div className="relative h-64 md:h-auto md:max-w-md mx-auto">
            <div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl md:ml-auto">
              <img
                src="hero1.png"
                alt="Student video-calling a tutor on a laptop"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
