import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://tutorify.live/api/login.php", formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        setSuccess("Login successful!");
        const user = response.data.user;
        console.log("Logged in user:", user);

        // Store user in localStorage if needed
        localStorage.setItem("user", JSON.stringify(user));

        // Navigate based on role
        if (user.role === "teacher") {
          navigate("/tutorsdashboard");
        } else if (user.role === "student") {
          navigate("/dashboard");
        } else {
          setError("Invalid user role.");
        }
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 md:px-8 md:py-12">
      <h1 className="text-4xl font-bold mb-8 text-cyan-500 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        <Button
          type="submit"
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-lg rounded-lg transition-colors"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
