// lib/roles.ts  (updated 20 October 2026: five more roles added)
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
  // ---- Added 28 September 2026: five new roles. Everything from here to the closing ]; is new. ----
  {
    slug: 'customer-service',
    live: true,
    role: 'customer service',
    roleTitle: 'Customer Service',
    title: 'Customer Service Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The customer service skills employers ask for in 2026, which ones decide the offer, how the list changes from representative to manager, and how to check your own gap.',
    h1: 'Customer service skills in 2026',
    answer:
      'Customer service roles ask for clear communication in speech and in writing, active listening, patient problem solving, product knowledge and confident use of a ticketing or CRM system. More roles now add live chat, several channels in one shift and working alongside AI assistants. Underneath all of it sits empathy: understanding what the customer actually needs, then solving it.',
    intro:
      'Almost every customer service resume says excellent communication skills. So does every other resume, which is why the line tells a hiring manager nothing about how you handle a difficult customer.',
    groups: [
      {
        heading: 'Service skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Ticketing and CRM systems', why: 'Zendesk, Freshdesk, Salesforce or similar. Logging every case so the next person can pick it up.' },
          { name: 'Multichannel support', why: 'Phone, email, live chat and social messages, often in the same shift.' },
          { name: 'Product knowledge', why: 'Knowing the product well enough to answer without escalating.' },
          { name: 'Troubleshooting', why: 'Finding the cause of a problem step by step, not only the symptom.' },
          { name: 'Service metrics', why: 'Knowing what first contact resolution, handling time and satisfaction scores measure, and how your work moves them.' },
        ],
      },
      {
        heading: 'Human skills that decide the conversation',
        kind: 'human',
        skills: [
          { name: 'Active listening', why: 'Hearing the real problem before offering an answer.' },
          { name: 'Empathy', why: 'Showing the customer you understand, without promising what you cannot deliver.' },
          { name: 'Calm under pressure', why: 'Handling an angry customer, then taking the next call as if it were the first.' },
          { name: 'Clear writing', why: 'Chat and email replies that solve the problem in one message.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Calming a difficult customer', body: 'Interviews often include a role play with an upset customer. Candidates who acknowledge the problem, ask one clear question and give a next step tend to do well. Candidates who argue or over promise tend not to.' },
      { heading: 'Solving it the first time', body: 'Employers track how often a problem is solved in the first contact. A candidate who can explain how they raised that rate, or kept it high, stands out.' },
      { heading: 'Written communication', body: 'In the SkillDrift Jobs Index, communication is among the most requested skills across all postings. In customer service much of it is written, in chat and email.' },
    ],
    resume: {
      before: 'Handled customer queries and complaints.',
      after: 'Resolved chat and email cases in Zendesk, kept satisfaction scores above the team target, and rewrote the three saved replies that caused the most follow up questions.',
      note: 'The same job, but the second line shows the system, the channels, a service metric and problem solving. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Customer service representative, associate and manager skills',
      body: 'A customer service associate or representative role leans on product knowledge, the ticketing system and a high volume of conversations. A senior or specialist role adds complex cases, escalations and training new joiners. A customer service manager role adds coaching, scheduling, quality reviews and reporting on service metrics. The step from agent to manager is usually decided by coaching and by reading the numbers, not by handling more calls.',
    },
    faqs: [
      { q: 'What skills do you need for customer service?', a: 'Clear spoken and written communication, active listening, empathy, product knowledge, troubleshooting, a ticketing or CRM system, and staying calm under pressure.' },
      { q: 'What should I put under skills on a customer service resume?', a: 'Name the system you used, the channels you covered and one service metric you moved. Then add two or three human skills, each backed by a line in your experience.' },
      { q: 'What skills does a customer service manager need?', a: 'Coaching, scheduling, quality review, handling escalations, and reporting on metrics such as satisfaction scores and first contact resolution.' },
      { q: 'How do I check my skills against a customer service job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}10-resume-mistakes-that-cost-you-interviews`, label: '10 resume mistakes that cost you interviews' },
      { href: `${BLOG}ai-isnt-taking-your-job-but-someone-using-ai-will-heres-how-to-be-that-person`, label: 'AI is not taking your job, but someone using AI will' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'marketing',
    live: true,
    role: 'marketing',
    roleTitle: 'Marketing',
    title: 'Marketing Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The marketing skills employers ask for in 2026, from content and SEO to analytics, which ones decide the offer, and how to check your own gap against a real job.',
    h1: 'Marketing skills in 2026',
    answer:
      'Marketing roles ask for a mix of craft and numbers: writing and content, digital channels such as search, social and email, a working knowledge of analytics, and a clear understanding of the customer. Many roles now add marketing automation and AI tools for content and research. What ties them together is choosing the right audience and message, then measuring whether it worked.',
    intro:
      'Most marketing resumes list channels and tools. Few show a result, and a hiring manager reads the result first.',
    groups: [
      {
        heading: 'Marketing skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Content and copywriting', why: 'Writing that makes one reader take one action, on any channel.' },
          { name: 'SEO and search', why: 'How people search, how pages rank, and how paid search differs from organic.' },
          { name: 'Social media and email', why: 'Planning, publishing and testing on the channels the audience actually uses.' },
          { name: 'Analytics', why: 'Google Analytics or similar, attribution, and reading a dashboard without guessing.' },
          { name: 'Marketing automation and CRM', why: 'HubSpot, Salesforce or similar. Segments, workflows and lead scoring.' },
        ],
      },
      {
        heading: 'Human skills that decide the campaign',
        kind: 'human',
        skills: [
          { name: 'Customer understanding', why: 'Knowing who the buyer is, what they worry about and what they search for.' },
          { name: 'Creativity with a brief', why: 'Fresh ideas that still answer the question the business asked.' },
          { name: 'Clear writing', why: 'Briefs, plans and reports that other teams can act on.' },
          { name: 'Working across teams', why: 'Getting sales, product and design to agree on one plan.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Proving results', body: 'Interviewers ask what changed because of your work. A campaign described by its reach loses to one described by the leads, signups or sales it produced.' },
      { heading: 'Testing and learning', body: 'Employers want marketers who run a test, read it honestly and change course. Show one test that did not work and what you did next.' },
      { heading: 'Using AI with judgment', body: 'Many teams now use AI tools for drafts and research. Interviewers want to know that you can use them and still judge what is good enough to publish.' },
    ],
    resume: {
      before: 'Managed social media accounts for the brand.',
      after: 'Planned and ran the brand Instagram and LinkedIn calendar, tested two new content formats a month, and grew inbound leads from social by a third in six months.',
      note: 'The second line shows planning, testing and a result a manager can check. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Marketing executive, digital marketing and marketing manager skills',
      body: 'A marketing executive or associate role leans on running channels and content day to day. A digital marketing role puts more weight on search, paid media, analytics and automation. A marketing manager role adds strategy, budget, a team and reporting to leadership. The step up is usually decided by owning a number, such as pipeline or revenue from marketing, rather than a list of activities.',
    },
    faqs: [
      { q: 'What are the most important marketing skills?', a: 'Content and copywriting, SEO and search, social media and email, analytics, marketing automation, customer understanding and clear writing.' },
      { q: 'What digital marketing skills do employers ask for?', a: 'Search, both organic and paid, social media, email, analytics and marketing automation, plus the ability to test a channel and report what it produced.' },
      { q: 'What skills does a marketing manager need?', a: 'Strategy, budget planning, leading a team, and reporting results in the terms leadership cares about, such as leads, pipeline and revenue.' },
      { q: 'How do I check my skills against a marketing job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}beyond-the-campaign-the-digital-marketing-skills-that-actually-matter-in-2026`, label: 'The digital marketing skills that actually matter in 2026' },
      { href: `${BLOG}the-rise-of-the-new-collar-worker-why-hybrid-skills-are-the-only-safe-bet-going-forward`, label: 'Why hybrid skills are the safer bet' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'business-analyst',
    live: true,
    role: 'business analyst',
    roleTitle: 'Business Analyst',
    title: 'Business Analyst Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The skills needed for a business analyst in 2026, from requirements to SQL, which ones decide the offer, and how to check your own resume against a real job.',
    h1: 'Business analyst skills in 2026',
    answer:
      'A business analyst needs to gather and write clear requirements, map how a process works today and how it should work, analyse data with SQL and spreadsheets, and turn all of it into a recommendation people can act on. Most roles also expect a working knowledge of agile delivery and the tools teams use to track it.',
    intro:
      'Many business analyst resumes list meetings and documents. The offer usually turns on whether the resume shows a change that happened because of the analysis.',
    groups: [
      {
        heading: 'Analysis skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Requirements gathering', why: 'Running workshops and interviews, then writing requirements and user stories a team can build from.' },
          { name: 'Process mapping', why: 'Drawing how work flows today and where it breaks, with BPMN or simple flowcharts.' },
          { name: 'SQL and spreadsheets', why: 'Pulling and checking the data yourself instead of waiting for someone else.' },
          { name: 'Data visualisation', why: 'Power BI, Tableau or similar, and one chart that answers one question.' },
          { name: 'Agile and delivery tools', why: 'Scrum, backlogs, and Jira or Azure DevOps.' },
        ],
      },
      {
        heading: 'Human skills that decide the project',
        kind: 'human',
        skills: [
          { name: 'Stakeholder management', why: 'Keeping people with different goals agreed on one outcome.' },
          { name: 'Asking the right questions', why: 'Finding the real problem behind the request.' },
          { name: 'Clear writing', why: 'Documents that a developer and a director can both follow.' },
          { name: 'Negotiation', why: 'Agreeing what is in scope, and what is not, before work starts.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'From analysis to recommendation', body: 'Employers want analysts who say what to do next. Show one piece of work that changed a decision, a process or a cost.' },
      { heading: 'Handling conflicting stakeholders', body: 'Interviewers often ask about two people who wanted different things. A clear account of how you reached agreement carries a lot of weight.' },
      { heading: 'Hands on data', body: 'Many business analyst roles now expect SQL. Being able to check a number yourself sets a candidate apart.' },
    ],
    resume: {
      before: 'Gathered requirements from stakeholders.',
      after: 'Ran six workshops with finance and operations, mapped the invoice approval process, and wrote the requirements that cut approval time from ten days to four.',
      note: 'The second line shows facilitation, process mapping, requirements writing and a result. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Business analyst, data analyst or product manager?',
      body: 'The three roles overlap. A business analyst works out what a process or system needs and writes it down for the people who build it. A data analyst answers questions with data. A product manager decides what gets built and why. Many business analysts move into product roles, and the skill that usually decides the move is owning the decision rather than documenting it.',
    },
    faqs: [
      { q: 'What skills are needed for a business analyst?', a: 'Requirements gathering, process mapping, SQL and spreadsheets, a visualisation tool, agile delivery, stakeholder management and clear writing.' },
      { q: 'Does a business analyst need technical skills?', a: 'Most roles expect SQL, spreadsheets and familiarity with delivery tools such as Jira. Coding beyond that is rarely required, but it helps in data heavy roles.' },
      { q: 'What is the difference between a business analyst and a data analyst?', a: 'A business analyst focuses on processes, requirements and change. A data analyst focuses on answering questions with data. Many roles blend the two.' },
      { q: 'How do I check my skills against a business analyst job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}what-is-a-skill-gap-analysis-and-how-to-run-one-on-yourself`, label: 'How to run a skill gap analysis on yourself' },
      { href: 'https://www.skilldrift.ai/skills/product-manager', label: 'Product manager skills in 2026' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'data-scientist',
    live: true,
    role: 'data scientist',
    roleTitle: 'Data Scientist',
    title: 'Data Scientist Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The skills needed for a data scientist in 2026, from Python and statistics to machine learning, which ones decide the offer, and how to check your own gap.',
    h1: 'Data scientist skills in 2026',
    answer:
      'A data scientist needs Python and SQL used to a professional standard, a firm grounding in statistics, machine learning from building a model to judging whether it works, and the ability to explain a result to the people who will act on it. Some roles now add work with large language models and putting models into production.',
    intro:
      'Most data science resumes list libraries and models. The offer usually turns on whether the resume shows a model that was used, and what changed because of it.',
    groups: [
      {
        heading: 'Technical skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Python', why: 'pandas, NumPy and scikit-learn at least. In the SkillDrift Jobs Index, Python passed communication in September 2026 as the most requested skill across all job postings.' },
          { name: 'SQL', why: 'Getting your own data from real tables, joins and window functions included.' },
          { name: 'Statistics and experiments', why: 'Distributions, hypothesis tests, and designing an A/B test that answers the question.' },
          { name: 'Machine learning', why: 'Choosing a model, validating it honestly and knowing when a simple one is enough.' },
          { name: 'Deployment', why: 'Getting a model out of a notebook: version control, cloud, and monitoring after launch.' },
        ],
      },
      {
        heading: 'Human skills that decide the job',
        kind: 'human',
        skills: [
          { name: 'Framing the problem', why: 'Turning a vague business question into one that data can answer.' },
          { name: 'Communication', why: 'Explaining what a model does, and does not do, to someone who is not a data scientist.' },
          { name: 'Business judgment', why: 'Knowing which result is worth acting on.' },
          { name: 'Curiosity', why: 'Checking the data that looks wrong before it reaches a decision.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Impact, not accuracy', body: 'Interviewers ask what happened after the model. A small model that changed a decision beats a complex one that never left the notebook.' },
      { heading: 'Statistics under questioning', body: 'Many interviews test statistics directly. Be ready to explain why a result is real, not only that it is significant.' },
      { heading: 'Explaining the result', body: 'In the SkillDrift Jobs Index, communication is still among the most requested skills across all postings. For a data scientist it decides whether the model gets used.' },
    ],
    resume: {
      before: 'Built machine learning models in Python.',
      after: 'Built a churn model in Python on two years of subscription data. The retention team used it to target offers, and kept more customers than with the previous rule based list.',
      note: 'The second line shows Python, the data, the model and a business result. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Data scientist, data analyst or machine learning engineer?',
      body: 'A data analyst answers business questions with existing data. A data scientist builds models and predictions and tests whether they hold. A machine learning engineer puts models into production and keeps them running. Many roles blend two of the three, so read the posting rather than the title.',
    },
    faqs: [
      { q: 'What skills are needed for a data scientist?', a: 'Python, SQL, statistics, machine learning, some knowledge of deployment, and the ability to frame a problem and explain the result.' },
      { q: 'Is a postgraduate degree required to become a data scientist?', a: 'Many postings ask for one, and many also accept equivalent experience. A portfolio with one model that was used in practice often carries as much weight.' },
      { q: 'What is the difference between a data scientist and a data analyst?', a: 'A data analyst answers questions with existing data. A data scientist builds models that predict or classify. Many roles blend the two.' },
      { q: 'How do I check my skills against a data scientist job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: 'https://www.skilldrift.ai/skills/data-analyst', label: 'Skills needed for a data analyst in 2026' },
      { href: `${BLOG}python-has-passed-communication-as-the-most-requested-skill-in-job-postings`, label: 'Python has passed communication as the most requested skill in job postings' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'accountant',
    live: true,
    role: 'accountant',
    roleTitle: 'Accountant',
    title: 'Accountant Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The skills an accountant needs in 2026, from reconciliations to reporting and accounting software, which ones decide the offer, and how to check your own gap.',
    h1: 'Accountant skills in 2026',
    answer:
      'An accountant needs a firm grasp of accounting standards, bookkeeping and reconciliations, financial reporting, tax and compliance, and confident use of accounting software and Excel. As more routine work is automated, employers put more weight on analysis, accuracy and explaining the numbers to people outside finance.',
    intro:
      'Most accountant resumes list duties such as the month end close. The offer usually turns on whether the resume shows the accuracy, speed or saving that came from doing them well.',
    groups: [
      {
        heading: 'Accounting skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Accounting standards', why: 'IFRS, US GAAP or the local standard, and applying them to real transactions.' },
          { name: 'Bookkeeping and reconciliations', why: 'Ledgers, bank and account reconciliations, and clearing differences before month end.' },
          { name: 'Financial reporting', why: 'Preparing statements and management reports that stand up to review.' },
          { name: 'Tax and compliance', why: 'Returns, indirect taxes and the filing calendar for the country you work in.' },
          { name: 'Accounting software and Excel', why: 'QuickBooks, Xero, SAP, Oracle or Tally, plus lookups, pivot tables and clean models in Excel.' },
        ],
      },
      {
        heading: 'Human skills that decide the job',
        kind: 'human',
        skills: [
          { name: 'Attention to detail', why: 'Finding the error before an auditor does.' },
          { name: 'Integrity', why: 'Saying no to a number that is not right, even under pressure.' },
          { name: 'Explaining numbers', why: 'Telling a manager what the figures mean in plain language.' },
          { name: 'Deadline discipline', why: 'Closing the month on time, every month.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Analysis, not only processing', body: 'Software now handles much of the data entry. Interviewers look for accountants who can explain why a number moved and what to do about it.' },
      { heading: 'Improving the process', body: 'A candidate who shortened the close or automated a reconciliation shows more than one who only ran it.' },
      { heading: 'Clear communication', body: 'In the SkillDrift Jobs Index, communication is among the most requested skills across all postings. For an accountant it means reports and explanations that people outside finance can follow.' },
    ],
    resume: {
      before: 'Responsible for month end closing and reconciliations.',
      after: 'Ran the month end close for three entities in Xero, and cut it from eight working days to five by automating the bank reconciliations.',
      note: 'The second line shows the software, the scope, a process improvement and a result. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Staff accountant, accountant and senior accountant skills',
      body: 'A junior or staff accountant role leans on bookkeeping, reconciliations and accuracy. An accountant role adds reporting, tax and more of the close. A senior accountant or finance manager role adds review, analysis, audits and guiding junior staff. The step up is usually decided by analysis and by explaining the numbers, not by processing more of them.',
    },
    faqs: [
      { q: 'What skills does an accountant need?', a: 'Accounting standards, bookkeeping and reconciliations, financial reporting, tax and compliance, accounting software and Excel, and attention to detail.' },
      { q: 'What accounting skills should I put on my resume?', a: 'Name the standards, the software and the processes you ran, then show one result such as a faster close or a clean audit.' },
      { q: 'Will automation replace accountants?', a: 'Automation is taking over much of the routine data entry. The work that remains is analysis, judgment and explaining the numbers, and that is where an accountant can show the most value.' },
      { q: 'How do I check my skills against an accountant job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}the-invisible-career-killer-are-you-suffering-from-skill-decay`, label: 'Are you suffering from skill decay?' },
      { href: `${BLOG}the-rise-of-micro-credentials-how-to-leverage-them-for-rapid-promotion`, label: 'How to use micro credentials for a faster promotion' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  // ---- Added 20 October 2026: five new roles. Everything from here to the closing ]; is new. ----
  {
    slug: 'data-engineer',
    live: true,
    role: 'data engineer',
    roleTitle: 'Data Engineer',
    title: 'Data Engineer Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The skills a data engineer needs in 2026, from SQL and Python to pipelines, Spark and cloud platforms, which ones decide the offer, and how to check your own gap.',
    h1: 'Data engineer skills in 2026',
    answer:
      'A data engineer needs SQL and Python used to a professional standard, the ability to build and run ETL and data pipelines, a distributed processing tool such as Apache Spark, one cloud data platform, data modelling, and an orchestration tool to schedule and monitor the work. Around those sit the human skills of clear communication with the analysts and data scientists who use the data, and ownership when a pipeline fails.',
    intro:
      'Most data engineering resumes list tools. The offer usually turns on whether the resume shows data that arrived on time, stayed correct and was used by someone.',
    groups: [
      {
        heading: 'Technical skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'SQL', why: 'Complex joins, window functions and query tuning on large tables.' },
          { name: 'Python', why: 'Pipeline code that is tested, readable and safe to run again.' },
          { name: 'ETL and data pipelines', why: 'Moving data from source systems into a warehouse or lake, in batches or as a stream, and handling late or bad records.' },
          { name: 'Apache Spark', why: 'Processing data too large for one machine, and knowing how partitions and joins affect speed and cost.' },
          { name: 'Cloud data platforms', why: 'One of AWS, Azure or Google Cloud, plus a warehouse such as Snowflake, BigQuery, Redshift or Databricks.' },
          { name: 'Data modelling', why: 'Designing tables and schemas, such as a star schema, that analysts can query without help.' },
          { name: 'Orchestration', why: 'Airflow, Dagster or a similar tool to schedule jobs, manage dependencies and retry failures.' },
          { name: 'Data quality and testing', why: 'Checks that catch missing, duplicated or wrong data before anyone reports on it.' },
        ],
      },
      {
        heading: 'Human skills that decide the job',
        kind: 'human',
        skills: [
          { name: 'Communication', why: 'Agreeing with analysts and data scientists what the data means and when it will arrive.' },
          { name: 'Ownership', why: 'Fixing a failed pipeline quickly and writing down what caused it.' },
          { name: 'Attention to detail', why: 'Noticing when a number looks wrong before it reaches a report.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Reliability you can show', body: 'Interviewers often ask about a pipeline that broke. A clear account of how you found the cause, fixed it and stopped it from happening again carries a lot of weight.' },
      { heading: 'Data modelling', body: 'Many interviews include a design exercise. Candidates who ask how the data will be used before they draw any tables tend to do well.' },
      { heading: 'Cost and performance', body: 'Cloud processing is billed by use. Employers value engineers who can make a slow or expensive job faster and cheaper, and explain how they did it.' },
    ],
    resume: {
      before: 'Built ETL pipelines using Spark and Airflow.',
      after: 'Built and ran Spark pipelines in Airflow that load sales data into Snowflake each morning, added data quality checks, and halved the nightly run time.',
      note: 'The second line shows the tools, the platform, data quality and a result. Use your own real numbers. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Data engineer, data analyst or data scientist?',
      body: 'A data engineer builds and runs the systems that collect, clean and store data. A data analyst uses that data to answer business questions. A data scientist builds models that predict or classify. An analytics engineer works between engineering and analysis, and focuses on data modelling inside the warehouse. Many roles blend two of these, so read the posting to see which mix the employer wants.',
    },
    faqs: [
      { q: 'What skills are needed for a data engineer?', a: 'SQL, Python, ETL and data pipelines, Apache Spark, a cloud data platform, data modelling, an orchestration tool such as Airflow, data quality checks, and clear communication with the people who use the data.' },
      { q: 'Does a data engineer need to know Python?', a: 'Most roles expect Python, and some accept Scala or Java. SQL is expected in nearly every data engineering role.' },
      { q: 'What skills does a data engineer need for a first job?', a: 'SQL and Python used well, one cloud platform, and one project that moves data from a source into a database on a schedule. Show that the project ran more than once and that you checked the data it produced.' },
      { q: 'How do I check my skills against a data engineer job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: 'https://www.skilldrift.ai/skills/in-demand/data-ai-jobs', label: 'Skills employers ask for in data and AI jobs' },
      { href: 'https://www.skilldrift.ai/skills/data-scientist', label: 'Data scientist skills in 2026' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'teacher',
    live: true,
    role: 'teacher',
    roleTitle: 'Teacher',
    title: 'Teacher Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The skills a teacher needs in 2026, from lesson planning to classroom management and assessment, which ones decide the offer, and how to check your own gap.',
    h1: 'Teacher skills in 2026',
    answer:
      'A teacher needs strong knowledge of their subject, the ability to plan lessons that build on each other, classroom management, assessment that shows what each student has learned, and differentiation so that students at different levels can all make progress. Schools also ask for confident use of education technology and clear communication with parents and colleagues. Patience and care for students matter in every part of the job.',
    intro:
      'Most teaching resumes list the subjects and age groups taught. The offer usually turns on whether the resume shows how students progressed, and how the teacher knew.',
    groups: [
      {
        heading: 'Teaching skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Subject knowledge', why: 'Knowing the subject well enough to explain it in more than one way and to answer unexpected questions.' },
          { name: 'Lesson planning', why: 'Lessons with a clear goal, in a sequence that builds over a term.' },
          { name: 'Classroom management', why: 'Setting routines and expectations so that the class can focus on learning.' },
          { name: 'Assessment', why: 'Using quizzes, tasks and questions to check understanding, then changing the next lesson based on what you find.' },
          { name: 'Differentiation', why: 'Adapting tasks and support so that students at different levels, including students with additional needs, can all make progress.' },
          { name: 'Education technology', why: 'A learning management system, presentation tools and online resources, and running a lesson online when needed.' },
        ],
      },
      {
        heading: 'Human skills that decide the classroom',
        kind: 'human',
        skills: [
          { name: 'Communication with parents', why: 'Explaining progress and concerns clearly and respectfully, in meetings and in writing.' },
          { name: 'Patience', why: 'Explaining an idea again, in a new way, for a student who has not understood it yet.' },
          { name: 'Working with colleagues', why: 'Sharing plans and resources, and agreeing assessment standards with other teachers.' },
          { name: 'Reflection', why: 'Reviewing what worked in a lesson and changing the next one.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Classroom management in practice', body: 'Interviews often include a demonstration lesson or a question about behaviour. A calm, specific answer about routines and follow up carries more weight than general principles.' },
      { heading: 'Evidence of progress', body: 'Schools want teachers who can show how they know students are learning. Describe one way you tracked progress and what you changed as a result.' },
      { heading: 'Meeting different needs', body: 'Interviewers often ask how you would support a student who is far ahead of the class or far behind it. A concrete example of differentiation stands out.' },
    ],
    resume: {
      before: 'Taught mathematics to students aged 12 to 14.',
      after: 'Planned and taught mathematics to three classes aged 12 to 14, used short weekly quizzes to find gaps, and regrouped students for targeted practice, which raised end of term results in all three classes.',
      note: 'The second line shows planning, assessment, differentiation and a result. Use your own real results. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Teaching assistant, teacher and head of department skills',
      body: 'A teaching assistant role leans on supporting individual students and small groups, and on following the plan of the lead teacher. A teacher role adds lesson planning, assessment and full responsibility for a class. A head of department or lead teacher role adds planning the curriculum for a subject, guiding other teachers and reviewing results. The step up is usually decided by evidence that you improved results beyond your own classes.',
    },
    faqs: [
      { q: 'What skills does a teacher need?', a: 'Subject knowledge, lesson planning, classroom management, assessment, differentiation, education technology, clear communication with parents and colleagues, and patience.' },
      { q: 'What teacher skills should I put on my resume?', a: 'Name the subjects and age groups you taught, the assessment and technology tools you used, and one result that shows students progressed. Add classroom management and communication, each backed by a line in your experience.' },
      { q: 'What skills help someone move into teaching from another career?', a: 'Subject knowledge from the previous job, experience of explaining ideas to others through training or mentoring, and organisation. Most schools also require a recognised teaching qualification for the place where they are based.' },
      { q: 'How do I check my skills against a teaching job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: 'https://www.skilldrift.ai/skills/in-demand/education-jobs', label: 'Skills employers ask for in education jobs' },
      { href: `${BLOG}what-is-a-skill-gap-analysis-and-how-to-run-one-on-yourself`, label: 'How to run a skill gap analysis on yourself' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'administrative-assistant',
    live: true,
    role: 'administrative assistant',
    roleTitle: 'Administrative Assistant',
    title: 'Administrative Assistant Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The skills an administrative assistant needs in 2026, from scheduling and office software to record keeping, which ones decide the offer, and how to check your own gap.',
    h1: 'Administrative assistant skills in 2026',
    answer:
      'An administrative assistant needs confident use of Microsoft Office or Google Workspace, scheduling and calendar management, clear written communication, accurate record keeping and strong organisation. Employers also look for discretion with confidential information, and the judgment to handle several requests at once in the right order.',
    intro:
      'Most administrative resumes describe the role as general office support. A hiring manager looks for the specific calendars, records and systems the candidate kept running.',
    groups: [
      {
        heading: 'Office skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Microsoft Office or Google Workspace', why: 'Word or Docs for letters and reports, Excel or Sheets for lists and simple tracking, and Outlook or Gmail for email.' },
          { name: 'Scheduling and calendar management', why: 'Booking meetings across several calendars and time zones, and handling changes without double booking.' },
          { name: 'Record keeping', why: 'Filing documents, invoices and contacts so that anyone on the team can find them.' },
          { name: 'Travel and event arrangements', why: 'Booking travel, rooms and catering within budget and company policy.' },
          { name: 'Data entry and basic bookkeeping', why: 'Entering data accurately, tracking expenses and preparing simple reports.' },
          { name: 'Collaboration tools', why: 'Shared drives, video calls, and tools such as Teams, Slack or a CRM.' },
        ],
      },
      {
        heading: 'Human skills that decide the job',
        kind: 'human',
        skills: [
          { name: 'Written communication', why: 'Clear, polite emails and messages on behalf of a manager or a team.' },
          { name: 'Organisation', why: 'Keeping track of many small tasks and deadlines at once.' },
          { name: 'Discretion', why: 'Handling confidential information, such as salaries or personal records, with care.' },
          { name: 'Prioritisation', why: 'Deciding which request to deal with first when several arrive at the same time.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Handling competing requests', body: 'Interviewers often ask what you did when two managers needed something at the same time. A clear account of how you decided, and how you told both people, carries a lot of weight.' },
      { heading: 'Accuracy', body: 'A wrong meeting time or a misfiled invoice causes problems later. Candidates who can describe how they check their own work stand out.' },
      { heading: 'Learning new tools', body: 'Offices change their software often. Employers value assistants who learn a new system quickly, including AI tools for drafting and note taking, and who help others use it.' },
    ],
    resume: {
      before: 'Provided administrative support to the management team.',
      after: 'Managed calendars and travel for four senior managers in Outlook, kept the contracts register current in SharePoint, and set up a shared request tracker that reduced repeat questions to the team.',
      note: 'The second line shows the software, the scope, record keeping and a process improvement. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Administrative assistant, executive assistant and office manager skills',
      body: 'An administrative assistant role supports a team with scheduling, records and correspondence. An executive assistant role supports one or two senior leaders closely, and adds managing their priorities, preparing meeting papers and handling sensitive matters. An office manager role adds suppliers, budgets, facilities and sometimes a small team. The step up is usually decided by judgment and by owning outcomes, such as an office move or an event that ran to plan.',
    },
    faqs: [
      { q: 'What skills does an administrative assistant need?', a: 'Microsoft Office or Google Workspace, scheduling and calendar management, written communication, record keeping, organisation, prioritisation and discretion.' },
      { q: 'What should I put under skills on an administrative assistant resume?', a: 'Name the software you use, the calendars and records you manage, and one process you improved. Add organisation and discretion, each backed by a line in your experience.' },
      { q: 'What is the difference between an administrative assistant and an executive assistant?', a: 'An administrative assistant usually supports a team. An executive assistant usually supports one or two senior leaders and handles more of their priorities and confidential work.' },
      { q: 'How do I check my skills against an administrative assistant job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: `${BLOG}10-resume-mistakes-that-cost-you-interviews`, label: '10 resume mistakes that cost you interviews' },
      { href: `${BLOG}what-is-a-skill-gap-analysis-and-how-to-run-one-on-yourself`, label: 'How to run a skill gap analysis on yourself' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'project-manager',
    live: true,
    role: 'project manager',
    roleTitle: 'Project Manager',
    title: 'Skills Required for a Project Manager in 2026 | SkillDrift',
    description:
      'The skills required for a project manager in 2026, from planning and risk to budgets and agile methods, which ones decide the offer, and how to check your own gap.',
    h1: 'Project manager skills in 2026',
    answer:
      'A project manager needs to plan and schedule work, manage risks and issues, control a budget, keep stakeholders informed and in agreement, and run the project with a suitable method, whether agile, waterfall or a mix of the two. Most roles also expect confident use of a project tool such as Jira, Asana or Microsoft Project, along with clear communication and the ability to lead a team.',
    intro:
      'Most project manager resumes list the projects delivered. The offer usually turns on whether the resume shows what was at risk, and how the project still finished on time and on budget.',
    groups: [
      {
        heading: 'Project skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Planning and scheduling', why: 'Breaking work into tasks, estimating it, and building a schedule with clear milestones and dependencies.' },
          { name: 'Risk and issue management', why: 'Spotting what could go wrong early, keeping a risk log, and acting while there is still time.' },
          { name: 'Budgeting and cost control', why: 'Building a project budget, tracking spend against it, and explaining any difference.' },
          { name: 'Agile and waterfall methods', why: 'Scrum or Kanban for work that changes often, a staged plan for work with fixed requirements, and knowing which one fits the project.' },
          { name: 'Project tools', why: 'Jira, Asana, Microsoft Project, Smartsheet or similar, kept current so that the plan matches the actual state of the work.' },
          { name: 'Scope and change control', why: 'Agreeing what is in the project, and handling requests to change it through a clear process.' },
        ],
      },
      {
        heading: 'Human skills that decide the project',
        kind: 'human',
        skills: [
          { name: 'Stakeholder management', why: 'Keeping sponsors, clients and teams informed and in agreement, especially when the news is bad.' },
          { name: 'Communication', why: 'Status reports, meeting notes and decisions that people can act on.' },
          { name: 'Leadership', why: 'Getting a team to commit to a plan, often when the team members do not report to you.' },
          { name: 'Problem solving', why: 'Finding a workable option when a deadline, a budget or a resource changes.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'Recovering a project', body: 'Interviewers often ask about a project that went off track. A clear account of what you noticed, what you changed and how the project finished carries a lot of weight.' },
      { heading: 'Raising problems early', body: 'Sponsors value project managers who raise a risk while there is still time to act. Show one example where an early warning changed the outcome.' },
      { heading: 'Choosing the method', body: 'Employers want project managers who can explain why a project used agile, waterfall or a mix. A reason based on the work itself is a strong answer.' },
    ],
    resume: {
      before: 'Managed IT projects from start to finish.',
      after: 'Led a 12 month system migration for three departments, kept a weekly risk log, brought a delayed data transfer back on schedule, and delivered within the agreed budget.',
      note: 'The second line shows scope, risk management, recovery and budget control. Use your own real figures. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Project coordinator, project manager and program manager skills',
      body: 'A project coordinator role supports the plan by scheduling meetings, tracking tasks and keeping documents current. A project manager role owns the plan, the budget, the risks and the result. A program manager role oversees several related projects, and adds tracking of benefits and managing senior stakeholders. A recognised project management certification helps in many postings, and evidence of projects delivered usually carries the most weight.',
    },
    faqs: [
      { q: 'What skills are required for a project manager?', a: 'Planning and scheduling, risk management, budgeting, scope control, agile and waterfall methods, a project tool, stakeholder management, communication and leadership.' },
      { q: 'Do I need a certification to become a project manager?', a: 'Many postings list a project management certification as preferred, and some require one. Evidence that you delivered real projects usually matters more, and a certification is strongest when it comes with that evidence.' },
      { q: 'What skills does a first time project manager need?', a: 'Organisation, clear communication, a working knowledge of one project tool, and evidence of coordinating work with others, even outside a formal project role.' },
      { q: 'How do I check my skills against a project manager job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: 'https://www.skilldrift.ai/skills/product-manager', label: 'Product manager skills in 2026' },
      { href: 'https://www.skilldrift.ai/skills/business-analyst', label: 'Business analyst skills in 2026' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
  {
    slug: 'graphic-designer',
    live: true,
    role: 'graphic designer',
    roleTitle: 'Graphic Designer',
    title: 'Graphic Designer Skills: What the Job Asks For in 2026 | SkillDrift',
    description:
      'The skills a graphic designer needs in 2026, from Adobe tools and Figma to typography and brand systems, which ones decide the offer, and how to check your own gap.',
    h1: 'Graphic designer skills in 2026',
    answer:
      'A graphic designer needs professional use of Adobe Illustrator, Photoshop and InDesign, and often Figma as well. They also need a strong command of typography, layout and colour, and the ability to work within a brand system and extend it. Employers expect a portfolio that shows the work and the thinking behind it, and the ability to take feedback and turn it into a better design.',
    intro:
      'Most graphic design resumes list software. Hiring managers look at the portfolio first, then read the resume for the brief, the audience and the result behind each piece.',
    groups: [
      {
        heading: 'Design skills most postings ask for',
        kind: 'technical',
        skills: [
          { name: 'Adobe Illustrator', why: 'Logos, icons and illustrations built as clean vector files.' },
          { name: 'Adobe Photoshop', why: 'Editing and combining images for print and for screens.' },
          { name: 'Adobe InDesign', why: 'Multi page layouts such as brochures, reports and books, set up correctly for print.' },
          { name: 'Figma', why: 'Designing for screens, building shared components and working with product teams.' },
          { name: 'Typography and layout', why: 'Choosing and pairing typefaces, and arranging content on a grid so that the most important message is read first.' },
          { name: 'Brand systems', why: 'Applying brand guidelines consistently, and extending them to new formats.' },
          { name: 'Preparing files for production', why: 'Colour modes, bleed, resolution and export settings for print, web and social media.' },
        ],
      },
      {
        heading: 'Human skills that decide the job',
        kind: 'human',
        skills: [
          { name: 'Taking feedback', why: 'Listening to comments, asking what problem each one points to, and revising the design with that in mind.' },
          { name: 'Understanding the brief', why: 'Asking who the design is for and what it needs to achieve before starting.' },
          { name: 'Presenting work', why: 'Explaining design choices in terms the client or the team cares about.' },
          { name: 'Time management', why: 'Delivering several projects on deadline, with time left for revisions.' },
        ],
      },
    ],
    decidesHeading: 'The skills that decide the offer',
    decides: [
      { heading: 'A focused portfolio', body: 'Hiring managers often look at the portfolio before the resume. A small set of strong projects, each with the brief and the result, tends to do better than a long gallery.' },
      { heading: 'Explaining design decisions', body: 'Interviews often include a portfolio review. Candidates who can say why they chose a layout or a typeface, and who it was for, stand out.' },
      { heading: 'Working with AI tools', body: 'Many teams now use AI tools for images and layouts. Employers want designers who can use them and still judge quality, accuracy and fit with the brand.' },
    ],
    resume: {
      before: 'Designed marketing materials using Adobe Creative Suite.',
      after: 'Designed a new event identity in Illustrator and InDesign, built templates the marketing team reused for a year of campaigns, and prepared all print and social files to the brand guidelines.',
      note: 'The second line shows the tools, brand system work, production skills and a result that lasted. A screening system matches words, so a skill that is not written down is a skill that does not count.',
    },
    variants: {
      heading: 'Graphic designer, visual designer or UI designer?',
      body: 'A graphic designer works across print, digital and brand materials. A visual designer usually focuses on digital products and campaigns, often in Figma. A UI designer designs the screens and controls of an app or a website, and works closely with product and engineering teams. Many roles blend these, so read the posting to see which tools and outputs it names.',
    },
    faqs: [
      { q: 'What skills does a graphic designer need?', a: 'Adobe Illustrator, Photoshop and InDesign, Figma, typography, layout, colour, brand systems, preparing files for print and screen, and taking feedback well.' },
      { q: 'What graphic design skills should I put on my resume?', a: 'Name the tools and the kinds of work you produced, such as brand identities, packaging or social campaigns, and link to your portfolio. Add one result for each main project where you can.' },
      { q: 'Do graphic designers need to learn Figma?', a: 'Many postings now ask for it, especially digital and brand roles that work with product teams. The Adobe tools remain the core requirement for most print and brand work.' },
      { q: 'How do I check my skills against a graphic design job?', a: 'Upload your resume to SkillDrift and pick the job. It names the skills the posting asks for that your resume does not show, scores the job out of 100, and builds a learning path for each gap.' },
    ],
    related: [
      { href: 'https://www.skilldrift.ai/skills/in-demand/design-jobs', label: 'Skills employers ask for in design jobs' },
      { href: 'https://www.skilldrift.ai/skills/in-demand/creative-jobs', label: 'Skills employers ask for in creative jobs' },
      { href: `${BLOG}how-to-build-a-career-roadmap-step-by-step`, label: 'How to build a career roadmap step by step' },
    ],
  },
];

export const LIVE_ROLES = ROLES.filter((r) => r.live);
export const getRole = (slug: string) => LIVE_ROLES.find((r) => r.slug === slug);
