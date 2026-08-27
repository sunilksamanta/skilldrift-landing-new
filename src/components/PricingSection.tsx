import PlanCards, { pricing } from "./PlanCards";
import { Pill, SectionIntro } from "./SectionBits";





const neverCosts = [
  "Skill gap analysis",
  "Career path",
  "Re-scoring after you upskill",
  "Resume & ATS analysis",
  "Job matching",
  "Jobs & internships",
  "Basic job analysis",
  "One AI course",
  "Podcasts",
  "Industry news",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="sect sect--alt">
      <div className="wrap">
        <Pill>Pricing</Pill>
        <SectionIntro
          heading="Diagnosis is free. You pay when you&rsquo;re ready to apply."
          copy="Your first application is on us — enough credits to rewrite your resume, tailor it to a job and download it. In India, one credit is one rupee, so every price below is already in money you understand."
        />

        <PlanCards />

        <div
          style={{
            marginTop: 22,
            padding: "30px 34px",
            borderRadius: 20,
            border: "1px solid var(--line)",
            background: "var(--card)",
          }}
        >
          <h3 style={{ fontSize: 19, fontWeight: 600 }}>
            Which one is cheaper for you &mdash; honestly
          </h3>
          <p
            style={{
              marginTop: 10,
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--tx2)",
              maxWidth: 940,
            }}
          >
            One application costs 72 credits: 18 to tailor, 54 to download. So{" "}
            {pricing.pack} covers about four. Past roughly eight applications a month
            &mdash; or three live mock interviews &mdash; unlimited costs you less. If
            you&rsquo;re mid-search, take unlimited; if you&rsquo;re browsing, take
            credits.
          </p>
        </div>

        <div
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))",
            gap: 22,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              padding: "30px 34px",
              borderRadius: 20,
              border: "1px solid var(--acline)",
              background:
                "linear-gradient(160deg, var(--acsoft), transparent 70%), var(--card)",
            }}
          >
            <h3 style={{ fontSize: 19, fontWeight: 600 }}>
              The certificate pays for itself
            </h3>
            <p
              style={{
                marginTop: 10,
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--tx2)",
              }}
            >
              Issuing a certificate to your resume costs 50 credits. Share it on LinkedIn
              and all 50 come straight back. Finish the course, put it on your profile,
              spend nothing.
            </p>
          </div>
          <div
            style={{
              padding: "30px 34px",
              borderRadius: 20,
              border: "1px solid var(--line)",
              background: "var(--card)",
            }}
          >
            <h3 style={{ fontSize: 19, fontWeight: 600 }}>Never costs a credit</h3>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexWrap: "wrap",
                gap: 9,
              }}
            >
              {neverCosts.map((label) => (
                <span
                  key={label}
                  style={{
                    padding: "8px 15px",
                    borderRadius: 999,
                    border: "1px solid var(--line2)",
                    fontSize: 14,
                    color: "var(--tx2)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
