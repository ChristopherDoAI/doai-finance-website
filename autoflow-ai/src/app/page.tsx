import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoBar from "@/components/LogoBar";
import Services from "@/components/Services";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import TrustBadges from "@/components/TrustBadges";
import BookingSection from "@/components/BookingSection";
import DarkCTA from "@/components/DarkCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <LogoBar />
      <Services />
      <HowItWorks />
      <DarkCTA />
      <BookingSection />
      <Footer />
    </main>
  );
}
