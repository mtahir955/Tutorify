import studentImg from "../assets/testimonials/student1.jpg"; // adjust path as needed

export default function Testimonials() {
  return (
    <>
      <section className="bg-gradient-to-tr to-cyan-500 from-teal-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Testimonial Card */}
            <div className="rounded-lg bg-teal-50 p-8">
              <p className="text-gray-700 text-lg md:text-xl">
                "Outstanding experience! The flexibility to learn at my own pace, coupled with expert guidance, has
                exceeded my expectations. Engaging with a diverse community of learners and educators enriched my learning
                journey. Highly recommended for anyone seeking quality education with a personal touch!"
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src={studentImg} // Updated to dynamic image path
                    alt="Student"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Nguyen Van A</p>
                  <p className="text-sm text-gray-600">FPT University</p>
                </div>
              </div>
            </div>

            {/* What They Say Section */}
            <div className="flex items-center justify-center text-center md:text-left">
              <div>
                <h2 className="text-3xl font-bold text-black sm:text-4xl">
                  What they say about us?
                </h2>
                <p className="mt-4 text-gray-700 text-lg md:text-xl">
                  Don't just take our word for it. Hear from our students who have experienced the MyTutor difference and
                  achieved their academic goals with our help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
