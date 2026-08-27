"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";
import Wordmark from "./Wordmark";
import SectionLink from "./SectionLink";

export default function CtaSection() {
  const host = useRef<HTMLDivElement>(null);
  const [risen, setRisen] = useState(false);

  /* The phone slides up out of the fold once its frame enters the viewport —
     the design's `data-sd-rise` behaviour, done with an observer. Under
     prefers-reduced-motion the global stylesheet drops the transition, so it
     simply appears in place. */
  useEffect(() => {
    const node = host.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRisen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Get started with SkillDrift"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#5B49B4",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px),linear-gradient(180deg, #6A55C8 0%, #5B49B6 40%, #4B3C99 74%, #382C6D 100%)",
        backgroundSize: "120px 120px, 120px 120px, 100% 100%",
      }}
    >
      <div
        className="sd-cta-top"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1600,
          margin: "0 auto",
          padding: "96px 100px 0",
          textAlign: "center",
        }}
      >
        <Wordmark markSize={46} textSize={30} tone="onColor" />
        <h2
          style={{
            marginTop: 32,
            fontSize: "clamp(32px,3.6vw,50px)",
            lineHeight: 1.14,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            color: "#FFFFFF",
          }}
        >
          The gap is already there.
          <br />
          You may as well{" "}
          <span
            style={{
              background: "linear-gradient(96deg,#EDE7FF,#BFE9E4 62%,#A8DFF4)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            see it.
          </span>
        </h2>
        <p
          style={{
            margin: "22px auto 0",
            maxWidth: 560,
            fontSize: 17,
            lineHeight: 1.6,
            color: "rgba(255,255,255,.80)",
          }}
        >
          Two minutes, one upload, and you&rsquo;ll know exactly where you stand.
        </p>
        <div
          style={{
            marginTop: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 34,
            flexWrap: "wrap",
          }}
        >
          <SectionLink
            to="top"
            style={{
              height: 58,
              padding: "0 40px",
              borderRadius: 14,
              background: "#FFFFFF",
              color: "#1A1330",
              fontSize: 16.5,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Get started free
          </SectionLink>
          <SectionLink
            to="top"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontSize: 16.5,
              fontWeight: 500,
              color: "rgba(255,255,255,.9)",
            }}
          >
            Upload your resume free
            <ArrowRight size={18} strokeWidth={1.9} />
          </SectionLink>
        </div>
        <p style={{ marginTop: 26, fontSize: 13, color: "rgba(255,255,255,.62)" }}>
          No card required &middot; first application free &middot; takes 2 minutes
        </p>
        <div
          style={{
            marginTop: 42,
            fontSize: 12.5,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,.66)",
          }}
        >
          OR GET THE APP
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://apps.apple.com/in/app/skilldrift/id6749856149"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
            <Image
              src="/assets/app_store.png"
              alt="Download on the App Store"
              width={944}
              height={328}
              style={{ height: 48, width: "auto", display: "block" }}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.skilldrift.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
            <Image
              src="/assets/google_play.png"
              alt="Get it on Google Play"
              width={944}
              height={328}
              style={{ height: 48, width: "auto", display: "block" }}
            />
          </a>
        </div>
      </div>

      <div
        ref={host}
        style={{
          marginTop: 56,
          width: "100%",
          height: "min(46vw,560px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src="/assets/phone.png"
          alt="The SkillDrift app asking what your main career goal is"
          width={1620}
          height={1760}
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            width: "min(40vw,560px)",
            height: "auto",
            display: "block",
            transform: risen ? "translate(-50%,0)" : "translate(-50%,102%)",
            transition: "transform 1.25s cubic-bezier(.16,.84,.24,1)",
            filter: "drop-shadow(0 -30px 70px rgba(20,10,60,.45))",
          }}
        />
      </div>
    </section>
  );
}
