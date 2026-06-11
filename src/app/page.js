import HeroSection from "../../components/HeroSection";
import SkillsSection from "../../components/SkillsSection";
import Aboutme from "../../components/Aboutme";
import Experience from "../../components/Experience";
import ProjectSection from "../../components/ProjectSection";
import ServiceSection from "../../components/ServicesSection"; 
import ContactSection from "../../components/ContactSection"
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen select-none selection:bg-white selection:text-black">
      <HeroSection />
         <Aboutme />
      <SkillsSection />
        <ProjectSection />
          <ServiceSection />
      <Experience />
      <ContactSection/>
      <Footer/>
    </main>
  );
}