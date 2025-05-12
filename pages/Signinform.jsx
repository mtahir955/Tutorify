import RegisterForm from "../src/components/register-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-row md:flex-col">
        
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 md:flex hidden h-64 md:h-auto">
          <img
            src="r1.jpg"
            alt="Workspace with laptop and books"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full p-6 md:w-1/2 sm:p-8 flex flex-col justify-center">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
