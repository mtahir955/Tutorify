import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-100 pt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-12 w-12 text-cyan-500" />
            <span className="text-2xl font-bold text-cyan-500">MYTUTOR</span>
          </div>

          {/* Learn Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-500">LEARN</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/ielts" className="text-gray-600 hover:text-cyan-500">ENGLISH</Link>
              </li>
              <li>
                <Link to="/category/toeic" className="text-gray-600 hover:text-cyan-500">BIOLOGY</Link>
              </li>
              <li>
                <Link to="/category/mathematics" className="text-gray-600 hover:text-cyan-500">MATHEMATICS</Link>
              </li>
              <li>
                <Link to="/category/coding" className="text-gray-600 hover:text-cyan-500">CODING</Link>
              </li>
            </ul>
          </div>

          {/* Page Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-500">PAGE</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-cyan-500">Home</Link>
              </li>
              <li>
                <Link to="/tutors" className="text-gray-600 hover:text-cyan-500">Tutors</Link>
              </li>
              <li>
                <Link to="/questions" className="text-gray-600 hover:text-cyan-500">Questions</Link>
              </li>
              <li>
                <Link to="/become-a-tutor" className="text-gray-600 hover:text-cyan-500">Become a tutor</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-500">CONTACT</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <span>📞 000-1111-2222</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span>📧 info@tutorify.live</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-cyan-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-cyan-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-cyan-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-200 py-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} Copyright All Rights Reserved -{" "}
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>{" "}
            -{" "}
            <Link to="/legal-center" className="hover:underline">
              Legal Center
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
