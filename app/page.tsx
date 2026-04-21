import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Roadmap from "@/components/Roadmap";
import Testimonials from "@/components/Testimonials";
import FeedbackForm from "@/components/FeedbackForm";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Roadmap />
      <Testimonials />
      <FeedbackForm />
      <Contact />
    </>
  );
}
