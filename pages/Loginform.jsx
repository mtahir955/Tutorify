import LoginForm from "../src/components/login-form";

export default function Login() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden flex md:flex-row">
        <div className="md:w-1/2 md:flex hidden p-4">
          <img
            src="r1.jpg"
            alt="Workspace with laptop and books"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <LoginForm />
        </div>
      </div>
      
    </main>
  );
}
