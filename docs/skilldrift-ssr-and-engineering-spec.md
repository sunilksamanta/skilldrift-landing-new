# SkillDrift website: engineering spec

Extracted from the full storyline and build spec, 21 Aug 2026. This is the engineering-relevant half. The messaging and design half lives in the SkillDrift project as `claude/skilldrift-website-storyline-spec.md`.

---
### S1b — Pre-signup upload and result *(new)*

The drop-zone sits in the hero and resolves **in place** — no redirect, no modal, no account. This is the strongest asset on the page, because it is not a sample report, it is theirs.

**Free and ungated:** readiness score out of 100, the three skills holding it down, three matched roles.
**Behind signup:** every other match, the full gap detail, the roadmap, tailoring, download, interviews.

Blur the next two match rows rather than walling them. *"24 more found"* does more work than a locked door. The signup card carries the promise that makes it painless: **"Your resume is already here — you will not upload it again."**

**Four things this cannot ship without.**

**1. Consent at the drop-zone.** You are processing a CV before an account exists and before terms are accepted. India's DPDP Act requires notice and consent at collection; GDPR applies to rest-of-world visitors. Required microcopy, before any file is accepted:

> "We read your resume to score it and find matches. We store it so you don't have to upload it again if you make an account. We delete it after 30 days if you don't. [Privacy policy]."

Plus a retention job that actually deletes abandoned anonymous resumes on that schedule.

**2. Session merge.** Anonymous token → account on signup, resume carried across, never re-uploaded. The card promises it; the promise has to be true or this feature does more harm than good.

**3. Rate limiting.** Parsing, scoring and matching are LLM calls now available with no account. Cap per IP or fingerprint, validate file type and size, one analysis per anonymous session.

**4. Instrumentation.** This reshapes the activation funnel and could cut either way — some visitors will take the answer and leave satisfied. Without these events you will not know which happened: `anonymous_upload_started`, `anonymous_analysis_completed`, `anonymous_result_viewed`, `signup_from_anonymous`, `anonymous_session_merged`.

**One thing not to do.** The resume you now hold contains their email address. Do not email people who uploaded and left. It is unsolicited use of data collected for a different purpose, unlawful under both DPDP and GDPR, and it would burn precisely the trust this feature exists to build. If you want to reach them, a separate, unticked opt-in at the drop-zone is the only lawful route.

---

---

## 5. Engineering requirements

**Already live — please do not redo.** Homepage title and meta description, `og:title`, `og:site_name`, `og:locale`, `html lang`, the www → apex 301 with path and query preserved, GA4 on the apex, the blog's own `robots.txt` and database-generated sitemap, self-referencing canonical and Article JSON-LD on every blog post, and the blog sitemap declared in the apex robots.txt.

**Still open, in priority order:**

1. **Server-render the marketing routes.** `skilldrift.ai/interview-prep` still returns an empty client-rendered shell. All copy must be present in the HTML the server sends. Next.js App Router with static generation for these routes is the obvious fit.
2. **Per-route metadata.** Unique title, description and self-referencing canonical on all thirteen routes. Exact strings are in Appendix A — they are ready to paste.
3. **A real 404** returning HTTP 404, not the homepage at 200.
4. **Regenerate `sitemap.xml`** with the twelve real marketing routes. It currently declares the homepage only, as the agreed interim measure.
5. **JSON-LD on marketing pages.** Organization, SoftwareApplication, FAQPage and BreadcrumbList. Exact blocks in Appendix A.
6. **`og:type` and `twitter:card`** on all routes.
7. **Performance budget:** LCP under 2.5s on a mid-tier Android over 4G in India. The hero drop-zone must not be the LCP element or block it.
8. **Accessibility:** 4.5:1 minimum body contrast, keyboard-navigable radar and feature grid, alt text on product screenshots, `prefers-reduced-motion` respected by the radar animation.
9. **No carousel** as the sole route to primary content. If one survives, every slide must exist in the DOM.
10. **Analytics:** a `cta_click` event on every CTA tagged by `section`, `label` and `intent_door`, plus the five anonymous-upload events listed in §S1b.

# Appendix A — SSR content, ready to paste

Everything in this appendix is the literal string to ship. Titles are under 60 characters, descriptions between 140 and 160, and every route carries a self-referencing canonical. Nothing here should be generated at runtime or assembled from a template with the brand name appended twice.

## A1. The head block every route needs

```html
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ROUTE_TITLE}}</title>
  <meta name="description" content="{{ROUTE_DESCRIPTION}}">
  <link rel="canonical" href="https://skilldrift.ai{{ROUTE_PATH}}">
  <meta name="author" content="SkillDrift">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SkillDrift">
  <meta property="og:locale" content="en_IN">
  <meta property="og:title" content="{{ROUTE_TITLE}}">
  <meta property="og:description" content="{{ROUTE_DESCRIPTION}}">
  <meta property="og:url" content="https://skilldrift.ai{{ROUTE_PATH}}">
  <meta property="og:image" content="https://skilldrift.ai/og{{ROUTE_PATH}}.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ROUTE_TITLE}}">
  <meta name="twitter:description" content="{{ROUTE_DESCRIPTION}}">
  <meta name="twitter:image" content="https://skilldrift.ai/og{{ROUTE_PATH}}.png">
</head>
```

`og:type` is `website` on marketing routes and `article` on blog posts. One OG image per route — a shared default is acceptable at launch, a per-route image is better.

## A2. The thirteen routes

**`/`**
- Title: `SkillDrift — see the skills between you and the job you want`
- Description: `Upload your resume free and get a readiness score out of 100, the skills holding you back, and matched jobs and internships. No account needed to see it.`
- H1: `See exactly what's missing between you and the role you want`

**`/how-it-works`**
- Title: `How SkillDrift works — the closed career loop`
- Description: `Upload, get scored out of 100, follow a roadmap, earn certificates that write themselves into your resume, and watch your match score rise. Free to start.`
- H1: `Most tools hand you one piece. SkillDrift closes the loop.`

**`/resume-tailoring`**
- Title: `AI resume tailoring for every job you apply to | SkillDrift`
- Description: `Generate an ATS-optimised version of your resume for every application, for 18 credits. Your master copy stays untouched. Skill gap analysis is free.`
- H1: `Beat the bots. Land the interview.`

**`/resume-rewrite`**
- Title: `Rewrite your resume around outcomes, not duties | SkillDrift`
- Description: `Most resumes list duties. SkillDrift asks what actually happened and rewrites each line around the result. Every figure is one you supplied — nothing invented.`
- H1: `Your resume says what you did. It should say what happened.`

**`/interview-prep`**
- Title: `AI mock interviews — voice, recorded and text | SkillDrift`
- Description: `Practise for any role with an AI coach. Live voice, recorded practice or text Q&A, each with a scorecard telling you exactly where you lost points.`
- H1: `Practise until it's boring.`

**`/job-match`**
- Title: `Jobs matched to your resume, scored out of 100 | SkillDrift`
- Description: `Stop scrolling job boards. See roles ranked by how well you actually match, out of 100, including internships and entry-level openings. Free to use.`
- H1: `Stop scrolling job boards.`

**`/career-roadmap`**
- Title: `Build a career roadmap from your resume | SkillDrift`
- Description: `Pick a target role and get the exact skills that close the gap, in the order that moves your score. Your first career path is free when you upload a resume.`
- H1: `From target role to job offer.`

**`/skill-benchmarking`**
- Title: `Free skill gap analysis and peer benchmarking | SkillDrift`
- Description: `See your skills against industry standards and against your peers, scored out of 100, with the blind spots named. Free, and it re-scores as you learn.`
- H1: `See how you stack up.`

**`/learning-sprints`**
- Title: `Bite-size upskilling sprints with certificates | SkillDrift`
- Description: `Learn the exact skills your gap report flagged in short sprints, not 40-hour courses. Finish one and the certificate writes itself into your resume.`
- H1: `Learn in sprints, not semesters.`

**`/jobs`**
- Title: `Jobs and internships matched to your resume | SkillDrift`
- Description: `Real roles ranked for you out of 100, including internships and openings for under one year of experience. Upload your resume free to see your matches.`
- H1: `Real roles. Ranked for you, out of 100.`

**`/pricing`**
- Title: `SkillDrift pricing — free to start, pay when you apply`
- Description: `Skill gaps, career path, job matching and one AI course are free forever. Top up credits or go unlimited when you are ready to apply. In India, 1 credit = ₹1.`
- H1: `Diagnosis is free. You pay when you're ready to apply.`

**`/about`**
- Title: `About SkillDrift — the end-to-end career platform`
- Description: `SkillDrift closes the loop between the job you want and the skills you have: score the gap, close it, and let your resume update itself as you go.`
- H1: `About SkillDrift`

**`/contact`**
- Title: `Contact SkillDrift`
- Description: `Questions about SkillDrift, partnerships, or bringing SkillDrift to your university or company. Reach the team directly.`
- H1: `Get in touch`

## A3. JSON-LD

**Organization — on every route, in `<head>`:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SkillDrift",
  "url": "https://skilldrift.ai",
  "logo": "https://skilldrift.ai/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/skilldrift",
    "https://www.facebook.com/skilldriftindia",
    "https://www.instagram.com/skilldriftindia/",
    "https://www.youtube.com/@SkillDrift-AI"
  ]
}
</script>
```

**SoftwareApplication — on `/` and `/pricing` only:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrift",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "url": "https://skilldrift.ai",
  "description": "AI career platform that scores your skills against a target role, builds the learning path that closes the gap, and matches you to jobs and internships.",
  "offers": [
    { "@type": "Offer", "name": "Free", "price": "0", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Top up", "price": "299", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Unlimited", "price": "599", "priceCurrency": "INR" }
  ]
}
</script>
```

Emit the INR offers on the India build and the USD equivalents (`0`, `6.99`, `15.99`, `USD`) on the rest-of-world build. Do not emit both — conflicting prices in one block is worse than one.

**FAQPage — on `/` where the FAQ section lives.** All eight answers must also exist as visible HTML, not only inside the accordion's open state; a JSON-LD answer with no visible counterpart is a structured-data violation.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is SkillDrift?", "acceptedAnswer": { "@type": "Answer", "text": "SkillDrift is an AI career platform that scores your skills against the role you want, builds the learning path that closes the gap, and matches you to jobs and internships rated out of 100. As you learn, your score re-scores itself and your resume updates automatically." } },
    { "@type": "Question", "name": "Is SkillDrift free?", "acceptedAnswer": { "@type": "Answer", "text": "The parts that tell you where you stand are free forever: skill gap analysis, a career path, resume and ATS analysis, job matching, jobs and internships, one AI course for your domain, industry news and podcasts. New accounts also get starter credits, enough to rewrite your resume, tailor it to a job and download it." } },
    { "@type": "Question", "name": "Can SkillDrift analyse my resume without signing up?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Drop your resume on the homepage and you get your readiness score, the three skills holding it down, and three matched roles, with no account. Signing up shows the full gap report, every match and your roadmap, and your resume carries across so you never upload it twice." } },
    { "@type": "Question", "name": "Does SkillDrift invent numbers on my resume?", "acceptedAnswer": { "@type": "Answer", "text": "No. SkillDrift asks you a short set of questions about what each achievement actually produced, and rewrites from your answers. Every figure on your resume is one you supplied, so nothing can surprise you in an interview." } },
    { "@type": "Question", "name": "What does a credit cost, and what does it buy?", "acceptedAnswer": { "@type": "Answer", "text": "In India one credit is one rupee: 299 credits cost 299 rupees. Tailoring your resume to a job is 18 credits, a detailed job analysis is 37, a text-based mock interview is 50, a learning roadmap is 50, a resume download is 54 to 70, and a full outcome rewrite is 70. Unlimited access is 599 rupees a month." } },
    { "@type": "Question", "name": "Can I use SkillDrift if I am a student or a fresher?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We carry internships and roles for people with under a year of experience, scored the same way as everything else, so you can see where you genuinely stand rather than guessing." } },
    { "@type": "Question", "name": "What happens when I finish a course?", "acceptedAnswer": { "@type": "Answer", "text": "The certificate is added to your resume automatically, with no re-uploading and no re-formatting. Share it to LinkedIn in one click, as a post or straight into your certifications section, and the 50 credits it cost to issue come back to you." } },
    { "@type": "Question", "name": "How is this different from a resume builder?", "acceptedAnswer": { "@type": "Answer", "text": "A resume builder formats what you already wrote. SkillDrift starts from the role you want, tells you what is missing, helps you close it, and keeps your resume current as you do. The resume is an output of the loop, not the product." } }
  ]
}
</script>
```

**BreadcrumbList — on each of the seven feature pages**, with `{{NAME}}` and `{{PATH}}` filled from the route:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrift", "item": "https://skilldrift.ai" },
    { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://skilldrift.ai/features" },
    { "@type": "ListItem", "position": 3, "name": "{{NAME}}", "item": "https://skilldrift.ai{{PATH}}" }
  ]
}
</script>
```

## A4. sitemap.xml

Replace the interim single-URL file with these thirteen. `lastmod` should come from the build, not be hard-coded.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://skilldrift.ai/</loc><priority>1.0</priority></url>
  <url><loc>https://skilldrift.ai/how-it-works</loc><priority>0.9</priority></url>
  <url><loc>https://skilldrift.ai/pricing</loc><priority>0.9</priority></url>
  <url><loc>https://skilldrift.ai/jobs</loc><priority>0.9</priority></url>
  <url><loc>https://skilldrift.ai/resume-tailoring</loc><priority>0.8</priority></url>
  <url><loc>https://skilldrift.ai/resume-rewrite</loc><priority>0.8</priority></url>
  <url><loc>https://skilldrift.ai/interview-prep</loc><priority>0.8</priority></url>
  <url><loc>https://skilldrift.ai/job-match</loc><priority>0.8</priority></url>
  <url><loc>https://skilldrift.ai/career-roadmap</loc><priority>0.8</priority></url>
  <url><loc>https://skilldrift.ai/skill-benchmarking</loc><priority>0.8</priority></url>
  <url><loc>https://skilldrift.ai/learning-sprints</loc><priority>0.8</priority></url>
  <url><loc>https://skilldrift.ai/about</loc><priority>0.5</priority></url>
  <url><loc>https://skilldrift.ai/contact</loc><priority>0.5</priority></url>
</urlset>
```

## A5. The 404

An unknown path must return HTTP **404**, not 200 with the homepage. The page itself should carry `<title>Page not found | SkillDrift</title>`, `<meta name="robots" content="noindex">`, and a link back to `/` plus the drop-zone. Every path currently returning the homepage at 200 is a duplicate in Google's index.

## A6. Acceptance test

Ship is done when, for each of the thirteen routes, `curl -s https://skilldrift.ai{{PATH}} | grep -c "{{H1 TEXT}}"` returns 1 — proving the copy is in the served HTML and not painted by JavaScript. Then confirm `curl -o /dev/null -w "%{http_code}" https://skilldrift.ai/definitely-not-a-page` returns 404.

---

# Appendix B — Figma review, 21 Aug

Against `SkillDrift 3.0`, both prototype frames. Adopted correctly: the headline and subhead, the closed-loop concept, the rounded 40,000+, the six-tool section, the readiness score, and the hero drop-zone.

**Typos live in both versions.** "Beat the **boats**. Land the interview." → *bots*. "**$6,99**" and "**$15,99**" use a comma decimal separator on a dollar price. "**Prefect** for:" on both pricing cards. "Unlock unlimited **acess**". "**Presonalized** roadmap". "takes 1 **minutes**". "endless 40-hour **course**" → *courses*. "Your score re-scores itself free␣␣and better roles unlock. **then** round again." "SkillDrift reads what you already have␣␣your skills" — missing em dash. "Pick a target role and see your gap out of 100 skill by skill" — needs a comma after 100.

**Pricing is factually wrong.** Both cards say `/month`; Casual User is a one-time prepaid pack. No free tier, no credit-cost table, no INR state, no currency switcher.

**The radar is the right choice but does not loop.** No arrowheads on the arcs, no return from `[06] Raise` to `[01] Upload`, and an empty centre where *"gaps shrink in real time"* belongs. A section called "the closed loop" whose illustration does not close is the flaw a visitor feels without being able to name.

**Missing sections:** the outcome rewrite, the live-resume/certificate moat, what's free, jobs and internships, the intent doors, and `Sign in` in the nav.

**Two upload affordances in one hero.** "Upload your resume free" as a button *and* a drop-zone below it, with two different labels for one action. The drop-zone is the CTA; the button should go.

**Testimonials are still feelings, not outcomes,** and there are about twelve. Three with numbers will outperform twelve without.
