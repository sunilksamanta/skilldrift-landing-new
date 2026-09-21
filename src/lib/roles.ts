// lib/roles.ts
//
// Content for the /skills/<role> pages. One object per role.
// To add a role later: add one object here. The page, the hub, the sitemap entry and the
// structured data all read from this list. No other file changes.
//
// `live: false` keeps a role out of the build, the hub and the sitemap until it is switched on.

export type Skill = { name: string; why: string };
export type SkillGroup = { heading: string; kind: 'technical' | 'human'; skills: Skill[] };
export type Faq = { q: string; a: string };
export type RelatedLink = { href: string; label: string };

export type Role = {
  slug: string;
  live: boolean;
  role: string; // "software engineer"
  roleTitle: string; // "Software Engineer"
  title: string; // <title>
  description: string; // meta description
  h1: string;
  answer: string; // first paragraph, answers the search question directly
  intro: string;
  groups: SkillGroup[];
  decidesHeading: string;
  decides: { heading: string; body: string }[];
  resume: { before: string; after: string; note: string };
  variants: { heading: string; body: string };
  faqs: Faq[];
  related: RelatedLink[];
};

const BLOG = 'https://blog.skilldrift.ai/posts/';

export const ROLES: Role[] = [
  {
    slug: 'software-engineer',
    live: true,
    role: 'software engineer',
    roleTitle: 'Software Engineer',
    title: 'Skills Needed for a Software Engineer in 2026 | SkillDrift',
    description:
      'The skills a software engineer needs in 2026, which ones decide the offer, and how to check your own resume against a real software engineering job.',
    h1: 'Skills needed for a software engineer in 2026',
    answer:
      'A software engineer needs one or two programming languages used to a professional standard, the tools of modern delivery such as version control, testing and cloud deployment, system design, and the human skills of working in a team. The weight of each changes with the role and the seniority.',
    intro:
      'Most engineers who reach an interview have the core list. What separates them is usually further down it, and in how clearly the resume shows it.',
    groups: [
      {
        heading: 'Technical skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'One or two languages in depth', why: 'Python, Java, JavaScript or TypeScript, Go and C# cover most postings. Depth in one beats a long list.' },
          { name: 'Data structures and algorithms', why: 'Still tested in most interviews and still used in daily work.' },
          { name: 'Version control and code review', why: 'Git, pull requests, and changes someone else can read.' },
          { name: 'Testing', why: 'Unit and integration tests, and knowing what is worth testing.' },
          { name: 'Cloud and deployment', why: 'One cloud platform, containers, and how code reaches production.' },
          { name: 'Databases', why: 'SQL first, then one non relational store and when to use it.' },
          { name: 'System design', why: 'How services talk, fail and scale. It grows with seniority.' },
          { name: 'Working with AI tools', why: 'Using assistants to write, review and test code, and knowing when they are wrong.' },
        ],
      },
      {
        heading: 'Human skills that postings ask for',
        kind: 'human',
        skills: [
          { name: 'Written communication', why: 'Clear tickets, design notes, review comments and incident write ups.' },
          { name: 'Ownership', why: 'Taking something from an idea to production and keeping it running.' },
          { name: 'Collaboration', why: 'Working with product, design and other engineers without friction.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Communication', body: 'In the SkillDrift Jobs Index, communication is still one of the most requested skills across job postings. For engineers it means review comments that teach and design notes a new joiner can follow.' },
      { heading: 'Ownership, idea to production', body: 'A posting that says end to end is asking whether you have shipped something and kept it running. Many engineers have done this and describe it as worked on the backend.' },
      { heading: 'Working with AI', body: 'Postings now ask for engineers who can direct AI tools, check their output and stay accountable for the result.' },
    ],
    resume: {
      before: 'Developed backend services in Java.',
      after: 'Designed and ran a payments service in Java, including alerting, runbooks and on call.',
      note: 'The same work, but the second line shows system design, observability, documentation and ownership. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Software developer or software engineer?',
      body: 'In most postings the two titles mean the same job. Where they differ, the engineer title leans more on system design, reliability and scale, and the developer title on building features inside an existing system. Choose your skills by the posting you want, not by the title.',
    },
    faqs: [
      { q: 'What skills are needed for a software engineer?', a: 'One or two programming languages in depth, version control, testing, cloud and deployment, databases, system design, working with AI tools, and written communication. The mix depends on the role and the seniority.' },
      { q: 'What are the software developer required skills for a first job?', a: 'One language used well, data structures and algorithms, Git, basic testing and SQL. Show one project you built and ran from start to finish.' },
      { q: 'Which skill most often costs a software engineer the offer?', a: 'Rarely the language. More often it is communication, ownership or system design that the resume does not show and the interview then tests.' },
      { q: 'How do I check my skills against a software engineering job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}the-new-way-of-work-for-developers-its-time-to-accept-ai`, label: 'The new way of work for developers' },
      { href: `${BLOG}the-agentic-ai-era-coding-the-developers-digital-twin`, label: 'What agentic AI means for developers' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'sales-executive',
    live: true,
    role: 'sales executive',
    roleTitle: 'Sales Executive',
    title: 'Sales Executive Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The skills a sales executive needs in 2026, from prospecting to forecasting, how the list changes for sales associates and sales managers, and how to check your own gap.',
    h1: 'Sales executive skills in 2026',
    answer:
      'A sales executive needs to find and qualify buyers, run a conversation that uncovers a real need, handle objections and negotiate, manage a pipeline in a CRM, and follow up and forecast accurately. On top of that sits product knowledge, which every employer expects you to learn fast.',
    intro:
      'Almost every sales resume says exceeded targets. That shows one skill, closing, and hides the rest of how the result was made.',
    groups: [
      {
        heading: 'Selling skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Prospecting', why: 'Finding the right accounts and people by phone, email, social channels and referrals.' },
          { name: 'Qualification', why: 'Deciding quickly whether a lead has a real need, a budget and a timeline.' },
          { name: 'CRM and pipeline management', why: 'Keeping records current so the team can trust the numbers.' },
          { name: 'Forecasting', why: 'Saying what will close this month, and being right.' },
          { name: 'Negotiation and closing', why: 'Agreeing terms that both sides will keep.' },
        ],
      },
      {
        heading: 'Human skills that decide deals',
        kind: 'human',
        skills: [
          { name: 'Discovery', why: 'Asking questions that get to the actual problem, then listening.' },
          { name: 'Objection handling', why: 'Treating an objection as information rather than a rejection.' },
          { name: 'Written follow up', why: 'Emails and proposals a buyer can forward to their own manager.' },
          { name: 'Resilience', why: 'Recovering from a lost deal the same afternoon.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Discovery', body: 'Interviews often include a short role play. Candidates who pitch in the first minute tend to lose. Candidates who ask three good questions first tend to win.' },
      { heading: 'Forecast honesty', body: 'A manager who has been let down by optimistic pipelines wants to hear how you decided what would close, and what you did when a deal slipped.' },
      { heading: 'Written communication', body: 'In the SkillDrift Jobs Index, communication is still one of the most requested skills across postings. In sales a large part of it is written.' },
    ],
    resume: {
      before: 'Achieved 120 percent of annual quota.',
      after: 'Built a new mid market territory from zero to a full pipeline in two quarters, then reached 120 percent of quota.',
      note: 'The first line shows closing. The second shows prospecting, pipeline building and closing, with the same result.',
    },
    variants: {
      heading: 'Sales associate, sales executive and sales manager skills',
      body: 'A sales associate role leans on product knowledge, customer service and a high volume of conversations. A sales executive role covers the full cycle with a personal target. A sales manager role adds coaching, hiring, territory planning and team forecasting. Coaching is the skill that most often separates a strong seller from a strong manager.',
    },
    faqs: [
      { q: 'What skills does a sales executive need?', a: 'Prospecting, qualification, discovery, objection handling, negotiation and closing, CRM and pipeline management, forecasting, and clear written follow up.' },
      { q: 'What are the most important sales associate skills?', a: 'Product knowledge, customer service, handling many conversations well, and basic CRM use.' },
      { q: 'What skills does a sales manager need that a sales executive does not?', a: 'Coaching, hiring, territory planning and forecasting for a whole team.' },
      { q: 'How do I check my skills against a sales job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}stop-applying-for-jobs-youre-100-qualified-for`, label: 'Why the best next role is one you are not fully qualified for yet' },
      { href: `${BLOG}the-silent-skill-gap-what-you-dont-know-is-costing-you-your-next-promotion`, label: 'The silent skill gap' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'human-resources',
    live: true,
    role: 'HR professional',
    roleTitle: 'HR',
    title: 'HR Skills: What HR Roles Ask For in 2026, and for Your Resume | SkillDrift',
    description:
      'The HR skills employers ask for in 2026, the ones to put on your resume, how the list changes for an HR manager, and how to check your own gap against a real HR job.',
    h1: 'HR skills in 2026',
    answer:
      'An HR professional needs employment law and policy knowledge, recruitment and onboarding, employee relations, HR systems and data, and the human skills of confidentiality, judgment and clear communication. An HR manager adds workforce planning, performance management and advising leaders.',
    intro:
      'HR resumes often list duties rather than outcomes. The skills are there, but a screening system and a hiring manager cannot see them.',
    groups: [
      {
        heading: 'HR skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Employment law and policy', why: 'Knowing the rules where you work and turning them into clear policy.' },
          { name: 'Recruitment and onboarding', why: 'Running a hiring process end to end and getting new joiners productive.' },
          { name: 'HR systems', why: 'Using an HRIS well, and keeping records accurate.' },
          { name: 'People data', why: 'Reading attrition, hiring and engagement numbers, often in Excel or a dashboard.' },
          { name: 'Performance management', why: 'Setting up reviews and helping managers run them fairly.' },
          { name: 'Payroll and benefits basics', why: 'Understanding how pay and benefits work, even when another team runs them.' },
        ],
      },
      {
        heading: 'Human skills that HR roles depend on',
        kind: 'human',
        skills: [
          { name: 'Employee relations', why: 'Handling grievances and difficult conversations calmly and fairly.' },
          { name: 'Confidentiality and judgment', why: 'Knowing what to share, with whom, and when.' },
          { name: 'Communication', why: 'Writing policy people understand and explaining decisions clearly.' },
          { name: 'Stakeholder management', why: 'Advising managers and leaders who do not report to you.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'People data', body: 'More HR postings ask for someone who can turn attrition or hiring numbers into a decision. Many HR professionals do this and never write it down.' },
      { heading: 'Advising leaders', body: 'Especially for HR manager roles, the question is whether you can change a leader’s mind with evidence and tact.' },
      { heading: 'Employee relations', body: 'Interviewers often ask for a difficult case. A clear, fair and confidential answer carries a lot of weight.' },
    ],
    resume: {
      before: 'Responsible for recruitment and onboarding.',
      after: 'Ran hiring for 40 roles a year across three teams and cut time to productivity for new joiners with a structured first month plan.',
      note: 'The second line shows recruitment, onboarding design and a measured result. Use your own real numbers.',
    },
    variants: {
      heading: 'HR executive, HR generalist and HR manager skills',
      body: 'An HR executive or generalist role is broad: recruitment, records, policy and employee questions. An HR manager role adds workforce planning, performance management, employee relations cases and advising senior leaders. Qualifications such as a recognised HR certification help, but most postings weigh evidence of the work more.',
    },
    faqs: [
      { q: 'What are the most important HR skills?', a: 'Employment law and policy, recruitment and onboarding, employee relations, HR systems and people data, plus confidentiality, judgment and clear communication.' },
      { q: 'What HR skills should I put on my resume?', a: 'The ones the posting names, written as work you did with a result. Recruitment, onboarding, employee relations, HRIS and people data are the most common.' },
      { q: 'What skills does an HR manager need?', a: 'Everything an HR generalist does, plus workforce planning, performance management, handling complex cases and advising leaders.' },
      { q: 'How do I check my skills against an HR job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}the-loyalty-tax-why-staying-put-without-internal-mobility-can-cost-you`, label: 'The loyalty tax and internal mobility' },
      { href: `${BLOG}what-is-a-skill-gap-analysis-and-how-to-run-one-on-yourself`, label: 'How to run a skill gap analysis on yourself' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'product-manager',
    live: true,
    role: 'product manager',
    roleTitle: 'Product Manager',
    title: 'Product Manager Skills: What the Role Requires in 2026 | SkillDrift',
    description:
      'The skills required for a product manager in 2026, which ones decide the offer, and how to check your own resume against a real product management job.',
    h1: 'Product manager skills in 2026',
    answer:
      'A product manager needs to understand users, decide what to build and in what order, work with engineering and design to ship it, and measure whether it worked. That takes discovery, prioritisation, clear writing, data skills and the ability to lead people who do not report to you.',
    intro:
      'Product management is hard to show on a resume because the work is shared. The skill is in the decisions, and those rarely make it onto the page.',
    groups: [
      {
        heading: 'Product skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'User research and discovery', why: 'Finding the real problem before building a solution.' },
          { name: 'Prioritisation', why: 'Choosing what to build first, and explaining why.' },
          { name: 'Roadmapping', why: 'Turning strategy into a plan the team can follow.' },
          { name: 'Product analytics', why: 'Defining success metrics and reading the data, often with SQL or an analytics tool.' },
          { name: 'Technical understanding', why: 'Enough to discuss trade offs with engineers, not to write the code.' },
          { name: 'Working with AI features', why: 'Knowing what AI can and cannot do inside a product.' },
        ],
      },
      {
        heading: 'Human skills product roles depend on',
        kind: 'human',
        skills: [
          { name: 'Written communication', why: 'Specs, decision notes and updates people actually read.' },
          { name: 'Stakeholder management', why: 'Aligning leaders, sales, support and engineering.' },
          { name: 'Leading without authority', why: 'Getting a team to commit when nobody reports to you.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Prioritisation you can explain', body: 'Interviewers often ask what you said no to, and why. A clear answer shows judgment more than any list of features.' },
      { heading: 'Measuring outcomes', body: 'Postings ask for product managers who define a metric before building and check it after. Show one example with a real number.' },
      { heading: 'Clear writing', body: 'Much of the job is written. A short, clear decision note is one of the strongest signals a candidate can give.' },
    ],
    resume: {
      before: 'Managed the mobile app roadmap.',
      after: 'Owned the mobile app roadmap, cut three low value features after user interviews, and shipped a new onboarding flow that raised week one retention.',
      note: 'The second line shows discovery, prioritisation and an outcome. Use your own real result.',
    },
    variants: {
      heading: 'Associate product manager or product manager?',
      body: 'An associate product manager role focuses on execution: writing specs, running a backlog and learning discovery. A product manager owns outcomes for an area. A senior product manager adds strategy and influence across teams. The skills are the same, the scope and the evidence grow.',
    },
    faqs: [
      { q: 'What skills are required for a product manager?', a: 'User research and discovery, prioritisation, roadmapping, product analytics, enough technical understanding to discuss trade offs, clear writing and stakeholder management.' },
      { q: 'Does a product manager need to code?', a: 'Usually no. They need to understand technical trade offs well enough to make good decisions with engineers.' },
      { q: 'What skills are needed for product management as a first role?', a: 'Clear writing, basic analytics, curiosity about users, and evidence of shipping something with others, even outside a product job.' },
      { q: 'How do I check my skills against a product manager job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}the-rise-of-the-new-collar-worker-why-hybrid-skills-are-the-only-safe-bet-going-forward`, label: 'Why hybrid skills are the safer bet' },
      { href: `${BLOG}dont-start-with-learning-start-with-the-gap`, label: 'Start with the gap, not the course' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    // Data analyst is the largest demand in this family. Kept OFF until confirmed, because of the
    // standing rule on naming this role before 11 November 2026. Flip to true when approved.
    slug: 'data-analyst',
    live: true,
    role: 'data analyst',
    roleTitle: 'Data Analyst',
    title: 'Skills Needed for a Data Analyst in 2026 | SkillDrift',
    description:
      'The skills required for a data analyst in 2026, which ones decide the offer, and how to check your own resume against a real data analyst job.',
    h1: 'Skills needed for a data analyst in 2026',
    answer:
      'A data analyst needs SQL, a spreadsheet tool used well, one analysis language such as Python or R, a visualisation tool, and basic statistics. Just as important is turning a result into a clear recommendation for someone who is not an analyst.',
    intro:
      'The tool list is well known. The offer usually turns on whether the resume shows a decision that changed because of the analysis.',
    groups: [
      {
        heading: 'Technical skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'SQL', why: 'Joins, aggregations and window functions on real tables.' },
          { name: 'Excel or Google Sheets', why: 'Pivot tables, lookups and clean models.' },
          { name: 'Python or R', why: 'Cleaning data and repeatable analysis.' },
          { name: 'Visualisation', why: 'Power BI, Tableau or Looker, and charts that answer one question.' },
          { name: 'Statistics', why: 'Averages, distributions, and knowing when a difference is real.' },
        ],
      },
      {
        heading: 'Human skills that decide the job',
        kind: 'human',
        skills: [
          { name: 'Communication', why: 'Explaining a result to someone who will act on it.' },
          { name: 'Business understanding', why: 'Knowing which question actually matters.' },
          { name: 'Attention to detail', why: 'Catching the error before the meeting does.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Recommendations, not reports', body: 'Postings ask for analysts who say what to do next. Show one analysis that changed a decision.' },
      { heading: 'SQL under pressure', body: 'Many interviews include a live SQL exercise. Practise on real, messy data.' },
      { heading: 'Communication', body: 'In the SkillDrift Jobs Index, communication is still one of the most requested skills across postings.' },
    ],
    resume: {
      before: 'Created dashboards in Power BI.',
      after: 'Built a Power BI dashboard on SQL data that showed where returns were rising, which led the team to change one supplier.',
      note: 'The second line shows SQL, visualisation and a business result.',
    },
    variants: {
      heading: 'Data analyst or data scientist?',
      body: 'A data analyst answers business questions with existing data. A data scientist builds models and predictions. Many roles blend the two, so read the posting rather than the title.',
    },
    faqs: [
      { q: 'What skills are required for a data analyst?', a: 'SQL, Excel or Sheets, Python or R, a visualisation tool, basic statistics, and clear communication of results.' },
      { q: 'Do data analysts need to code?', a: 'Most roles expect SQL and many expect some Python or R.' },
      { q: 'What is the most important data analyst skill?', a: 'SQL is the most common requirement. Communication often decides the offer.' },
      { q: 'How do I check my skills against a data analyst job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}skills-needed-for-a-data-analyst-in-2026-and-how-to-tell-which-ones-you-are-missing`, label: 'Skills needed for a data analyst, and how to tell which ones you are missing' },
      { href: `${BLOG}beyond-the-dashboard-the-data-analyst-skills-that-actually-matter-in-2026`, label: 'Beyond the dashboard' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
];

export const LIVE_ROLES = ROLES.filter((r) => r.live);
export const getRole = (slug: string) => LIVE_ROLES.find((r) => r.slug === slug);
