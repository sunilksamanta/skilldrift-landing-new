"use client";

import { useEffect, useState } from "react";
import ShotPicture from "./ShotPicture";
import { Pill, SectionIntro } from "./SectionBits";
import { trackIntentSelected } from "@/lib/analytics/cta";

/*
 * The product itself, right under the goal doors: a real dashboard from the
 * app for each goal (company names swapped for neutral ones). The dashboard is
 * built around the goal a person picks, so the screen follows the goal: the
 * hero picker and the doors both switch it (the `sd:goal` event), and picking
 * a tab here switches them back.
 */
const goals = [
  {
    tab: "First job or internship",
    intent: "Land my first job",
    copy: "Internships and first jobs scored out of 100 with the reasons shown, the next skill to learn named, and your plan for today, now and next beside them. Finish a step and the scores move.",
    desktop: "/assets/shots/home-product.png",
    mobile: "/assets/shots/m-home-product.png",
    alt: "The SkillDrift dashboard for an internship goal: the best move today, an electrical engineering internship scored 74 out of 100, the next roadmap, matched internships, and the plan for today, now and next",
  },
  {
    tab: "A new job or field",
    intent: "Move to a new job",
    copy: "Jobs in your field scored out of 100, the best one to act on today, and the steps that get you there: tailor your resume to the job, check each requirement before you apply, practise the interview.",
    desktop: "/assets/shots/home-product-newjob.png",
    mobile: "/assets/shots/m-home-product-newjob.png",
    alt: "The SkillDrift dashboard for a new job in your field: a tax manager role scored 78 out of 100 as the best move today for an accountant, more jobs in the same role scored out of 100, and the steps to tailor, check and practise",
  },
  {
    tab: "Grow where I am",
    intent: "Get promoted where I am",
    copy: "Your strength in the role you have and the one gap that moves your readiness most, with what each roadmap adds before you start. Your next role is already on the plan for when you are ready.",
    desktop: "/assets/shots/home-product-grow.png",
    mobile: "/assets/shots/m-home-product-grow.png",
    alt: "The SkillDrift dashboard for growing in your current role: 61% strength as a maintenance engineer, the top gap that adds 10% readiness, and Senior Maintenance Engineer as the next role on the plan",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const on = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (typeof i === "number" && goals[i]) setActive(i);
    };
    window.addEventListener("sd:goal", on);
    return () => window.removeEventListener("sd:goal", on);
  }, []);

  return (
    <section id="in-the-product" className="sect sect--tight">
      <div className="wrap">
        <Pill>In the product</Pill>
        <SectionIntro heading="Every day starts with one best move." copy={goals[active].copy} />

        <div role="tablist" aria-label="Show the dashboard for a goal" className="sd-show-tabs">
          {goals.map((g, i) => (
            <button
              key={g.tab}
              type="button"
              role="tab"
              id={`show-tab-${i}`}
              aria-selected={active === i}
              aria-controls="show-panel"
              onClick={() => {
                trackIntentSelected(g.intent);
                setActive(i);
                window.dispatchEvent(new CustomEvent("sd:goal", { detail: i }));
              }}
            >
              {g.tab}
            </button>
          ))}
        </div>

        <div
          id="show-panel"
          role="tabpanel"
          aria-labelledby={`show-tab-${active}`}
          style={{
            position: "relative",
            marginTop: 22,
            width: "100%",
            borderRadius: 26,
            overflow: "hidden",
            border: "1px solid var(--line)",
            boxShadow: "0 40px 90px -30px rgba(76,52,180,.30)",
          }}
        >
          {goals.map((g, i) => (
            <div key={g.tab} hidden={active !== i}>
              <ShotPicture desktop={g.desktop} mobile={g.mobile} alt={g.alt} sizes="(max-width: 760px) 100vw, 1400px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
