import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import DoorsSection from "@/components/DoorsSection";
import FaqSection, { faqs } from "@/components/FaqSection";
import FeaturesSection from "@/components/FeaturesSection";
import FreeSection from "@/components/FreeSection";
import HeroAndResult from "@/components/HeroAndResult";
import JobsSection from "@/components/JobsSection";
import LiveResumeSection from "@/components/LiveResumeSection";
import LoopSection from "@/components/LoopSection";
import PricingSection from "@/components/PricingSection";
import ProofSection from "@/components/ProofSection";
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
        overflowX: "hidden",
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
      <SiteHeader />
      <main>
        <HeroAndResult />
        <DoorsSection />
        <LoopSection />
        <RewriteSection />
        <LiveResumeSection />
        <FeaturesSection />
        <ProofSection />
        <JobsSection />
        <FreeSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
