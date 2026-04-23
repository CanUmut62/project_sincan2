import HeroSlider from "@/components/HeroSlider";
import StatsCounter from "@/components/StatsCounter";
import CategoryCards from "@/components/CategoryCards";
import WhyUs from "@/components/WhyUs";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";
import Sectors from "@/components/Sectors";
import AboutBrief from "@/components/AboutBrief";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";

export default function HomePage() {
    return (
        <main>
            <HeroSlider />
            <StatsCounter />
            <CategoryCards />
            <WhyUs />
            <ProcessSteps />
            <CtaBanner />
            <Sectors />
            <AboutBrief />
            <ClientLogos />
            <Testimonials />
            <Faq />
        </main>
    );
}
