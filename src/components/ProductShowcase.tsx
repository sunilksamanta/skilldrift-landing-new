import Image from "next/image";
import { Pill, SectionIntro } from "./SectionBits";

/*
 * The product itself, right under the goal doors: a real screen from the app
 * (company names swapped for neutral ones), so a visitor sees what the next
 * step looks like before reading about the loop.
 */
export default function ProductShowcase() {
  return (
    <section id="in-the-product" className="sect sect--tight">
      <div className="wrap">
        <Pill>In the product</Pill>
        <SectionIntro
          heading="Every day starts with one best move."
          copy="Your matches are scored out of 100 with the reasons shown, the next skill to learn is named, and your plan for today, now and next sits beside them. Finish a step and the scores move."
        />
        <div
          style={{
            position: "relative",
            marginTop: 48,
            width: "100%",
            aspectRatio: "1800 / 1290",
            borderRadius: 26,
            overflow: "hidden",
            border: "1px solid var(--line)",
            boxShadow: "0 40px 90px -30px rgba(76,52,180,.30)",
          }}
        >
          <Image
            src="/assets/shots/home-product.png"
            alt="The SkillDrift dashboard: the best move today, a Product Management internship scored 75 out of 100, the next roadmap, matched internships, and the plan for today, now and next"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
