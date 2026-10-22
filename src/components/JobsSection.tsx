import ShotPicture from "./ShotPicture";
import TrackedLink from "./TrackedLink";
import { Pill, SectionIntro, primaryButton } from "./SectionBits";

export default function JobsSection() {
  return (
    <section id="jobs" className="sect sect--alt">
      <div className="wrap">
        <Pill>Jobs &amp; internships</Pill>
        <SectionIntro
          heading="Real roles. Ranked for you, out of 100."
          copy="Including internships and openings for people with under a year of experience, scored the same way as everything else, so you know where you actually stand. Only jobs with a trusted apply link, checked before you apply, and never charged once closed."
        />

        {/* The real job board: the board itself on desktop, its swipeable
            Discover view on a phone. Replaces a list built in code. */}
        <div
          style={{
            marginTop: 48,
            borderRadius: 26,
            overflow: "hidden",
            border: "1px solid var(--line)",
            boxShadow: "0 40px 90px -30px rgba(76,52,180,.30)",
          }}
        >
          <ShotPicture
            desktop="/assets/shots/jobs-board.png"
            mobile="/assets/shots/m-jobs-board.png"
            alt="The SkillDrift job board: new matches scored out of 100, shortlisted jobs with a tailored resume, and applied jobs, each with an apply link on the company site"
            sizes="(max-width: 760px) 100vw, 1400px"
          />
        </div>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 22,
            flexWrap: "wrap",
          }}
        >
          <TrackedLink
            href="/jobs"
            section="jobs"
            label="browse_jobs"
            style={primaryButton}
          >
            Browse matched jobs
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
