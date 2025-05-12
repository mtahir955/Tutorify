import Navbar from "../src/components/Navbar";
import Hero from "../src/components/hero";
import Categories from "../src//components/categories";
import Tutors from "../src//components/tutors";
import Faq from "../src//components/faq";
import Testimonials from "../src//components/testimonials";
import Footer from "../src/components/Footer";

export default function Homep() {
  return (
    <main className="min-h-screen bg-white">
      
      <Hero />
      <Categories />
      <Tutors />
      <Faq />
      <Testimonials />
    
    </main>
  );
}