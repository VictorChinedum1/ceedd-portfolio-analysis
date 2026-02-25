import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import {
  heroData,
  aboutData,
  projectsData,
  skillsData,
} from "@/data/portfolio";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PortfolioHeader />
      <HeroSection
        name={heroData.name}
        tagline={heroData.tagline}
        description={heroData.description}
      />
      <AboutSection about={aboutData} />
      <ProjectsSection projects={projectsData} />
      <SkillsSection skills={skillsData} />
      <ContactSection />
      <PortfolioFooter />
    </div>
  );
};

export default Index;
