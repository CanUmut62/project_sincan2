import HeroSlider from "@/components/HeroSlider";
import { getHeroSlides } from "@/lib/hero-slides";
import { getPartners } from "@/lib/partners";
import StatsCounter from "@/components/StatsCounter";
import CategoryCards from "@/components/CategoryCards";
import { getCategories } from "@/lib/categories";
import WhyUs from "@/components/WhyUs";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";
import Sectors from "@/components/Sectors";
import AboutBrief from "@/components/AboutBrief";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";

export default async function HomePage() {
    const heroSlides = await getHeroSlides();
    const partners = await getPartners();
    const categories = await getCategories();

    return (
        <main>
            <HeroSlider slides={heroSlides} />
            <StatsCounter />
            <CategoryCards categories={categories} />
            <WhyUs />
            <ProcessSteps />
            <CtaBanner />
            <Sectors />
            <AboutBrief />
            <ClientLogos partners={partners} />
            <Testimonials />
            <Faq />
        </main>
    );
}
