/**
 * Tell IndexNow which URLs changed.
 *
 * IndexNow is a push protocol: instead of waiting for Bing to re-crawl on its
 * own schedule, one POST tells it what moved and it fetches within minutes.
 * Bing is also the index ChatGPT search reads, which is the reason this matters
 * beyond Bing's own traffic share.
 *
 * Ownership is proved by hosting `public/<key>.txt` containing exactly the key.
 * Bing fetches that file and compares; if it does not match, the submission is
 * rejected. That is why the key here and the filename in `public/` must stay in
 * step — change one and you must change the other.
 *
 * Usage, after a deploy has gone live:
 *
 *   node scripts/indexnow.mjs                  # every URL in the sitemap
 *   node scripts/indexnow.mjs /pricing /jobs   # only these
 *
 * Submit only URLs that actually changed. Repeatedly pushing the whole site
 * when nothing moved is what gets a key rate-limited.
 *
 * The URLs must be live before you run this: IndexNow fetches them, and a 404
 * teaches Bing the page is gone. Run it after the deploy, never before.
 */

const KEY = "5da20657b3684060a934e932af39d32d";
const HOST = "www.skilldrift.ai";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** Every canonical URL, read from the deployed sitemap rather than a second list. */
async function urlsFromSitemap() {
  const response = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`sitemap.xml returned ${response.status}`);
  }
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((path) => (path.startsWith("http") ? path : `${ORIGIN}${path}`))
  : await urlsFromSitemap();

if (urlList.length === 0) {
  console.error("Nothing to submit.");
  process.exit(1);
}

// The key file has to be reachable before the submission, not after; checking
// here turns a silent rejection into a readable error.
const keyFile = await fetch(`${ORIGIN}/${KEY}.txt`);
const keyBody = keyFile.ok ? (await keyFile.text()).trim() : null;
if (keyBody !== KEY) {
  console.error(
    `Key file check failed at ${ORIGIN}/${KEY}.txt\n` +
      `  status: ${keyFile.status}\n` +
      `  body:   ${keyBody === null ? "(unreadable)" : JSON.stringify(keyBody)}\n` +
      `IndexNow will reject the submission until this serves exactly the key.`,
  );
  process.exit(1);
}

console.log(`Submitting ${urlList.length} URL(s) to IndexNow as ${HOST}:`);
for (const url of urlList) console.log("  " + url);

const submission = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  }),
});

// 200 accepted, 202 accepted but the key is still being verified. Both are fine.
if (submission.status === 200 || submission.status === 202) {
  console.log(`\nAccepted (HTTP ${submission.status}).`);
} else {
  console.error(`\nRejected: HTTP ${submission.status}`);
  console.error(await submission.text());
  process.exit(1);
}
