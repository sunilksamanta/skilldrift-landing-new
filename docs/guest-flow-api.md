# Guest Resume Flow API

Everything a visitor can do **before** they have an account: upload a resume, watch it get analysed,
read the results, and then carry all of it onto a real account at sign-up.

| | |
|---|---|
| **Base URL** | `{API_HOST}/api` |
| **Auth** | Guest token header — no login |
| **Session life** | 48 hours in Redis |
| **Persistence** | Nothing is written to MongoDB until the claim call |

---

## How the flow works

The visitor uploads a resume and gets back a `guestToken`. That token identifies their analysis for the
next 48 hours. Nothing is written to the database — the whole session lives in Redis until they sign up
and *claim* it.

| Actor | Step |
|---|---|
| Visitor | Drops a PDF or Word file on `/try` |
| Client | `POST /guest/upload` → store `guestToken` + `sessionId` in localStorage |
| Client | Poll `GET /guest/status/:sessionId` every 3s until `completed` |
| Client | Read the three result endpoints, then poll `/guest/jobs` separately |
| Visitor | Signs up or logs in through the **normal** auth endpoints — unchanged |
| Client | `POST /guest/claim` with the token → data moves onto their account |

> **Auth is untouched.** There is no guest sign-up endpoint. The visitor registers or logs in exactly as
> any other user does, and the claim call runs afterwards with their normal bearer token.

---

## Two ways to authenticate

**Guest endpoints** — send the guest token as a header, no `Authorization`:

```
x-guest-token: 6f1378fa-5801-42f6-9bf4-831c26e112e8
```

`?guestToken=…` works as a fallback if a header is awkward.

**Claim endpoint only** — runs after sign-in, so it uses the standard bearer token:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs…
```

The guest token travels in the JSON body instead.

---

## Response envelope

Every response — success or failure — is wrapped the same way. Your payload is always under `data`.

**Success**

```json
{
  "error": false,
  "status": true,
  "statusCode": 200,
  "responseTimestamp": "2026-08-26T07:20:13.812Z",
  "data": { }
}
```

**Failure**

```json
{
  "error": true,
  "name": "GUEST_SESSION_EXPIRED",
  "message": "Guest session has expired, please upload your resume again",
  "statusCode": 410,
  "responseTimestamp": "2026-08-26T07:20:13.812Z"
}
```

---

## 1. Upload the resume

```
POST /api/guest/upload          (no auth)
```

Sends the resume file. Returns **immediately** — the analysis runs in the background, so do not hold a
spinner on this request.

**Request — `multipart/form-data`**

```js
// Do NOT set Content-Type yourself — the browser adds the boundary.
const form = new FormData()
form.append('file', file)   // PDF, DOC or DOCX · max 5 MB
```

**Response — 200**

```json
{
  "guestToken": "6f1378fa-5801-42f6-9bf4-831c26e112e8",
  "sessionId": "b8c8fd61-ae59-4e20-94e6-ea7f73a8ad68"
}
```

> **Persist both values right away.** The `guestToken` authenticates every later call and the `sessionId`
> is what you poll with. Losing them means losing the analysis — there is no way to look a session up again.

**Errors**

| Code | Name | When |
|---|---|---|
| 422 | `VALIDATION_ERROR` | No file, wrong type, over 5 MB, or the bytes are not really a PDF/Word file |
| 429 | — | More than 5 uploads from one IP in an hour |

---

## 2. Poll the analysis status

```
GET /api/guest/status/:sessionId          (x-guest-token)
```

Poll every ~3 seconds while the processing screen is up. Stop polling on `completed` or `failed`.

**Response — 200**

```json
{
  "sessionId": "b8c8fd61-ae59-4e20-94e6-ea7f73a8ad68",
  "status": "analysis_ready",
  "error": null
}
```

**Status values**

| Status | Typical timing | What you can show |
|---|---|---|
| `processing` | 0–15s | Progress screen only |
| `analysis_ready` | ~15–30s | Resume analysis and rebuilt resume are already readable — skill gap still running |
| `completed` | ~45–60s | Everything ready, move to the results page |
| `failed` | — | Show `error` and offer a re-upload. Each AI stage times out after 5 minutes. |

> **You can render early.** At `analysis_ready` the score, strengths and gaps are already there. Waiting
> for `completed` costs the user roughly 30 extra seconds of staring at a progress bar.

---

## 3. Resume analysis

```
GET /api/guest/resume-analysis          (x-guest-token)
```

The ATS read of the uploaded resume. Same shape as the logged-in `/resume-builders/resume-analysis`, so
existing components work unchanged.

**Response — 200 (trimmed)**

```json
{
  "_id": null,
  "sessionId": "b8c8fd61-…",
  "analysisCompleted": true,
  "profileGenerationCompleted": true,
  "industryType": "Backend Developer",
  "resumeProfileInText": "…2028 characters…",
  "createdAt": "2026-08-26T07:19:00.000Z",
  "analysis": {
    "personalInfo": { "name": "RAKESH MODAK", "region": "Kolkata" },
    "totalYearsOfExperience": 3,
    "jobSearchTitle": "Backend Developer",
    "jobSearchTitles": ["Backend Developer", "Node.js Developer"],
    "overall": {
      "atsScore": 62,
      "strengths": [],
      "weaknesses": [],
      "missingSections": [],
      "recommendations": []
    },
    "experience": [],
    "education": [],
    "skills": {},
    "certifications": [],
    "projects": []
  }
}
```

> **`_id` is always null.** Nothing exists in the database yet. Do not use it as a React key or a lookup id.

---

## 4. Skill gap analysis

```
GET /api/guest/skill-gap-analysis          (x-guest-token)
```

Available only once status is `completed`. The analysis object is spread flat at the top level, with
`careerPathId` and `error` alongside it.

**Response — 200 (trimmed)**

```json
{
  "domainAnalysis": {
    "primaryDomain": "Software Engineering (Backend)",
    "experienceLevel": "mid",
    "specialization": "REST API backend development…",
    "targetRole": "Node.js Backend Developer (REST APIs)…"
  },
  "skillCategories": [
    {
      "category": "Testing, QA & Reliability",
      "skillLevelScore": 40,
      "industryBenchmark": 72,
      "priority": "high",
      "identifiedGaps": [],
      "actionableRecommendations": []
    }
  ],
  "radarChartData": { "skills": [], "candidateScores": [], "industryAverages": [] },
  "overallAssessment": {
    "competitivePosition": "below_average",
    "topStrengths": [],
    "criticalGaps": [],
    "marketRelevanceScore": 60
  },
  "industryInsights": {},
  "careerPathId": null,
  "error": null
}
```

- `careerPathId` is always `null` for guests — there is no career path until they sign up.
- `error` carries a message when the resume had no experience, certifications or projects to analyse.
- `targetRole` is often a full sentence, not a short job title. Clamp it in the UI.
- `competitivePosition` is snake_case: `below_average`, `average`, `above_average`, `excellent`.

---

## 5. Rebuilt resume

```
GET /api/guest/my-resume          (x-guest-token)
```

The AI-rebuilt resume. Identical shape to the logged-in `/resume-builders/my-resume`.

**Response — 200 (trimmed)**

```json
{
  "_id": null,
  "sessionId": "b8c8fd61-…",
  "tailored": false,
  "improved": false,
  "resumeData": {
    "personalInfo": {},
    "summary": "…",
    "experience": [],
    "education": [],
    "skills": {},
    "certifications": [],
    "projects": [],
    "achievements": [],
    "activities": []
  }
}
```

---

## 6. Job matches

```
GET /api/guest/jobs          (x-guest-token)
```

Job matching starts **after** the analysis finishes and has its own status. Render the results page
immediately and poll this every ~5 seconds until `ready`.

**Response — 200 (trimmed)**

```json
{
  "status": "ready",
  "jobs": [
    {
      "jobId": "LTV0clAyVkZqZVBkcWNHQ0FBQUFBQT09…",
      "jobTitle": "Back End Developer",
      "employerName": "Ubique Systems",
      "employerLogo": "https://…",
      "jobLocation": "Kolkata, West Bengal, India",
      "jobEmploymentType": "Full-time",
      "jobIsRemote": false,
      "jobApplyLink": "https://…",
      "jobDescription": "…first 400 characters…",
      "analysis": {
        "matchScore": 72,
        "matchPercentage": "72%",
        "reasoning": "Strong Node.js backend focus…",
        "keyMatchingSkills": ["Node.js", "RESTful APIs", "AWS EC2"],
        "skillGaps": ["Express.js", "Kubernetes/Docker"]
      }
    }
  ]
}
```

`status` is one of `processing` | `ready` | `failed`.

- Up to 8 jobs, already sorted by `analysis.matchScore` descending.
- `analysis` can be `null` for a job the matcher skipped — guard before reading `matchScore`.
- `jobDescription` is truncated to 400 characters; the full text is not available to guests.
- `status: "failed"` or an empty array means hide the section — it is not an error worth surfacing.

---

## 7. Claim the session

```
POST /api/guest/claim          (Bearer token)
```

Run this once, immediately after any successful sign-up or log-in, while a `guestToken` is still in
storage. It moves the analysis, skill gap and rebuilt resume onto the account and marks the profile
complete.

**Request — `application/json`**

```json
{
  "guestToken": "6f1378fa-5801-42f6-9bf4-831c26e112e8",
  "choice": "replace"
}
```

`choice` is optional: `"replace"` | `"keep"`.

**Response — 200 · three possible outcomes**

| Response | Meaning | What to do |
|---|---|---|
| `{ requiresChoice: false, claimed: true }` | New account, data saved | Clear the guest token, invalidate cached queries, go to the dashboard |
| `{ requiresChoice: true, claimed: false }` | This account already has a resume. **Nothing was written** and the session is still alive. | Show a blocking dialog, then call again with `choice` |
| `{ requiresChoice: false, claimed: false }` | User chose `keep` — guest data discarded | Clear the guest token, continue as normal |

> **Only clear the guest token on a 410.** Any other failure — a network blip, a token refresh race — may
> be temporary, and that token is the only handle on the user's analysis. Clearing it on a generic error
> silently destroys their results.

**The choice dialog** only appears when the email already had an account. It must block the dashboard —
until it is answered you would be showing the account's old resume while the user is still expecting the
one they uploaded a minute ago.

- `choice: "replace"` — the guest analysis becomes their newest; older analyses stay in history.
- `choice: "keep"` — guest data is thrown away, the existing resume is untouched.

**Errors**

| Code | Name | When |
|---|---|---|
| 401 | `UNAUTHORIZED_ERROR` | No or invalid bearer token |
| 422 | `VALIDATION_ERROR` | `guestToken` missing, or `choice` is not `replace`/`keep` |
| 409 | `GUEST_ANALYSIS_PENDING` | Analysis is not finished yet — wait for `completed` before claiming |
| 410 | `GUEST_SESSION_EXPIRED` | Session gone. Clear the token and continue into normal onboarding. |

---

## Errors you will actually hit

Shared across the guest read endpoints (steps 3–6).

| Code | Name | Cause | Suggested handling |
|---|---|---|---|
| 422 | `VALIDATION_ERROR` | No `x-guest-token` sent | Bug in your client — the header was dropped |
| 409 | `GUEST_ANALYSIS_PENDING` | Called before that part was ready | Keep showing the progress state, do not treat as an error |
| 422 | `GUEST_ANALYSIS_FAILED` | The AI pipeline failed | Show `message` and offer a re-upload |
| 410 | `GUEST_SESSION_EXPIRED` | Unknown or expired token | "This session has expired" + re-upload button |
| 429 | — | Upload rate limit | Show the plain-text message from the response body |

> **409 and 410 are not the same thing.** 409 means "not ready yet, keep waiting"; 410 means "gone, start
> over". Collapsing both into one "session expired" screen tells users their work is lost when it is
> actually still being processed.

---

## Limits and lifetime

| Rule | Value | Notes |
|---|---|---|
| File size | 5 MB | Rejected before the file reaches the AI service |
| File types | PDF · DOC · DOCX | Checked against real file bytes, not the browser's mimetype |
| Uploads per IP | 5 / hour | Failed attempts count toward the limit |
| Session lifetime | 48 hours | Refreshed on each write; configurable via `GUEST_TTL_SECONDS` |
| Analyses per token | 1 | A new upload always mints a new token |
| AI stage timeout | 5 minutes | Each stage separately; then status becomes `failed` |

---

## Client checklist

- Store `guestToken` and `sessionId` together, keyed per origin — localStorage is per port, so a token
  saved on `:5173` is invisible on `:5174`.
- Send `x-guest-token` on guest reads and **never** an `Authorization` header alongside it.
- Once the user is signed in, stop using the guest endpoints — their data lives in the normal ones from
  the moment the claim succeeds.
- Stop polling on terminal states. Both pollers have one: `completed`/`failed` for status,
  `ready`/`failed` for jobs.
- Call claim from one shared place that runs after any auth path — email, OTP, Google, LinkedIn,
  Microsoft, Apple, passkey — rather than wiring it into each.
- Invalidate cached resume, skill-gap and profile queries after a successful claim, or the dashboard will
  serve pre-claim data.

---

All endpoints live under `/api/guest`. Sign-up and log-in endpoints are unchanged — this flow adds to
them rather than replacing anything.
