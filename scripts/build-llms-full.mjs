// Builds public/llms-full.txt: the full readable text of every page on the
// site, in one plain-text file for AI crawlers (the companion to llms.txt).
//
// Run after `next build`, then commit the result:
//   npm run build && npm run llms:full
//
// It reads the prerendered HTML in .next/server/app, so it covers every page,
// including the homepage and the role pages that are built in code rather than
// from pages.json. Only <main> is read (no menus or footers). Prices appear for
// both regions, "₹299 ($6.99 outside India)", the same rule the FAQ structured
// data follows, because a machine reader has no time zone. The phone-only copy
// of a section is skipped so nothing is read twice.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const SITE = "https://www.skilldrift.ai";
const ROOT = ".next/server/app";

// Pages in reading order: the homepage, the main pages, then the long tail.
const FIRST = [
  "", "how-it-works", "features", "jobs", "job-match", "skill-benchmarking",
  "career-roadmap", "learning-sprints", "interview-prep", "resume-tailoring",
  "resume-rewrite", "ats-score-checker", "career-change", "career-progression",
  "closed-loop-career-development", "learning-plan-from-resume", "ai-career-coach",
  "courses-but-no-interviews", "pricing", "proof", "compare",
  "skilldrift-vs-chatgpt", "skilldrift-vs-linkedin-premium", "skilldrift-vs-jobright",
  "skilldrift-vs-internshala", "about", "contact", "skills",
];
const LAST = ["privacy-policy", "terms-of-use", "data-protection"];

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

const INLINE_GAP = new Set(["button", "a", "span", "label", "strong", "b", "em"]);
const VOID = new Set(["br", "img", "hr", "meta", "link", "input", "source", "wbr", "area", "col", "embed", "track"]);
const SKIP = new Set(["script", "style", "svg", "noscript", "template"]);
const BLOCK = new Set(["p", "div", "section", "article", "header", "footer", "ul", "ol", "table", "thead", "tbody", "tr", "details", "summary", "dl", "dt", "dd", "figure", "figcaption", "blockquote", "nav", "aside", "form"]);

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rarr: "→", larr: "←", middot: "·", hellip: "…", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', times: "×", copy: "©" };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") return String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENT[e.toLowerCase()] ?? m;
  });

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? decode(m[1]) : null;
};

function mainText(html) {
  const start = html.indexOf("<main");
  const end = html.lastIndexOf("</main>");
  if (start < 0 || end < 0) return "";
  const parts = html.slice(start, end + 7).split(/(<[^>]+>)/);
  const stack = []; // { tag, skip, region }
  const bufs = [[]]; // capture buffers for regional spans
  let pendingIn = null;
  let skipping = 0;
  const out = (s) => bufs[bufs.length - 1].push(s);

  for (const part of parts) {
    if (!part) continue;
    if (part[0] !== "<") {
      if (!skipping) out(decode(part));
      continue;
    }
    if (part.startsWith("<!--")) continue;
    const close = part[1] === "/";
    const name = (part.match(/^<\/?([a-zA-Z0-9-]+)/) || [])[1]?.toLowerCase();
    if (!name) continue;

    if (close) {
      // Pop to the matching open tag.
      let i = stack.length - 1;
      while (i >= 0 && stack[i].tag !== name) i--;
      if (i < 0) continue;
      while (stack.length > i) {
        const el = stack.pop();
        if (el.skip) skipping--;
        if (!skipping && !el.skip) {
          if (el.region === "in") {
            pendingIn = bufs.pop().join("");
          } else if (el.region === "row") {
            const row = bufs.pop().join("").trim();
            const inn = (pendingIn ?? "").trim();
            pendingIn = null;
            if (!inn || !row || inn === row) out(inn || row);
            // A price pair reads inline; two versions of a sentence read as two labelled sentences.
            else if (inn.length <= 24 && row.length <= 24) out(`${inn} (${row} outside India)`);
            else out(` ${/^in india\b/i.test(inn) ? inn : `In India: ${inn}`} Outside India: ${row} `);
          } else if (/^h[1-6]$/.test(el.tag) || BLOCK.has(el.tag) || el.tag === "li") {
            out("\n");
          } else if (el.tag === "td" || el.tag === "th") {
            out(" | ");
          } else if (INLINE_GAP.has(el.tag)) {
            // Buttons, labels and spans often sit side by side with no space in
            // the markup ("internshipA new job"); spacing is tidied below.
            out(" ");
          }
        }
      }
      continue;
    }

    const selfClosing = VOID.has(name) || part.endsWith("/>");
    const cls = attr(part, "class") || "";
    const skip =
      SKIP.has(name) ||
      /\bsd-phone-only\b/.test(cls) ||
      /\shidden(=|\s|>)/.test(part) ||
      attr(part, "aria-hidden") === "true";

    if (selfClosing) {
      if (skipping || skip) continue;
      if (name === "img") {
        const alt = attr(part, "alt");
        if (alt) out(`\n[Image: ${alt}]\n`);
      } else if (name === "br") out("\n");
      continue;
    }

    const region = attr(part, "data-sd-region-only");
    stack.push({ tag: name, skip, region: skip ? null : region });
    if (skip) {
      skipping++;
      continue;
    }
    if (skipping) continue;
    if (region === "in" || region === "row") {
      bufs.push([]);
      continue;
    }
    if (name === "h1") out("\n# ");
    else if (name === "h2") out("\n## ");
    else if (name === "h3") out("\n### ");
    else if (/^h[4-6]$/.test(name)) out("\n#### ");
    else if (name === "li") out("\n- ");
    else if (BLOCK.has(name)) out("\n");
  }

  const lines = bufs[0]
    .join("")
    .split("\n")
    .map((l) => l.replace(/[ \t ]+/g, " ").trim())
    .map((l) => l.replace(/ ([,.;:!?)’”])/g, "$1").replace(/([(“‘]) /g, "$1"))
    .map((l) => l.replace(/\s*\|\s*$/, ""))
    .filter((l) => l && l !== "-" && l !== "View larger" && !/^#+$/.test(l));
  // Drop a line that repeats the one before it (stacked desktop and phone copy).
  return lines.filter((l, i) => l !== lines[i - 1]).join("\n");
}

const pages = htmlFiles(ROOT)
  .map((file) => {
    const rel = relative(ROOT, file).replace(/\\/g, "/").replace(/\.html$/, "");
    const route = rel === "index" ? "" : rel;
    return { file, route };
  })
  .filter(({ route }) => !route.startsWith("_") && !route.includes("["));

const rank = ({ route }) => {
  const f = FIRST.indexOf(route);
  if (f >= 0) return [0, f];
  const l = LAST.indexOf(route);
  if (l >= 0) return [3, l];
  if (route.startsWith("skills/in-demand")) return [2, 0];
  return [1, 0];
};
pages.sort((a, b) => {
  const [ga, ia] = rank(a);
  const [gb, ib] = rank(b);
  return ga - gb || ia - ib || a.route.localeCompare(b.route);
});

const sections = pages.map(({ file, route }) => {
  const html = readFileSync(file, "utf8");
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || route);
  const desc = attr((html.match(/<meta name="description"[^>]*>/) || [""])[0], "content");
  const body = mainText(html)
    .replace(/^# /m, "## ") // the page H1 sits under the page heading
    .replace(/\n# /g, "\n## ");
  return [`# ${title}`, `URL: ${SITE}/${route}`, desc ? `Summary: ${desc}` : "", "", body].filter((x, i) => x || i === 3).join("\n");
});

const header = `# SkillDrift: full text of www.skilldrift.ai

> Every page of the SkillDrift website as plain text, for AI assistants and search engines. The short guide with direct answers is at ${SITE}/llms.txt. Prices are shown for India and for everywhere else. Generated from the site build on ${new Date().toISOString().slice(0, 10)}.

`;

const text = header + sections.join("\n\n---\n\n") + "\n";
writeFileSync("public/llms-full.txt", text);
console.log(`llms-full.txt: ${pages.length} pages, ${(text.length / 1024).toFixed(0)} KB`);
