import { useState, useEffect } from "react";
import RequestModal from "../src/components/Requestmodel";
import axios from "axios";
import { Search, Star, GraduationCap, BookOpen, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/ui/select";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";

export default function TutorSearch() {
  const [selectedTutor, setSelectedTutor] = useState(null);
const [showModal, setShowModal] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [tutorLevel, setTutorLevel] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("https://tutorify.live/api/gettutors.php"); 
        setTutors(response.data);
        setFilteredTutors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const applyFilters = () => {
    let result = [...tutors];

    if (searchTerm) {
      result = result.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tutor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (subject) {
      result = result.filter((tutor) =>
        tutor.subjects.some((subj) => subj.toLowerCase().includes(subject))
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((tutor) => tutor.price >= min && tutor.price <= max);
    }

    if (tutorLevel) {
      result = result.filter((tutor) =>
        tutor.education.toLowerCase().includes(tutorLevel)
      );
    }

    if (sortBy) {
      if (sortBy === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating-desc") {
        result.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === "students-desc") {
        result.sort((a, b) => b.studentsCount - a.studentsCount);
      }
    }

    setFilteredTutors(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800">
      <div className="container mx-auto px-4 py-5">
        {/* FILTER SECTION */}
        <div className="bg-teal-100 rounded-lg p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-full rounded-full border-gray-300">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full rounded-full border-gray-300">
                <SelectValue placeholder="Price range: 10,000Rs - 100,000Rs" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="10000-30000">10,000Rs - 30,000Rs</SelectItem>
                <SelectItem value="30000-50000">30,000Rs - 50,000Rs</SelectItem>
                <SelectItem value="50000-70000">50,000Rs - 70,000Rs</SelectItem>
                <SelectItem value="70000-100000">70,000Rs - 100,000Rs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tutorLevel} onValueChange={setTutorLevel}>
              <SelectTrigger className="w-full rounded-full border-gray-300">
                <SelectValue placeholder="Tutor Level" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="matric">Matric</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="professional">Coding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full rounded-full border-gray-300">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                <SelectItem value="students-desc">Most Students</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name or keyword"
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <div className="md:col-start-2 flex justify-end">
              <Button
                onClick={applyFilters}
                className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-8"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <h1 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
          {filteredTutors.length} tutors available
        </h1>

        {loading ? (
          <div className="text-center text-white">Loading tutors...</div>
        ) : (
          <div className="space-y-6">
           {filteredTutors.map((tutor) => (
  <TutorCard
    key={tutor.id}
    tutor={tutor}
    setSelectedTutor={setSelectedTutor}
    setShowModal={setShowModal}
  />
))}
          </div>
        )}
      </div>
      {showModal && selectedTutor && (
  <RequestModal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    tutor={selectedTutor}
  />
)}

    </div>
    
  );
}

function TutorCard({ tutor, setSelectedTutor, setShowModal }) {

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 lg:w-1/5 p-4 flex justify-center">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
            <img src={tutor.image || "/placeholder.svg"} alt={tutor.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-full md:w-2/4 lg:w-3/5 p-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-cyan-600 mb-2">{tutor.name}</h2>
          <div className="flex items-center mb-1">
            <GraduationCap className="text-purple-400 mr-2" size={20} />
            <span className="text-gray-600 text-sm md:text-base">{tutor.education}</span>
          </div>
          <div className="flex items-center mb-1">
            <BookOpen className="text-purple-400 mr-2" size={20} />
            <span className="text-gray-600 text-sm md:text-base">{tutor.subjects.join(", ")}</span>
          </div>
          <div className="flex items-center mb-1">
            <Users className="text-purple-400 mr-2" size={20} />
            <span className="text-gray-600 text-sm md:text-base">{tutor.studentsCount} students taught</span>
          </div>
          <p className="text-gray-600 text-sm md:text-base mt-2">{tutor.expertise}</p>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5 p-4 flex flex-col items-center justify-center bg-gray-50">
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 fill-current" size={24} />
            <span className="text-xl md:text-2xl font-bold ml-2">{tutor.rating}</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-purple-600 mb-6">
            Rs.{tutor.price.toLocaleString()}
          </div>
          <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full mb-2">
            Book This Tutor
          </Button>
          <Button
  variant="outline"
  className="w-full border-purple-500 text-purple-500 hover:bg-purple-50 rounded-full"
  onClick={() => {
    setSelectedTutor(tutor);
    setShowModal(true);
  }}
>
  Request Now
</Button>

        </div>
      </div>
    </div>
    
  );
}
