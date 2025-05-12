import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const links = ["Home", "Tutors", "Become A Tutor", "Login", "Register"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getPath = (link) => {
    return link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-teal-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-12 w-12 text-cyan-500" />
            <span className="ml-2 text-2xl font-bold text-cyan-500">Tutorify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to={getPath(link)}
                    className={`text-lg font-medium transition-colors hover:text-cyan-500 ${
                      activeLink === link ? "text-cyan-500" : "text-gray-700"
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
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-4">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to={getPath(link)}
                    className={`block text-sm font-medium transition-colors hover:text-purple-600 ${
                      activeLink === link ? "text-purple-600" : "text-gray-700"
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
