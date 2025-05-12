// Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  const location = useLocation();

  // Dynamically set link set based on path
  const isTutorsDashboard = location.pathname.includes("tutorsdashboard") ||
    location.pathname.includes("tutorprofile") ||
    location.pathname.includes("editprofile");

  const links = isTutorsDashboard
    ? ["Dashboard", "Profile", "Logout"]
    : ["Dashboard", "Tutors", "Logout"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getPath = (link) => {
    if (link === "Dashboard" && isTutorsDashboard) return "/tutorsdashboard";
    if (link === "Dashboard") return "/dashboard";
    if (link === "Profile") return "/tutorprofile";
    if (link === "Logout") return "/logout";
    if (link === "Tutors") return "/tutorsp";
    return `/${link.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-teal-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-10 w-10 text-cyan-500" />
            <span className="ml-2 text-xl sm:text-2xl font-bold text-cyan-500">Tutorify</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-10">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to={getPath(link)}
                    className={`text-base font-medium transition-colors duration-200 hover:text-cyan-500 ${
                      activeLink === link ? "text-cyan-500" : "text-gray-800"
                    }`}
                    onClick={() => setActiveLink(link)}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-4">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to={getPath(link)}
                    className={`block text-base font-medium transition-colors duration-200 hover:text-cyan-500 ${
                      activeLink === link ? "text-cyan-500" : "text-gray-800"
                    }`}
                    onClick={() => {
                      setActiveLink(link);
                      setIsMenuOpen(false);
                    }}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
