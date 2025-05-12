import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Categories from "@/components/categories";
import Tutors from "@/components/tutors";
import Faq from "@/components/faq";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <Tutors />
      <Faq />
      <Testimonials />
      <Footer />
    </main>
  );
}
