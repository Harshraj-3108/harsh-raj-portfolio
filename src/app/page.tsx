import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
