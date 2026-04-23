import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Roadmap from '@/components/Roadmap';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar/>
      <Hero/>
      <About />
      <Services />
      <Skills />
      <Projects />
      <Testimonials />
      <Roadmap />
      <Contact />
    </main>
  );
}