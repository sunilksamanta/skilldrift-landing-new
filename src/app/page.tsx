import type { Metadata } from "next";
import AiCourseSection from "@/components/AiCourseSection";
import CareerLifeSection from "@/components/CareerLifeSection";
import CtaSection from "@/components/CtaSection";
import DoorsSection from "@/components/DoorsSection";
import FaqSection, { faqs } from "@/components/FaqSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroAndResult from "@/components/HeroAndResult";
import JobsSection from "@/components/JobsSection";
import ScoreLoopSection from "@/components/ScoreLoopSection";
import LoopSection from "@/components/LoopSection";
import PricingSection from "@/components/PricingSection";
import ProofSection from "@/components/ProofSection";
import ProductShowcase from "@/components/ProductShowcase";
import RewriteSection from "@/components/RewriteSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import JsonLd from "@/components/JsonLd";
import ScrollOnLoad from "@/components/ScrollOnLoad";
import {
  faqPageSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/");

export default function Home() {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--tx)",
        minHeight: "100vh",
        overflowX: "clip",
      }}
    >
      <JsonLd
        schemas={[
          webPageSchema("/"),
          softwareApplicationSchema(),
          faqPageSchema(faqs),
        ]}
      />
      <ScrollOnLoad />
      <SiteHeader campaign={"home"} />
      <main>
        <HeroAndResult />
        <DoorsSection />
        <ProductShowcase />
        <ScoreLoopSection />
        <AiCourseSection />
        <LoopSection />
        <CareerLifeSection />
        <RewriteSection />
        <FeaturesSection />
        <ProofSection />
        <JobsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter campaign={"home"} />
    </div>
  );
}
