// lib/skillsDemand.ts  Generated 1 October 2026 from the SkillDrift job index.
//
// One object per page at /skills/in-demand/<slug>. Do not edit by hand.
// To refresh: run scripts/refresh-skills-demand.mjs with JOBS_API_TOKEN set, which rewrites this file.
//
// Each page is one slice of the index: a role category, optionally inside one industry.
// A slice is published only if it has at least 1,000 postings, the API returned its skills in
// count order, and its top skill is named in at least 10% of postings.

export type DemandSkill = { name: string; count: number; pct: number };
export type DemandLink = { href: string; label: string };

export type DemandPage = {
  slug: string;
  roleKey: string;
  industryKey: string | null;
  roleLabel: string;
  roleTitle: string;
  industryLabel: string | null;
  where: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  sample: number;
  skills: DemandSkill[];
  guides: DemandLink[];
};

export const SNAPSHOT_DATE = '2026-10-01';
export const SNAPSHOT_LABEL = '1 October 2026';

export const DEMAND_PAGES: DemandPage[] = [
  {
    "slug": "creative-jobs",
    "roleKey": "creative",
    "industryKey": null,
    "roleLabel": "creative",
    "roleTitle": "Creative",
    "industryLabel": null,
    "where": "creative jobs",
    "title": "Skills Employers Ask For in Creative Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 3,339 creative jobs: Video editing, Adobe Premiere Pro, Motion graphics, After Effects. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in creative jobs",
    "answer": "In 3,339 creative jobs in the SkillDrift job index, the most requested skill is Video editing, named in 60.8% of postings. Adobe Premiere Pro follows at 30.6%, then Motion graphics at 28%.",
    "sample": 3339,
    "skills": [
      {
        "name": "Video editing",
        "count": 2029,
        "pct": 60.8
      },
      {
        "name": "Adobe Premiere Pro",
        "count": 1022,
        "pct": 30.6
      },
      {
        "name": "Motion graphics",
        "count": 936,
        "pct": 28
      },
      {
        "name": "After Effects",
        "count": 673,
        "pct": 20.2
      },
      {
        "name": "Storytelling",
        "count": 665,
        "pct": 19.9
      },
      {
        "name": "Color correction",
        "count": 359,
        "pct": 10.8
      },
      {
        "name": "Graphic design",
        "count": 334,
        "pct": 10
      },
      {
        "name": "Adobe Photoshop",
        "count": 330,
        "pct": 9.9
      }
    ],
    "guides": []
  },
  {
    "slug": "creative-jobs-in-media-entertainment",
    "roleKey": "creative",
    "industryKey": "media_entertainment",
    "roleLabel": "creative",
    "roleTitle": "Creative",
    "industryLabel": "media and entertainment",
    "where": "creative jobs in media and entertainment",
    "title": "Skills Employers Ask For in Creative Jobs in Media and Entertainment, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,728 creative jobs in media and entertainment: Video editing, Adobe Premiere Pro, Motion graphics, After Effects. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in creative jobs in media and entertainment",
    "answer": "In 1,728 creative jobs in media and entertainment in the SkillDrift job index, the most requested skill is Video editing, named in 64% of postings. Adobe Premiere Pro follows at 35.5%, then Motion graphics at 30.6%.",
    "sample": 1728,
    "skills": [
      {
        "name": "Video editing",
        "count": 1106,
        "pct": 64
      },
      {
        "name": "Adobe Premiere Pro",
        "count": 613,
        "pct": 35.5
      },
      {
        "name": "Motion graphics",
        "count": 528,
        "pct": 30.6
      },
      {
        "name": "After Effects",
        "count": 377,
        "pct": 21.8
      },
      {
        "name": "Adobe After Effects",
        "count": 245,
        "pct": 14.2
      },
      {
        "name": "Color correction",
        "count": 214,
        "pct": 12.4
      },
      {
        "name": "Sound design",
        "count": 196,
        "pct": 11.3
      },
      {
        "name": "Color grading",
        "count": 134,
        "pct": 7.8
      }
    ],
    "guides": []
  },
  {
    "slug": "customer-support-jobs",
    "roleKey": "customer_support",
    "industryKey": null,
    "roleLabel": "customer support",
    "roleTitle": "Customer support",
    "industryLabel": null,
    "where": "customer support jobs",
    "title": "Skills Employers Ask For in Customer Support Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 13,593 customer support jobs: Customer service, Customer support, Written communication, Verbal communication. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in customer support jobs",
    "answer": "In 13,593 customer support jobs in the SkillDrift job index, the most requested skill is Customer service, named in 38.2% of postings. Customer support follows at 30.5%, then Written communication at 14.5%.",
    "sample": 13593,
    "skills": [
      {
        "name": "Customer service",
        "count": 5194,
        "pct": 38.2
      },
      {
        "name": "Customer support",
        "count": 4152,
        "pct": 30.5
      },
      {
        "name": "Written communication",
        "count": 1967,
        "pct": 14.5
      },
      {
        "name": "Verbal communication",
        "count": 1745,
        "pct": 12.8
      },
      {
        "name": "English communication",
        "count": 1552,
        "pct": 11.4
      },
      {
        "name": "Troubleshooting",
        "count": 909,
        "pct": 6.7
      },
      {
        "name": "Issue resolution",
        "count": 801,
        "pct": 5.9
      },
      {
        "name": "CRM",
        "count": 590,
        "pct": 4.3
      }
    ],
    "guides": [
      {
        "href": "/skills/customer-service",
        "label": "Customer service skills"
      }
    ]
  },
  {
    "slug": "data-ai-jobs",
    "roleKey": "data_ai",
    "industryKey": null,
    "roleLabel": "data and AI",
    "roleTitle": "Data and AI",
    "industryLabel": null,
    "where": "data and AI jobs",
    "title": "Skills Employers Ask For in Data and AI Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 33,406 data and AI jobs: SQL, Python, Data analysis, Power BI. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in data and AI jobs",
    "answer": "In 33,406 data and AI jobs in the SkillDrift job index, the most requested skill is SQL, named in 53.5% of postings. Python follows at 43.2%, then Data analysis at 30.4%.",
    "sample": 33406,
    "skills": [
      {
        "name": "SQL",
        "count": 17859,
        "pct": 53.5
      },
      {
        "name": "Python",
        "count": 14445,
        "pct": 43.2
      },
      {
        "name": "Data analysis",
        "count": 10158,
        "pct": 30.4
      },
      {
        "name": "Power BI",
        "count": 8292,
        "pct": 24.8
      },
      {
        "name": "Data visualization",
        "count": 8180,
        "pct": 24.5
      },
      {
        "name": "Machine learning",
        "count": 6316,
        "pct": 18.9
      },
      {
        "name": "Excel",
        "count": 5554,
        "pct": 16.6
      },
      {
        "name": "Tableau",
        "count": 5444,
        "pct": 16.3
      }
    ],
    "guides": [
      {
        "href": "/skills/data-analyst",
        "label": "Data analyst skills"
      },
      {
        "href": "/skills/data-scientist",
        "label": "Data scientist skills"
      }
    ]
  },
  {
    "slug": "data-ai-jobs-in-consulting",
    "roleKey": "data_ai",
    "industryKey": "consulting",
    "roleLabel": "data and AI",
    "roleTitle": "Data and AI",
    "industryLabel": "consulting",
    "where": "data and AI jobs in consulting",
    "title": "Skills Employers Ask For in Data and AI Jobs in Consulting, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,948 data and AI jobs in consulting: SQL, Python, Data analysis, Power BI. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in data and AI jobs in consulting",
    "answer": "In 1,948 data and AI jobs in consulting in the SkillDrift job index, the most requested skill is SQL, named in 56.4% of postings. Python follows at 39.1%, then Data analysis at 32.3%.",
    "sample": 1948,
    "skills": [
      {
        "name": "SQL",
        "count": 1098,
        "pct": 56.4
      },
      {
        "name": "Python",
        "count": 761,
        "pct": 39.1
      },
      {
        "name": "Data analysis",
        "count": 630,
        "pct": 32.3
      },
      {
        "name": "Power BI",
        "count": 600,
        "pct": 30.8
      },
      {
        "name": "Data visualization",
        "count": 526,
        "pct": 27
      },
      {
        "name": "Data modeling",
        "count": 393,
        "pct": 20.2
      },
      {
        "name": "Tableau",
        "count": 389,
        "pct": 20
      },
      {
        "name": "Excel",
        "count": 369,
        "pct": 18.9
      }
    ],
    "guides": [
      {
        "href": "/skills/data-analyst",
        "label": "Data analyst skills"
      },
      {
        "href": "/skills/data-scientist",
        "label": "Data scientist skills"
      }
    ]
  },
  {
    "slug": "data-ai-jobs-in-fintech",
    "roleKey": "data_ai",
    "industryKey": "fintech",
    "roleLabel": "data and AI",
    "roleTitle": "Data and AI",
    "industryLabel": "fintech",
    "where": "data and AI jobs in fintech",
    "title": "Skills Employers Ask For in Data and AI Jobs in Fintech, October 2026 | SkillDrift",
    "description": "The skills named most often in 5,401 data and AI jobs in fintech: SQL, Python, Data analysis, Power BI. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in data and AI jobs in fintech",
    "answer": "In 5,401 data and AI jobs in fintech in the SkillDrift job index, the most requested skill is SQL, named in 60.9% of postings. Python follows at 44.3%, then Data analysis at 27.1%.",
    "sample": 5401,
    "skills": [
      {
        "name": "SQL",
        "count": 3291,
        "pct": 60.9
      },
      {
        "name": "Python",
        "count": 2394,
        "pct": 44.3
      },
      {
        "name": "Data analysis",
        "count": 1465,
        "pct": 27.1
      },
      {
        "name": "Power BI",
        "count": 1120,
        "pct": 20.7
      },
      {
        "name": "Data visualization",
        "count": 1097,
        "pct": 20.3
      },
      {
        "name": "Tableau",
        "count": 1008,
        "pct": 18.7
      },
      {
        "name": "Excel",
        "count": 970,
        "pct": 18
      },
      {
        "name": "Machine learning",
        "count": 782,
        "pct": 14.5
      }
    ],
    "guides": [
      {
        "href": "/skills/data-analyst",
        "label": "Data analyst skills"
      },
      {
        "href": "/skills/data-scientist",
        "label": "Data scientist skills"
      }
    ]
  },
  {
    "slug": "data-ai-jobs-in-healthtech",
    "roleKey": "data_ai",
    "industryKey": "healthtech",
    "roleLabel": "data and AI",
    "roleTitle": "Data and AI",
    "industryLabel": "health tech",
    "where": "data and AI jobs in health tech",
    "title": "Skills Employers Ask For in Data and AI Jobs in Health Tech, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,236 data and AI jobs in health tech: SQL, Python, Power BI, Data analysis. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in data and AI jobs in health tech",
    "answer": "In 2,236 data and AI jobs in health tech in the SkillDrift job index, the most requested skill is SQL, named in 55.5% of postings. Python follows at 47.2%, then Power BI at 27%.",
    "sample": 2236,
    "skills": [
      {
        "name": "SQL",
        "count": 1240,
        "pct": 55.5
      },
      {
        "name": "Python",
        "count": 1055,
        "pct": 47.2
      },
      {
        "name": "Power BI",
        "count": 604,
        "pct": 27
      },
      {
        "name": "Data analysis",
        "count": 545,
        "pct": 24.4
      },
      {
        "name": "Data visualization",
        "count": 520,
        "pct": 23.3
      },
      {
        "name": "Machine learning",
        "count": 414,
        "pct": 18.5
      },
      {
        "name": "Excel",
        "count": 396,
        "pct": 17.7
      },
      {
        "name": "Tableau",
        "count": 375,
        "pct": 16.8
      }
    ],
    "guides": [
      {
        "href": "/skills/data-analyst",
        "label": "Data analyst skills"
      },
      {
        "href": "/skills/data-scientist",
        "label": "Data scientist skills"
      }
    ]
  },
  {
    "slug": "data-ai-jobs-in-manufacturing",
    "roleKey": "data_ai",
    "industryKey": "manufacturing",
    "roleLabel": "data and AI",
    "roleTitle": "Data and AI",
    "industryLabel": "manufacturing",
    "where": "data and AI jobs in manufacturing",
    "title": "Skills Employers Ask For in Data and AI Jobs in Manufacturing, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,342 data and AI jobs in manufacturing: SQL, Python, Power BI, Data analysis. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in data and AI jobs in manufacturing",
    "answer": "In 1,342 data and AI jobs in manufacturing in the SkillDrift job index, the most requested skill is SQL, named in 51.5% of postings. Python follows at 41.3%, then Power BI at 37.1%.",
    "sample": 1342,
    "skills": [
      {
        "name": "SQL",
        "count": 691,
        "pct": 51.5
      },
      {
        "name": "Python",
        "count": 554,
        "pct": 41.3
      },
      {
        "name": "Power BI",
        "count": 498,
        "pct": 37.1
      },
      {
        "name": "Data analysis",
        "count": 350,
        "pct": 26.1
      },
      {
        "name": "Data visualization",
        "count": 309,
        "pct": 23
      },
      {
        "name": "Data modeling",
        "count": 300,
        "pct": 22.4
      },
      {
        "name": "Machine learning",
        "count": 275,
        "pct": 20.5
      },
      {
        "name": "Excel",
        "count": 246,
        "pct": 18.3
      }
    ],
    "guides": [
      {
        "href": "/skills/data-analyst",
        "label": "Data analyst skills"
      },
      {
        "href": "/skills/data-scientist",
        "label": "Data scientist skills"
      }
    ]
  },
  {
    "slug": "data-ai-jobs-in-software",
    "roleKey": "data_ai",
    "industryKey": "software",
    "roleLabel": "data and AI",
    "roleTitle": "Data and AI",
    "industryLabel": "software",
    "where": "data and AI jobs in software",
    "title": "Skills Employers Ask For in Data and AI Jobs in Software, October 2026 | SkillDrift",
    "description": "The skills named most often in 7,169 data and AI jobs in software: Python, SQL, Machine learning, Data analysis. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in data and AI jobs in software",
    "answer": "In 7,169 data and AI jobs in software in the SkillDrift job index, the most requested skill is Python, named in 53.4% of postings. SQL follows at 49.4%, then Machine learning at 30.6%.",
    "sample": 7169,
    "skills": [
      {
        "name": "Python",
        "count": 3825,
        "pct": 53.4
      },
      {
        "name": "SQL",
        "count": 3542,
        "pct": 49.4
      },
      {
        "name": "Machine learning",
        "count": 2197,
        "pct": 30.6
      },
      {
        "name": "Data analysis",
        "count": 1887,
        "pct": 26.3
      },
      {
        "name": "Data visualization",
        "count": 1401,
        "pct": 19.5
      },
      {
        "name": "Power BI",
        "count": 1377,
        "pct": 19.2
      },
      {
        "name": "Data modeling",
        "count": 987,
        "pct": 13.8
      },
      {
        "name": "pandas",
        "count": 879,
        "pct": 12.3
      }
    ],
    "guides": [
      {
        "href": "/skills/data-analyst",
        "label": "Data analyst skills"
      },
      {
        "href": "/skills/data-scientist",
        "label": "Data scientist skills"
      }
    ]
  },
  {
    "slug": "design-jobs",
    "roleKey": "design",
    "industryKey": null,
    "roleLabel": "design",
    "roleTitle": "Design",
    "industryLabel": null,
    "where": "design jobs",
    "title": "Skills Employers Ask For in Design Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 13,905 design jobs: Figma, Typography, Graphic design, Adobe Photoshop. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in design jobs",
    "answer": "In 13,905 design jobs in the SkillDrift job index, the most requested skill is Figma, named in 33.6% of postings. Typography follows at 26.1%, then Graphic design at 24.6%.",
    "sample": 13905,
    "skills": [
      {
        "name": "Figma",
        "count": 4678,
        "pct": 33.6
      },
      {
        "name": "Typography",
        "count": 3635,
        "pct": 26.1
      },
      {
        "name": "Graphic design",
        "count": 3415,
        "pct": 24.6
      },
      {
        "name": "Adobe Photoshop",
        "count": 3167,
        "pct": 22.8
      },
      {
        "name": "Adobe Illustrator",
        "count": 3025,
        "pct": 21.8
      },
      {
        "name": "Wireframing",
        "count": 2962,
        "pct": 21.3
      },
      {
        "name": "Prototyping",
        "count": 2885,
        "pct": 20.7
      },
      {
        "name": "Design systems",
        "count": 2350,
        "pct": 16.9
      }
    ],
    "guides": []
  },
  {
    "slug": "design-jobs-in-media-entertainment",
    "roleKey": "design",
    "industryKey": "media_entertainment",
    "roleLabel": "design",
    "roleTitle": "Design",
    "industryLabel": "media and entertainment",
    "where": "design jobs in media and entertainment",
    "title": "Skills Employers Ask For in Design Jobs in Media and Entertainment, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,062 design jobs in media and entertainment: Graphic design, Typography, Adobe Photoshop, Adobe Illustrator. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in design jobs in media and entertainment",
    "answer": "In 2,062 design jobs in media and entertainment in the SkillDrift job index, the most requested skill is Graphic design, named in 39.1% of postings. Typography follows at 38.8%, then Adobe Photoshop at 37.2%.",
    "sample": 2062,
    "skills": [
      {
        "name": "Graphic design",
        "count": 807,
        "pct": 39.1
      },
      {
        "name": "Typography",
        "count": 800,
        "pct": 38.8
      },
      {
        "name": "Adobe Photoshop",
        "count": 768,
        "pct": 37.2
      },
      {
        "name": "Adobe Illustrator",
        "count": 751,
        "pct": 36.4
      },
      {
        "name": "Video editing",
        "count": 446,
        "pct": 21.6
      },
      {
        "name": "Figma",
        "count": 405,
        "pct": 19.6
      },
      {
        "name": "Photoshop",
        "count": 396,
        "pct": 19.2
      },
      {
        "name": "Color theory",
        "count": 383,
        "pct": 18.6
      }
    ],
    "guides": []
  },
  {
    "slug": "design-jobs-in-software",
    "roleKey": "design",
    "industryKey": "software",
    "roleLabel": "design",
    "roleTitle": "Design",
    "industryLabel": "software",
    "where": "design jobs in software",
    "title": "Skills Employers Ask For in Design Jobs in Software, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,063 design jobs in software: Figma, Wireframing, Prototyping, Design systems. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in design jobs in software",
    "answer": "In 2,063 design jobs in software in the SkillDrift job index, the most requested skill is Figma, named in 57% of postings. Wireframing follows at 41.5%, then Prototyping at 39.7%.",
    "sample": 2063,
    "skills": [
      {
        "name": "Figma",
        "count": 1176,
        "pct": 57
      },
      {
        "name": "Wireframing",
        "count": 857,
        "pct": 41.5
      },
      {
        "name": "Prototyping",
        "count": 818,
        "pct": 39.7
      },
      {
        "name": "Design systems",
        "count": 730,
        "pct": 35.4
      },
      {
        "name": "UI/UX design",
        "count": 493,
        "pct": 23.9
      },
      {
        "name": "Interaction design",
        "count": 476,
        "pct": 23.1
      },
      {
        "name": "Usability testing",
        "count": 461,
        "pct": 22.3
      },
      {
        "name": "Responsive design",
        "count": 400,
        "pct": 19.4
      }
    ],
    "guides": []
  },
  {
    "slug": "education-jobs",
    "roleKey": "education",
    "industryKey": null,
    "roleLabel": "education",
    "roleTitle": "Education",
    "industryLabel": null,
    "where": "education jobs",
    "title": "Skills Employers Ask For in Education Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 5,499 education jobs: Teaching, Lesson planning, Classroom management, Python. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in education jobs",
    "answer": "In 5,499 education jobs in the SkillDrift job index, the most requested skill is Teaching, named in 19.1% of postings. Lesson planning follows at 18.9%, then Classroom management at 14.1%.",
    "sample": 5499,
    "skills": [
      {
        "name": "Teaching",
        "count": 1048,
        "pct": 19.1
      },
      {
        "name": "Lesson planning",
        "count": 1040,
        "pct": 18.9
      },
      {
        "name": "Classroom management",
        "count": 776,
        "pct": 14.1
      },
      {
        "name": "Python",
        "count": 609,
        "pct": 11.1
      },
      {
        "name": "SQL",
        "count": 397,
        "pct": 7.2
      },
      {
        "name": "Student assessment",
        "count": 383,
        "pct": 7
      },
      {
        "name": "Curriculum development",
        "count": 361,
        "pct": 6.6
      },
      {
        "name": "Instructional design",
        "count": 160,
        "pct": 2.9
      }
    ],
    "guides": []
  },
  {
    "slug": "engineering-jobs",
    "roleKey": "engineering",
    "industryKey": null,
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": null,
    "where": "engineering jobs",
    "title": "Skills Employers Ask For in Engineering Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 164,527 engineering jobs: Python, JavaScript, Git, Java. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs",
    "answer": "In 164,527 engineering jobs in the SkillDrift job index, the most requested skill is Python, named in 23.1% of postings. JavaScript follows at 20.4%, then Git at 19.8%.",
    "sample": 164527,
    "skills": [
      {
        "name": "Python",
        "count": 38070,
        "pct": 23.1
      },
      {
        "name": "JavaScript",
        "count": 33642,
        "pct": 20.4
      },
      {
        "name": "Git",
        "count": 32644,
        "pct": 19.8
      },
      {
        "name": "Java",
        "count": 25231,
        "pct": 15.3
      },
      {
        "name": "SQL",
        "count": 25040,
        "pct": 15.2
      },
      {
        "name": "CI/CD",
        "count": 23412,
        "pct": 14.2
      },
      {
        "name": "React",
        "count": 22927,
        "pct": 13.9
      },
      {
        "name": "AWS",
        "count": 17630,
        "pct": 10.7
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-automotive",
    "roleKey": "engineering",
    "industryKey": "automotive",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "automotive",
    "where": "engineering jobs in automotive",
    "title": "Skills Employers Ask For in Engineering Jobs in Automotive, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,882 engineering jobs in automotive: Python, Java, Git, Root cause analysis. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in automotive",
    "answer": "In 1,882 engineering jobs in automotive in the SkillDrift job index, the most requested skill is Python, named in 12.1% of postings. Java follows at 10.1%, then Git at 10.1%.",
    "sample": 1882,
    "skills": [
      {
        "name": "Python",
        "count": 228,
        "pct": 12.1
      },
      {
        "name": "Java",
        "count": 191,
        "pct": 10.1
      },
      {
        "name": "Git",
        "count": 191,
        "pct": 10.1
      },
      {
        "name": "Root cause analysis",
        "count": 174,
        "pct": 9.2
      },
      {
        "name": "GD&T",
        "count": 143,
        "pct": 7.6
      },
      {
        "name": "CI/CD",
        "count": 140,
        "pct": 7.4
      },
      {
        "name": "Debugging",
        "count": 132,
        "pct": 7
      },
      {
        "name": "DFMEA",
        "count": 131,
        "pct": 7
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-consulting",
    "roleKey": "engineering",
    "industryKey": "consulting",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "consulting",
    "where": "engineering jobs in consulting",
    "title": "Skills Employers Ask For in Engineering Jobs in Consulting, October 2026 | SkillDrift",
    "description": "The skills named most often in 7,124 engineering jobs in consulting: Python, JavaScript, Git, SQL. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in consulting",
    "answer": "In 7,124 engineering jobs in consulting in the SkillDrift job index, the most requested skill is Python, named in 21.7% of postings. JavaScript follows at 18.3%, then Git at 15.8%.",
    "sample": 7124,
    "skills": [
      {
        "name": "Python",
        "count": 1549,
        "pct": 21.7
      },
      {
        "name": "JavaScript",
        "count": 1303,
        "pct": 18.3
      },
      {
        "name": "Git",
        "count": 1125,
        "pct": 15.8
      },
      {
        "name": "SQL",
        "count": 1041,
        "pct": 14.6
      },
      {
        "name": "Java",
        "count": 1017,
        "pct": 14.3
      },
      {
        "name": "CI/CD",
        "count": 972,
        "pct": 13.6
      },
      {
        "name": "AWS",
        "count": 742,
        "pct": 10.4
      },
      {
        "name": "Azure",
        "count": 653,
        "pct": 9.2
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-ecommerce",
    "roleKey": "engineering",
    "industryKey": "ecommerce",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "e-commerce",
    "where": "engineering jobs in e-commerce",
    "title": "Skills Employers Ask For in Engineering Jobs in E-commerce, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,382 engineering jobs in e-commerce: JavaScript, Git, React, CSS. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in e-commerce",
    "answer": "In 2,382 engineering jobs in e-commerce in the SkillDrift job index, the most requested skill is JavaScript, named in 38.5% of postings. Git follows at 29.1%, then React at 22.3%.",
    "sample": 2382,
    "skills": [
      {
        "name": "JavaScript",
        "count": 917,
        "pct": 38.5
      },
      {
        "name": "Git",
        "count": 692,
        "pct": 29.1
      },
      {
        "name": "React",
        "count": 531,
        "pct": 22.3
      },
      {
        "name": "CSS",
        "count": 490,
        "pct": 20.6
      },
      {
        "name": "Python",
        "count": 462,
        "pct": 19.4
      },
      {
        "name": "HTML",
        "count": 425,
        "pct": 17.8
      },
      {
        "name": "Node.js",
        "count": 418,
        "pct": 17.5
      },
      {
        "name": "CI/CD",
        "count": 390,
        "pct": 16.4
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-edtech",
    "roleKey": "engineering",
    "industryKey": "edtech",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "edtech",
    "where": "engineering jobs in edtech",
    "title": "Skills Employers Ask For in Engineering Jobs in Edtech, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,473 engineering jobs in edtech: Git, JavaScript, React, Python. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in edtech",
    "answer": "In 1,473 engineering jobs in edtech in the SkillDrift job index, the most requested skill is Git, named in 36.7% of postings. JavaScript follows at 35.4%, then React at 30.4%.",
    "sample": 1473,
    "skills": [
      {
        "name": "Git",
        "count": 541,
        "pct": 36.7
      },
      {
        "name": "JavaScript",
        "count": 522,
        "pct": 35.4
      },
      {
        "name": "React",
        "count": 448,
        "pct": 30.4
      },
      {
        "name": "Python",
        "count": 402,
        "pct": 27.3
      },
      {
        "name": "Node.js",
        "count": 365,
        "pct": 24.8
      },
      {
        "name": "CSS",
        "count": 312,
        "pct": 21.2
      },
      {
        "name": "SQL",
        "count": 295,
        "pct": 20
      },
      {
        "name": "HTML",
        "count": 266,
        "pct": 18.1
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-energy",
    "roleKey": "engineering",
    "industryKey": "energy",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "energy",
    "where": "engineering jobs in energy",
    "title": "Skills Employers Ask For in Engineering Jobs in Energy, October 2026 | SkillDrift",
    "description": "The skills named most often in 3,186 engineering jobs in energy: Python, AutoCAD, Git, Troubleshooting. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in energy",
    "answer": "In 3,186 engineering jobs in energy in the SkillDrift job index, the most requested skill is Python, named in 10.4% of postings. AutoCAD follows at 9.3%, then Git at 8.1%.",
    "sample": 3186,
    "skills": [
      {
        "name": "Python",
        "count": 331,
        "pct": 10.4
      },
      {
        "name": "AutoCAD",
        "count": 295,
        "pct": 9.3
      },
      {
        "name": "Git",
        "count": 259,
        "pct": 8.1
      },
      {
        "name": "Troubleshooting",
        "count": 238,
        "pct": 7.5
      },
      {
        "name": "SQL",
        "count": 227,
        "pct": 7.1
      },
      {
        "name": "CI/CD",
        "count": 185,
        "pct": 5.8
      },
      {
        "name": "Safety compliance",
        "count": 170,
        "pct": 5.3
      },
      {
        "name": "Docker",
        "count": 163,
        "pct": 5.1
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-fintech",
    "roleKey": "engineering",
    "industryKey": "fintech",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "fintech",
    "where": "engineering jobs in fintech",
    "title": "Skills Employers Ask For in Engineering Jobs in Fintech, October 2026 | SkillDrift",
    "description": "The skills named most often in 14,701 engineering jobs in fintech: Java, SQL, Python, CI/CD. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in fintech",
    "answer": "In 14,701 engineering jobs in fintech in the SkillDrift job index, the most requested skill is Java, named in 32.9% of postings. SQL follows at 27.2%, then Python at 26.1%.",
    "sample": 14701,
    "skills": [
      {
        "name": "Java",
        "count": 4834,
        "pct": 32.9
      },
      {
        "name": "SQL",
        "count": 3994,
        "pct": 27.2
      },
      {
        "name": "Python",
        "count": 3831,
        "pct": 26.1
      },
      {
        "name": "CI/CD",
        "count": 3709,
        "pct": 25.2
      },
      {
        "name": "Git",
        "count": 3034,
        "pct": 20.6
      },
      {
        "name": "JavaScript",
        "count": 2685,
        "pct": 18.3
      },
      {
        "name": "AWS",
        "count": 2452,
        "pct": 16.7
      },
      {
        "name": "Spring Boot",
        "count": 2279,
        "pct": 15.5
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-government-nonprofit",
    "roleKey": "engineering",
    "industryKey": "government_nonprofit",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "government and non-profit",
    "where": "engineering jobs in government and non-profit",
    "title": "Skills Employers Ask For in Engineering Jobs in Government and Non-profit, October 2026 | SkillDrift",
    "description": "The skills named most often in 4,079 engineering jobs in government and non-profit: Python, Java, JavaScript, SQL. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in government and non-profit",
    "answer": "In 4,079 engineering jobs in government and non-profit in the SkillDrift job index, the most requested skill is Python, named in 19.9% of postings. Java follows at 12.2%, then JavaScript at 9.8%.",
    "sample": 4079,
    "skills": [
      {
        "name": "Python",
        "count": 811,
        "pct": 19.9
      },
      {
        "name": "Java",
        "count": 498,
        "pct": 12.2
      },
      {
        "name": "JavaScript",
        "count": 399,
        "pct": 9.8
      },
      {
        "name": "SQL",
        "count": 386,
        "pct": 9.5
      },
      {
        "name": "CI/CD",
        "count": 378,
        "pct": 9.3
      },
      {
        "name": "Git",
        "count": 367,
        "pct": 9
      },
      {
        "name": "AWS",
        "count": 347,
        "pct": 8.5
      },
      {
        "name": "Linux",
        "count": 340,
        "pct": 8.3
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-healthtech",
    "roleKey": "engineering",
    "industryKey": "healthtech",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "health tech",
    "where": "engineering jobs in health tech",
    "title": "Skills Employers Ask For in Engineering Jobs in Health Tech, October 2026 | SkillDrift",
    "description": "The skills named most often in 6,182 engineering jobs in health tech: Python, Git, JavaScript, SQL. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in health tech",
    "answer": "In 6,182 engineering jobs in health tech in the SkillDrift job index, the most requested skill is Python, named in 30.5% of postings. Git follows at 20.8%, then JavaScript at 20.8%.",
    "sample": 6182,
    "skills": [
      {
        "name": "Python",
        "count": 1887,
        "pct": 30.5
      },
      {
        "name": "Git",
        "count": 1285,
        "pct": 20.8
      },
      {
        "name": "JavaScript",
        "count": 1283,
        "pct": 20.8
      },
      {
        "name": "SQL",
        "count": 1247,
        "pct": 20.2
      },
      {
        "name": "CI/CD",
        "count": 1180,
        "pct": 19.1
      },
      {
        "name": "React",
        "count": 932,
        "pct": 15.1
      },
      {
        "name": "AWS",
        "count": 849,
        "pct": 13.7
      },
      {
        "name": "Java",
        "count": 829,
        "pct": 13.4
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-logistics",
    "roleKey": "engineering",
    "industryKey": "logistics",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "logistics",
    "where": "engineering jobs in logistics",
    "title": "Skills Employers Ask For in Engineering Jobs in Logistics, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,445 engineering jobs in logistics: SQL, Git, Python, CI/CD. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in logistics",
    "answer": "In 1,445 engineering jobs in logistics in the SkillDrift job index, the most requested skill is SQL, named in 18.3% of postings. Git follows at 18.2%, then Python at 16.9%.",
    "sample": 1445,
    "skills": [
      {
        "name": "SQL",
        "count": 265,
        "pct": 18.3
      },
      {
        "name": "Git",
        "count": 263,
        "pct": 18.2
      },
      {
        "name": "Python",
        "count": 244,
        "pct": 16.9
      },
      {
        "name": "CI/CD",
        "count": 236,
        "pct": 16.3
      },
      {
        "name": "Java",
        "count": 206,
        "pct": 14.3
      },
      {
        "name": "JavaScript",
        "count": 164,
        "pct": 11.3
      },
      {
        "name": "TypeScript",
        "count": 152,
        "pct": 10.5
      },
      {
        "name": "PostgreSQL",
        "count": 150,
        "pct": 10.4
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-manufacturing",
    "roleKey": "engineering",
    "industryKey": "manufacturing",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "manufacturing",
    "where": "engineering jobs in manufacturing",
    "title": "Skills Employers Ask For in Engineering Jobs in Manufacturing, October 2026 | SkillDrift",
    "description": "The skills named most often in 16,384 engineering jobs in manufacturing: AutoCAD, Troubleshooting, Safety compliance, Quality control. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in manufacturing",
    "answer": "In 16,384 engineering jobs in manufacturing in the SkillDrift job index, the most requested skill is AutoCAD, named in 11.2% of postings. Troubleshooting follows at 8.4%, then Safety compliance at 8.1%.",
    "sample": 16384,
    "skills": [
      {
        "name": "AutoCAD",
        "count": 1838,
        "pct": 11.2
      },
      {
        "name": "Troubleshooting",
        "count": 1376,
        "pct": 8.4
      },
      {
        "name": "Safety compliance",
        "count": 1331,
        "pct": 8.1
      },
      {
        "name": "Quality control",
        "count": 1255,
        "pct": 7.7
      },
      {
        "name": "Preventive maintenance",
        "count": 1214,
        "pct": 7.4
      },
      {
        "name": "Python",
        "count": 1035,
        "pct": 6.3
      },
      {
        "name": "Root cause analysis",
        "count": 974,
        "pct": 5.9
      },
      {
        "name": "SolidWorks",
        "count": 636,
        "pct": 3.9
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-media-entertainment",
    "roleKey": "engineering",
    "industryKey": "media_entertainment",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "media and entertainment",
    "where": "engineering jobs in media and entertainment",
    "title": "Skills Employers Ask For in Engineering Jobs in Media and Entertainment, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,547 engineering jobs in media and entertainment: JavaScript, Python, React, Git. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in media and entertainment",
    "answer": "In 2,547 engineering jobs in media and entertainment in the SkillDrift job index, the most requested skill is JavaScript, named in 29.6% of postings. Python follows at 27.1%, then React at 22%.",
    "sample": 2547,
    "skills": [
      {
        "name": "JavaScript",
        "count": 754,
        "pct": 29.6
      },
      {
        "name": "Python",
        "count": 690,
        "pct": 27.1
      },
      {
        "name": "React",
        "count": 561,
        "pct": 22
      },
      {
        "name": "Git",
        "count": 529,
        "pct": 20.8
      },
      {
        "name": "AWS",
        "count": 430,
        "pct": 16.9
      },
      {
        "name": "Node.js",
        "count": 429,
        "pct": 16.8
      },
      {
        "name": "TypeScript",
        "count": 418,
        "pct": 16.4
      },
      {
        "name": "CI/CD",
        "count": 400,
        "pct": 15.7
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-real-estate",
    "roleKey": "engineering",
    "industryKey": "real_estate",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "real estate",
    "where": "engineering jobs in real estate",
    "title": "Skills Employers Ask For in Engineering Jobs in Real Estate, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,066 engineering jobs in real estate: AutoCAD, Quality control, Safety compliance, Project management. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in real estate",
    "answer": "In 1,066 engineering jobs in real estate in the SkillDrift job index, the most requested skill is AutoCAD, named in 17.4% of postings. Quality control follows at 16.3%, then Safety compliance at 12.2%.",
    "sample": 1066,
    "skills": [
      {
        "name": "AutoCAD",
        "count": 185,
        "pct": 17.4
      },
      {
        "name": "Quality control",
        "count": 174,
        "pct": 16.3
      },
      {
        "name": "Safety compliance",
        "count": 130,
        "pct": 12.2
      },
      {
        "name": "Project management",
        "count": 125,
        "pct": 11.7
      },
      {
        "name": "Contractor management",
        "count": 87,
        "pct": 8.2
      },
      {
        "name": "MS Office",
        "count": 82,
        "pct": 7.7
      },
      {
        "name": "Civil engineering",
        "count": 81,
        "pct": 7.6
      },
      {
        "name": "Quality assurance",
        "count": 74,
        "pct": 6.9
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-software",
    "roleKey": "engineering",
    "industryKey": "software",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "software",
    "where": "engineering jobs in software",
    "title": "Skills Employers Ask For in Engineering Jobs in Software, October 2026 | SkillDrift",
    "description": "The skills named most often in 71,281 engineering jobs in software: Python, JavaScript, Git, React. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in software",
    "answer": "In 71,281 engineering jobs in software in the SkillDrift job index, the most requested skill is Python, named in 28.7% of postings. JavaScript follows at 28.3%, then Git at 27.4%.",
    "sample": 71281,
    "skills": [
      {
        "name": "Python",
        "count": 20451,
        "pct": 28.7
      },
      {
        "name": "JavaScript",
        "count": 20177,
        "pct": 28.3
      },
      {
        "name": "Git",
        "count": 19533,
        "pct": 27.4
      },
      {
        "name": "React",
        "count": 13202,
        "pct": 18.5
      },
      {
        "name": "Java",
        "count": 13012,
        "pct": 18.3
      },
      {
        "name": "SQL",
        "count": 12584,
        "pct": 17.7
      },
      {
        "name": "CI/CD",
        "count": 11990,
        "pct": 16.8
      },
      {
        "name": "TypeScript",
        "count": 9933,
        "pct": 13.9
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "engineering-jobs-in-telecom",
    "roleKey": "engineering",
    "industryKey": "telecom",
    "roleLabel": "engineering",
    "roleTitle": "Engineering",
    "industryLabel": "telecom",
    "where": "engineering jobs in telecom",
    "title": "Skills Employers Ask For in Engineering Jobs in Telecom, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,054 engineering jobs in telecom: Python, CI/CD, Java, Linux. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in engineering jobs in telecom",
    "answer": "In 2,054 engineering jobs in telecom in the SkillDrift job index, the most requested skill is Python, named in 22.7% of postings. CI/CD follows at 17.3%, then Java at 15.5%.",
    "sample": 2054,
    "skills": [
      {
        "name": "Python",
        "count": 466,
        "pct": 22.7
      },
      {
        "name": "CI/CD",
        "count": 356,
        "pct": 17.3
      },
      {
        "name": "Java",
        "count": 318,
        "pct": 15.5
      },
      {
        "name": "Linux",
        "count": 294,
        "pct": 14.3
      },
      {
        "name": "Kubernetes",
        "count": 285,
        "pct": 13.9
      },
      {
        "name": "Troubleshooting",
        "count": 282,
        "pct": 13.7
      },
      {
        "name": "Git",
        "count": 253,
        "pct": 12.3
      },
      {
        "name": "Docker",
        "count": 242,
        "pct": 11.8
      }
    ],
    "guides": [
      {
        "href": "/skills/software-engineer",
        "label": "Software engineer skills"
      }
    ]
  },
  {
    "slug": "finance-jobs",
    "roleKey": "finance",
    "industryKey": null,
    "roleLabel": "finance",
    "roleTitle": "Finance",
    "industryLabel": null,
    "where": "finance jobs",
    "title": "Skills Employers Ask For in Finance Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 32,943 finance jobs: Financial reporting, Accounting, Excel, Accounts payable. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in finance jobs",
    "answer": "In 32,943 finance jobs in the SkillDrift job index, the most requested skill is Financial reporting, named in 26.9% of postings. Accounting follows at 18%, then Excel at 16.8%.",
    "sample": 32943,
    "skills": [
      {
        "name": "Financial reporting",
        "count": 8861,
        "pct": 26.9
      },
      {
        "name": "Accounting",
        "count": 5916,
        "pct": 18
      },
      {
        "name": "Excel",
        "count": 5549,
        "pct": 16.8
      },
      {
        "name": "Accounts payable",
        "count": 5342,
        "pct": 16.2
      },
      {
        "name": "GST",
        "count": 5340,
        "pct": 16.2
      },
      {
        "name": "Accounts receivable",
        "count": 4789,
        "pct": 14.5
      },
      {
        "name": "Financial analysis",
        "count": 4579,
        "pct": 13.9
      },
      {
        "name": "TDS",
        "count": 4245,
        "pct": 12.9
      }
    ],
    "guides": [
      {
        "href": "/skills/accountant",
        "label": "Accountant skills"
      }
    ]
  },
  {
    "slug": "finance-jobs-in-consulting",
    "roleKey": "finance",
    "industryKey": "consulting",
    "roleLabel": "finance",
    "roleTitle": "Finance",
    "industryLabel": "consulting",
    "where": "finance jobs in consulting",
    "title": "Skills Employers Ask For in Finance Jobs in Consulting, October 2026 | SkillDrift",
    "description": "The skills named most often in 4,378 finance jobs in consulting: Financial reporting, Accounting, MS Excel, GST. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in finance jobs in consulting",
    "answer": "In 4,378 finance jobs in consulting in the SkillDrift job index, the most requested skill is Financial reporting, named in 22.7% of postings. Accounting follows at 18.6%, then MS Excel at 15.7%.",
    "sample": 4378,
    "skills": [
      {
        "name": "Financial reporting",
        "count": 994,
        "pct": 22.7
      },
      {
        "name": "Accounting",
        "count": 813,
        "pct": 18.6
      },
      {
        "name": "MS Excel",
        "count": 686,
        "pct": 15.7
      },
      {
        "name": "GST",
        "count": 662,
        "pct": 15.1
      },
      {
        "name": "Excel",
        "count": 650,
        "pct": 14.8
      },
      {
        "name": "Accounts payable",
        "count": 550,
        "pct": 12.6
      },
      {
        "name": "Accounts receivable",
        "count": 471,
        "pct": 10.8
      },
      {
        "name": "Financial analysis",
        "count": 456,
        "pct": 10.4
      }
    ],
    "guides": [
      {
        "href": "/skills/accountant",
        "label": "Accountant skills"
      }
    ]
  },
  {
    "slug": "finance-jobs-in-fintech",
    "roleKey": "finance",
    "industryKey": "fintech",
    "roleLabel": "finance",
    "roleTitle": "Finance",
    "industryLabel": "fintech",
    "where": "finance jobs in fintech",
    "title": "Skills Employers Ask For in Finance Jobs in Fintech, October 2026 | SkillDrift",
    "description": "The skills named most often in 6,465 finance jobs in fintech: Financial modeling, Financial analysis, Excel, Financial reporting. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in finance jobs in fintech",
    "answer": "In 6,465 finance jobs in fintech in the SkillDrift job index, the most requested skill is Financial modeling, named in 23.2% of postings. Financial analysis follows at 20.3%, then Excel at 20.2%.",
    "sample": 6465,
    "skills": [
      {
        "name": "Financial modeling",
        "count": 1497,
        "pct": 23.2
      },
      {
        "name": "Financial analysis",
        "count": 1310,
        "pct": 20.3
      },
      {
        "name": "Excel",
        "count": 1309,
        "pct": 20.2
      },
      {
        "name": "Financial reporting",
        "count": 1063,
        "pct": 16.4
      },
      {
        "name": "Data analysis",
        "count": 719,
        "pct": 11.1
      },
      {
        "name": "Microsoft Excel",
        "count": 583,
        "pct": 9
      },
      {
        "name": "Accounting",
        "count": 542,
        "pct": 8.4
      },
      {
        "name": "Regulatory compliance",
        "count": 380,
        "pct": 5.9
      }
    ],
    "guides": [
      {
        "href": "/skills/accountant",
        "label": "Accountant skills"
      }
    ]
  },
  {
    "slug": "finance-jobs-in-manufacturing",
    "roleKey": "finance",
    "industryKey": "manufacturing",
    "roleLabel": "finance",
    "roleTitle": "Finance",
    "industryLabel": "manufacturing",
    "where": "finance jobs in manufacturing",
    "title": "Skills Employers Ask For in Finance Jobs in Manufacturing, October 2026 | SkillDrift",
    "description": "The skills named most often in 3,487 finance jobs in manufacturing: Financial reporting, GST, TDS, Budgeting. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in finance jobs in manufacturing",
    "answer": "In 3,487 finance jobs in manufacturing in the SkillDrift job index, the most requested skill is Financial reporting, named in 32.3% of postings. GST follows at 27.8%, then TDS at 22.1%.",
    "sample": 3487,
    "skills": [
      {
        "name": "Financial reporting",
        "count": 1125,
        "pct": 32.3
      },
      {
        "name": "GST",
        "count": 970,
        "pct": 27.8
      },
      {
        "name": "TDS",
        "count": 771,
        "pct": 22.1
      },
      {
        "name": "Budgeting",
        "count": 694,
        "pct": 19.9
      },
      {
        "name": "Accounts payable",
        "count": 690,
        "pct": 19.8
      },
      {
        "name": "Accounting",
        "count": 689,
        "pct": 19.8
      },
      {
        "name": "Accounts receivable",
        "count": 641,
        "pct": 18.4
      },
      {
        "name": "MS Excel",
        "count": 601,
        "pct": 17.2
      }
    ],
    "guides": [
      {
        "href": "/skills/accountant",
        "label": "Accountant skills"
      }
    ]
  },
  {
    "slug": "finance-jobs-in-software",
    "roleKey": "finance",
    "industryKey": "software",
    "roleLabel": "finance",
    "roleTitle": "Finance",
    "industryLabel": "software",
    "where": "finance jobs in software",
    "title": "Skills Employers Ask For in Finance Jobs in Software, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,228 finance jobs in software: Financial reporting, Excel, Financial modeling, Variance analysis. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in finance jobs in software",
    "answer": "In 1,228 finance jobs in software in the SkillDrift job index, the most requested skill is Financial reporting, named in 37.5% of postings. Excel follows at 24%, then Financial modeling at 20.9%.",
    "sample": 1228,
    "skills": [
      {
        "name": "Financial reporting",
        "count": 461,
        "pct": 37.5
      },
      {
        "name": "Excel",
        "count": 295,
        "pct": 24
      },
      {
        "name": "Financial modeling",
        "count": 257,
        "pct": 20.9
      },
      {
        "name": "Variance analysis",
        "count": 236,
        "pct": 19.2
      },
      {
        "name": "Budgeting",
        "count": 227,
        "pct": 18.5
      },
      {
        "name": "Accounts payable",
        "count": 219,
        "pct": 17.8
      },
      {
        "name": "Forecasting",
        "count": 209,
        "pct": 17
      },
      {
        "name": "Accounts receivable",
        "count": 195,
        "pct": 15.9
      }
    ],
    "guides": [
      {
        "href": "/skills/accountant",
        "label": "Accountant skills"
      }
    ]
  },
  {
    "slug": "hr-jobs",
    "roleKey": "hr",
    "industryKey": null,
    "roleLabel": "HR",
    "roleTitle": "HR",
    "industryLabel": null,
    "where": "HR jobs",
    "title": "Skills Employers Ask For in HR Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 11,145 HR jobs: Recruitment, Employee relations, Talent acquisition, Employee engagement. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in HR jobs",
    "answer": "In 11,145 HR jobs in the SkillDrift job index, the most requested skill is Recruitment, named in 28% of postings. Employee relations follows at 23.8%, then Talent acquisition at 22.6%.",
    "sample": 11145,
    "skills": [
      {
        "name": "Recruitment",
        "count": 3122,
        "pct": 28
      },
      {
        "name": "Employee relations",
        "count": 2649,
        "pct": 23.8
      },
      {
        "name": "Talent acquisition",
        "count": 2514,
        "pct": 22.6
      },
      {
        "name": "Employee engagement",
        "count": 2353,
        "pct": 21.1
      },
      {
        "name": "Performance management",
        "count": 2273,
        "pct": 20.4
      },
      {
        "name": "Stakeholder management",
        "count": 2149,
        "pct": 19.3
      },
      {
        "name": "Onboarding",
        "count": 2011,
        "pct": 18
      },
      {
        "name": "Hr operations",
        "count": 2011,
        "pct": 18
      }
    ],
    "guides": [
      {
        "href": "/skills/human-resources",
        "label": "Human resources skills"
      }
    ]
  },
  {
    "slug": "legal-jobs",
    "roleKey": "legal",
    "industryKey": null,
    "roleLabel": "legal",
    "roleTitle": "Legal",
    "industryLabel": null,
    "where": "legal jobs",
    "title": "Skills Employers Ask For in Legal Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,061 legal jobs: Legal research, Legal drafting, Contract drafting, Contract negotiation. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in legal jobs",
    "answer": "In 2,061 legal jobs in the SkillDrift job index, the most requested skill is Legal research, named in 30.6% of postings. Legal drafting follows at 21%, then Contract drafting at 19.3%.",
    "sample": 2061,
    "skills": [
      {
        "name": "Legal research",
        "count": 631,
        "pct": 30.6
      },
      {
        "name": "Legal drafting",
        "count": 432,
        "pct": 21
      },
      {
        "name": "Contract drafting",
        "count": 397,
        "pct": 19.3
      },
      {
        "name": "Contract negotiation",
        "count": 329,
        "pct": 16
      },
      {
        "name": "Contract review",
        "count": 317,
        "pct": 15.4
      },
      {
        "name": "Regulatory compliance",
        "count": 236,
        "pct": 11.5
      },
      {
        "name": "Stakeholder management",
        "count": 215,
        "pct": 10.4
      },
      {
        "name": "Written communication",
        "count": 200,
        "pct": 9.7
      }
    ],
    "guides": []
  },
  {
    "slug": "marketing-jobs",
    "roleKey": "marketing",
    "industryKey": null,
    "roleLabel": "marketing",
    "roleTitle": "Marketing",
    "industryLabel": null,
    "where": "marketing jobs",
    "title": "Skills Employers Ask For in Marketing Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 22,224 marketing jobs: SEO, Digital marketing, Google Ads, Social media marketing. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in marketing jobs",
    "answer": "In 22,224 marketing jobs in the SkillDrift job index, the most requested skill is SEO, named in 25.6% of postings. Digital marketing follows at 22%, then Google Ads at 20.1%.",
    "sample": 22224,
    "skills": [
      {
        "name": "SEO",
        "count": 5694,
        "pct": 25.6
      },
      {
        "name": "Digital marketing",
        "count": 4894,
        "pct": 22
      },
      {
        "name": "Google Ads",
        "count": 4472,
        "pct": 20.1
      },
      {
        "name": "Social media marketing",
        "count": 3844,
        "pct": 17.3
      },
      {
        "name": "Google Analytics",
        "count": 3406,
        "pct": 15.3
      },
      {
        "name": "Keyword research",
        "count": 3351,
        "pct": 15.1
      },
      {
        "name": "Content creation",
        "count": 3092,
        "pct": 13.9
      },
      {
        "name": "Meta Ads",
        "count": 3024,
        "pct": 13.6
      }
    ],
    "guides": [
      {
        "href": "/skills/marketing",
        "label": "Marketing skills"
      }
    ]
  },
  {
    "slug": "marketing-jobs-in-consulting",
    "roleKey": "marketing",
    "industryKey": "consulting",
    "roleLabel": "marketing",
    "roleTitle": "Marketing",
    "industryLabel": "consulting",
    "where": "marketing jobs in consulting",
    "title": "Skills Employers Ask For in Marketing Jobs in Consulting, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,068 marketing jobs in consulting: Digital marketing, SEO, Social media marketing, Lead generation. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in marketing jobs in consulting",
    "answer": "In 1,068 marketing jobs in consulting in the SkillDrift job index, the most requested skill is Digital marketing, named in 26.4% of postings. SEO follows at 25.7%, then Social media marketing at 16.9%.",
    "sample": 1068,
    "skills": [
      {
        "name": "Digital marketing",
        "count": 282,
        "pct": 26.4
      },
      {
        "name": "SEO",
        "count": 274,
        "pct": 25.7
      },
      {
        "name": "Social media marketing",
        "count": 180,
        "pct": 16.9
      },
      {
        "name": "Lead generation",
        "count": 167,
        "pct": 15.6
      },
      {
        "name": "Google Ads",
        "count": 160,
        "pct": 15
      },
      {
        "name": "Google Analytics",
        "count": 150,
        "pct": 14
      },
      {
        "name": "Email marketing",
        "count": 145,
        "pct": 13.6
      },
      {
        "name": "Keyword research",
        "count": 143,
        "pct": 13.4
      }
    ],
    "guides": [
      {
        "href": "/skills/marketing",
        "label": "Marketing skills"
      }
    ]
  },
  {
    "slug": "marketing-jobs-in-ecommerce",
    "roleKey": "marketing",
    "industryKey": "ecommerce",
    "roleLabel": "marketing",
    "roleTitle": "Marketing",
    "industryLabel": "e-commerce",
    "where": "marketing jobs in e-commerce",
    "title": "Skills Employers Ask For in Marketing Jobs in E-commerce, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,734 marketing jobs in e-commerce: Google Ads, Performance marketing, Meta Ads, SEO. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in marketing jobs in e-commerce",
    "answer": "In 1,734 marketing jobs in e-commerce in the SkillDrift job index, the most requested skill is Google Ads, named in 31.1% of postings. Performance marketing follows at 24.9%, then Meta Ads at 24.5%.",
    "sample": 1734,
    "skills": [
      {
        "name": "Google Ads",
        "count": 540,
        "pct": 31.1
      },
      {
        "name": "Performance marketing",
        "count": 432,
        "pct": 24.9
      },
      {
        "name": "Meta Ads",
        "count": 425,
        "pct": 24.5
      },
      {
        "name": "SEO",
        "count": 360,
        "pct": 20.8
      },
      {
        "name": "Digital marketing",
        "count": 282,
        "pct": 16.3
      },
      {
        "name": "Campaign optimization",
        "count": 270,
        "pct": 15.6
      },
      {
        "name": "Keyword research",
        "count": 265,
        "pct": 15.3
      },
      {
        "name": "Google Analytics",
        "count": 259,
        "pct": 14.9
      }
    ],
    "guides": [
      {
        "href": "/skills/marketing",
        "label": "Marketing skills"
      }
    ]
  },
  {
    "slug": "marketing-jobs-in-healthtech",
    "roleKey": "marketing",
    "industryKey": "healthtech",
    "roleLabel": "marketing",
    "roleTitle": "Marketing",
    "industryLabel": "health tech",
    "where": "marketing jobs in health tech",
    "title": "Skills Employers Ask For in Marketing Jobs in Health Tech, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,080 marketing jobs in health tech: Digital marketing, SEO, Google Ads, Content creation. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in marketing jobs in health tech",
    "answer": "In 1,080 marketing jobs in health tech in the SkillDrift job index, the most requested skill is Digital marketing, named in 23.2% of postings. SEO follows at 22.3%, then Google Ads at 18.1%.",
    "sample": 1080,
    "skills": [
      {
        "name": "Digital marketing",
        "count": 251,
        "pct": 23.2
      },
      {
        "name": "SEO",
        "count": 241,
        "pct": 22.3
      },
      {
        "name": "Google Ads",
        "count": 196,
        "pct": 18.1
      },
      {
        "name": "Content creation",
        "count": 149,
        "pct": 13.8
      },
      {
        "name": "Social media marketing",
        "count": 148,
        "pct": 13.7
      },
      {
        "name": "Meta Ads",
        "count": 141,
        "pct": 13.1
      },
      {
        "name": "Google Analytics",
        "count": 134,
        "pct": 12.4
      },
      {
        "name": "Lead generation",
        "count": 133,
        "pct": 12.3
      }
    ],
    "guides": [
      {
        "href": "/skills/marketing",
        "label": "Marketing skills"
      }
    ]
  },
  {
    "slug": "marketing-jobs-in-media-entertainment",
    "roleKey": "marketing",
    "industryKey": "media_entertainment",
    "roleLabel": "marketing",
    "roleTitle": "Marketing",
    "industryLabel": "media and entertainment",
    "where": "marketing jobs in media and entertainment",
    "title": "Skills Employers Ask For in Marketing Jobs in Media and Entertainment, October 2026 | SkillDrift",
    "description": "The skills named most often in 3,437 marketing jobs in media and entertainment: SEO, Digital marketing, Social media marketing, Google Ads. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in marketing jobs in media and entertainment",
    "answer": "In 3,437 marketing jobs in media and entertainment in the SkillDrift job index, the most requested skill is SEO, named in 18.1% of postings. Digital marketing follows at 17.6%, then Social media marketing at 17.4%.",
    "sample": 3437,
    "skills": [
      {
        "name": "SEO",
        "count": 621,
        "pct": 18.1
      },
      {
        "name": "Digital marketing",
        "count": 605,
        "pct": 17.6
      },
      {
        "name": "Social media marketing",
        "count": 597,
        "pct": 17.4
      },
      {
        "name": "Google Ads",
        "count": 551,
        "pct": 16
      },
      {
        "name": "Content creation",
        "count": 456,
        "pct": 13.3
      },
      {
        "name": "Google Analytics",
        "count": 438,
        "pct": 12.7
      },
      {
        "name": "Keyword research",
        "count": 437,
        "pct": 12.7
      },
      {
        "name": "Social media management",
        "count": 419,
        "pct": 12.2
      }
    ],
    "guides": [
      {
        "href": "/skills/marketing",
        "label": "Marketing skills"
      }
    ]
  },
  {
    "slug": "marketing-jobs-in-software",
    "roleKey": "marketing",
    "industryKey": "software",
    "roleLabel": "marketing",
    "roleTitle": "Marketing",
    "industryLabel": "software",
    "where": "marketing jobs in software",
    "title": "Skills Employers Ask For in Marketing Jobs in Software, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,141 marketing jobs in software: SEO, Digital marketing, Keyword research, Google Ads. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in marketing jobs in software",
    "answer": "In 2,141 marketing jobs in software in the SkillDrift job index, the most requested skill is SEO, named in 33.2% of postings. Digital marketing follows at 22.2%, then Keyword research at 20.8%.",
    "sample": 2141,
    "skills": [
      {
        "name": "SEO",
        "count": 710,
        "pct": 33.2
      },
      {
        "name": "Digital marketing",
        "count": 475,
        "pct": 22.2
      },
      {
        "name": "Keyword research",
        "count": 446,
        "pct": 20.8
      },
      {
        "name": "Google Ads",
        "count": 386,
        "pct": 18
      },
      {
        "name": "Social media marketing",
        "count": 379,
        "pct": 17.7
      },
      {
        "name": "Email marketing",
        "count": 356,
        "pct": 16.6
      },
      {
        "name": "Google Analytics",
        "count": 352,
        "pct": 16.4
      },
      {
        "name": "Lead generation",
        "count": 328,
        "pct": 15.3
      }
    ],
    "guides": [
      {
        "href": "/skills/marketing",
        "label": "Marketing skills"
      }
    ]
  },
  {
    "slug": "operations-jobs-in-consulting",
    "roleKey": "operations",
    "industryKey": "consulting",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "consulting",
    "where": "operations jobs in consulting",
    "title": "Skills Employers Ask For in Operations Jobs in Consulting, October 2026 | SkillDrift",
    "description": "The skills named most often in 3,906 operations jobs in consulting: Stakeholder management, Project management, Excel, Data analysis. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in consulting",
    "answer": "In 3,906 operations jobs in consulting in the SkillDrift job index, the most requested skill is Stakeholder management, named in 20.7% of postings. Project management follows at 12.9%, then Excel at 10.2%.",
    "sample": 3906,
    "skills": [
      {
        "name": "Stakeholder management",
        "count": 807,
        "pct": 20.7
      },
      {
        "name": "Project management",
        "count": 502,
        "pct": 12.9
      },
      {
        "name": "Excel",
        "count": 399,
        "pct": 10.2
      },
      {
        "name": "Data analysis",
        "count": 357,
        "pct": 9.1
      },
      {
        "name": "Risk management",
        "count": 245,
        "pct": 6.3
      },
      {
        "name": "PowerPoint",
        "count": 226,
        "pct": 5.8
      },
      {
        "name": "Change management",
        "count": 208,
        "pct": 5.3
      },
      {
        "name": "Reporting",
        "count": 206,
        "pct": 5.3
      }
    ],
    "guides": []
  },
  {
    "slug": "operations-jobs-in-ecommerce",
    "roleKey": "operations",
    "industryKey": "ecommerce",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "e-commerce",
    "where": "operations jobs in e-commerce",
    "title": "Skills Employers Ask For in Operations Jobs in E-commerce, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,920 operations jobs in e-commerce: Inventory management, Excel, Google Sheets, Data entry. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in e-commerce",
    "answer": "In 1,920 operations jobs in e-commerce in the SkillDrift job index, the most requested skill is Inventory management, named in 24.6% of postings. Excel follows at 20.5%, then Google Sheets at 13.4%.",
    "sample": 1920,
    "skills": [
      {
        "name": "Inventory management",
        "count": 472,
        "pct": 24.6
      },
      {
        "name": "Excel",
        "count": 394,
        "pct": 20.5
      },
      {
        "name": "Google Sheets",
        "count": 258,
        "pct": 13.4
      },
      {
        "name": "Data entry",
        "count": 251,
        "pct": 13.1
      },
      {
        "name": "Data analysis",
        "count": 209,
        "pct": 10.9
      },
      {
        "name": "Order processing",
        "count": 163,
        "pct": 8.5
      },
      {
        "name": "Warehouse operations",
        "count": 154,
        "pct": 8
      },
      {
        "name": "Order fulfillment",
        "count": 108,
        "pct": 5.6
      }
    ],
    "guides": []
  },
  {
    "slug": "operations-jobs-in-energy",
    "roleKey": "operations",
    "industryKey": "energy",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "energy",
    "where": "operations jobs in energy",
    "title": "Skills Employers Ask For in Operations Jobs in Energy, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,338 operations jobs in energy: Stakeholder management, Project management, Risk management, Vendor management. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in energy",
    "answer": "In 1,338 operations jobs in energy in the SkillDrift job index, the most requested skill is Stakeholder management, named in 17.4% of postings. Project management follows at 12.5%, then Risk management at 9.5%.",
    "sample": 1338,
    "skills": [
      {
        "name": "Stakeholder management",
        "count": 233,
        "pct": 17.4
      },
      {
        "name": "Project management",
        "count": 167,
        "pct": 12.5
      },
      {
        "name": "Risk management",
        "count": 127,
        "pct": 9.5
      },
      {
        "name": "Vendor management",
        "count": 124,
        "pct": 9.3
      },
      {
        "name": "Inventory management",
        "count": 113,
        "pct": 8.4
      },
      {
        "name": "Procurement",
        "count": 104,
        "pct": 7.8
      },
      {
        "name": "Excel",
        "count": 97,
        "pct": 7.2
      },
      {
        "name": "Data analysis",
        "count": 93,
        "pct": 7
      }
    ],
    "guides": []
  },
  {
    "slug": "operations-jobs-in-government-nonprofit",
    "roleKey": "operations",
    "industryKey": "government_nonprofit",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "government and non-profit",
    "where": "operations jobs in government and non-profit",
    "title": "Skills Employers Ask For in Operations Jobs in Government and Non-profit, October 2026 | SkillDrift",
    "description": "The skills named most often in 3,448 operations jobs in government and non-profit: Communication, Stakeholder management, Project management, Documentation. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in government and non-profit",
    "answer": "In 3,448 operations jobs in government and non-profit in the SkillDrift job index, the most requested skill is Communication, named in 14.2% of postings. Stakeholder management follows at 12.9%, then Project management at 9.4%.",
    "sample": 3448,
    "skills": [
      {
        "name": "Communication",
        "count": 490,
        "pct": 14.2
      },
      {
        "name": "Stakeholder management",
        "count": 446,
        "pct": 12.9
      },
      {
        "name": "Project management",
        "count": 323,
        "pct": 9.4
      },
      {
        "name": "Documentation",
        "count": 286,
        "pct": 8.3
      },
      {
        "name": "Data entry",
        "count": 283,
        "pct": 8.2
      },
      {
        "name": "Reporting",
        "count": 271,
        "pct": 7.9
      },
      {
        "name": "Record keeping",
        "count": 262,
        "pct": 7.6
      },
      {
        "name": "MS Office",
        "count": 249,
        "pct": 7.2
      }
    ],
    "guides": []
  },
  {
    "slug": "operations-jobs-in-hospitality",
    "roleKey": "operations",
    "industryKey": "hospitality",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "hospitality",
    "where": "operations jobs in hospitality",
    "title": "Skills Employers Ask For in Operations Jobs in Hospitality, October 2026 | SkillDrift",
    "description": "The skills named most often in 8,676 operations jobs in hospitality: Customer service, Inventory management, Food safety, Food preparation. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in hospitality",
    "answer": "In 8,676 operations jobs in hospitality in the SkillDrift job index, the most requested skill is Customer service, named in 21.1% of postings. Inventory management follows at 15.4%, then Food safety at 12.7%.",
    "sample": 8676,
    "skills": [
      {
        "name": "Customer service",
        "count": 1827,
        "pct": 21.1
      },
      {
        "name": "Inventory management",
        "count": 1338,
        "pct": 15.4
      },
      {
        "name": "Food safety",
        "count": 1105,
        "pct": 12.7
      },
      {
        "name": "Food preparation",
        "count": 849,
        "pct": 9.8
      },
      {
        "name": "Guest service",
        "count": 791,
        "pct": 9.1
      },
      {
        "name": "Food presentation",
        "count": 434,
        "pct": 5
      },
      {
        "name": "Portion control",
        "count": 422,
        "pct": 4.9
      },
      {
        "name": "Restaurant operations",
        "count": 413,
        "pct": 4.8
      }
    ],
    "guides": []
  },
  {
    "slug": "operations-jobs-in-logistics",
    "roleKey": "operations",
    "industryKey": "logistics",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "logistics",
    "where": "operations jobs in logistics",
    "title": "Skills Employers Ask For in Operations Jobs in Logistics, October 2026 | SkillDrift",
    "description": "The skills named most often in 6,808 operations jobs in logistics: Inventory management, Warehouse operations, Excel, MS Excel. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in logistics",
    "answer": "In 6,808 operations jobs in logistics in the SkillDrift job index, the most requested skill is Inventory management, named in 18.2% of postings. Warehouse operations follows at 11.4%, then Excel at 9.9%.",
    "sample": 6808,
    "skills": [
      {
        "name": "Inventory management",
        "count": 1241,
        "pct": 18.2
      },
      {
        "name": "Warehouse operations",
        "count": 776,
        "pct": 11.4
      },
      {
        "name": "Excel",
        "count": 675,
        "pct": 9.9
      },
      {
        "name": "MS Excel",
        "count": 553,
        "pct": 8.1
      },
      {
        "name": "Inventory control",
        "count": 483,
        "pct": 7.1
      },
      {
        "name": "Logistics",
        "count": 480,
        "pct": 7.1
      },
      {
        "name": "Logistics operations",
        "count": 455,
        "pct": 6.7
      },
      {
        "name": "Safety compliance",
        "count": 455,
        "pct": 6.7
      }
    ],
    "guides": []
  },
  {
    "slug": "operations-jobs-in-manufacturing",
    "roleKey": "operations",
    "industryKey": "manufacturing",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "manufacturing",
    "where": "operations jobs in manufacturing",
    "title": "Skills Employers Ask For in Operations Jobs in Manufacturing, October 2026 | SkillDrift",
    "description": "The skills named most often in 11,630 operations jobs in manufacturing: Inventory management, Safety compliance, Vendor management, Excel. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in manufacturing",
    "answer": "In 11,630 operations jobs in manufacturing in the SkillDrift job index, the most requested skill is Inventory management, named in 12.6% of postings. Safety compliance follows at 8.9%, then Vendor management at 7.7%.",
    "sample": 11630,
    "skills": [
      {
        "name": "Inventory management",
        "count": 1463,
        "pct": 12.6
      },
      {
        "name": "Safety compliance",
        "count": 1039,
        "pct": 8.9
      },
      {
        "name": "Vendor management",
        "count": 892,
        "pct": 7.7
      },
      {
        "name": "Excel",
        "count": 863,
        "pct": 7.4
      },
      {
        "name": "MS Excel",
        "count": 836,
        "pct": 7.2
      },
      {
        "name": "Procurement",
        "count": 779,
        "pct": 6.7
      },
      {
        "name": "Project management",
        "count": 727,
        "pct": 6.3
      },
      {
        "name": "Quality control",
        "count": 700,
        "pct": 6
      }
    ],
    "guides": []
  },
  {
    "slug": "operations-jobs-in-pharma",
    "roleKey": "operations",
    "industryKey": "pharma",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "pharma",
    "where": "operations jobs in pharma",
    "title": "Skills Employers Ask For in Operations Jobs in Pharma, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,967 operations jobs in pharma: Regulatory compliance, Stakeholder management, Project management, Inventory management. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in pharma",
    "answer": "In 2,967 operations jobs in pharma in the SkillDrift job index, the most requested skill is Regulatory compliance, named in 13.6% of postings. Stakeholder management follows at 11.5%, then Project management at 9.4%.",
    "sample": 2967,
    "skills": [
      {
        "name": "Regulatory compliance",
        "count": 404,
        "pct": 13.6
      },
      {
        "name": "Stakeholder management",
        "count": 341,
        "pct": 11.5
      },
      {
        "name": "Project management",
        "count": 278,
        "pct": 9.4
      },
      {
        "name": "Inventory management",
        "count": 248,
        "pct": 8.4
      },
      {
        "name": "Pharmacovigilance",
        "count": 217,
        "pct": 7.3
      },
      {
        "name": "GMP",
        "count": 188,
        "pct": 6.3
      },
      {
        "name": "Vendor management",
        "count": 186,
        "pct": 6.3
      },
      {
        "name": "Quality assurance",
        "count": 178,
        "pct": 6
      }
    ],
    "guides": []
  },
  {
    "slug": "operations-jobs-in-real-estate",
    "roleKey": "operations",
    "industryKey": "real_estate",
    "roleLabel": "operations",
    "roleTitle": "Operations",
    "industryLabel": "real estate",
    "where": "operations jobs in real estate",
    "title": "Skills Employers Ask For in Operations Jobs in Real Estate, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,660 operations jobs in real estate: Vendor management, Stakeholder management, MS Office, Excel. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in operations jobs in real estate",
    "answer": "In 1,660 operations jobs in real estate in the SkillDrift job index, the most requested skill is Vendor management, named in 14.5% of postings. Stakeholder management follows at 13.4%, then MS Office at 11.3%.",
    "sample": 1660,
    "skills": [
      {
        "name": "Vendor management",
        "count": 241,
        "pct": 14.5
      },
      {
        "name": "Stakeholder management",
        "count": 223,
        "pct": 13.4
      },
      {
        "name": "MS Office",
        "count": 188,
        "pct": 11.3
      },
      {
        "name": "Excel",
        "count": 170,
        "pct": 10.2
      },
      {
        "name": "Project management",
        "count": 166,
        "pct": 10
      },
      {
        "name": "Reporting",
        "count": 145,
        "pct": 8.7
      },
      {
        "name": "Customer service",
        "count": 131,
        "pct": 7.9
      },
      {
        "name": "Budgeting",
        "count": 123,
        "pct": 7.4
      }
    ],
    "guides": []
  },
  {
    "slug": "product-jobs",
    "roleKey": "product",
    "industryKey": null,
    "roleLabel": "product",
    "roleTitle": "Product",
    "industryLabel": null,
    "where": "product jobs",
    "title": "Skills Employers Ask For in Product Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 4,895 product jobs: Product management, Business analysis, Data analysis, User stories. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in product jobs",
    "answer": "In 4,895 product jobs in the SkillDrift job index, the most requested skill is Product management, named in 31.2% of postings. Business analysis follows at 14.7%, then Data analysis at 13.3%.",
    "sample": 4895,
    "skills": [
      {
        "name": "Product management",
        "count": 1526,
        "pct": 31.2
      },
      {
        "name": "Business analysis",
        "count": 722,
        "pct": 14.7
      },
      {
        "name": "Data analysis",
        "count": 649,
        "pct": 13.3
      },
      {
        "name": "User stories",
        "count": 615,
        "pct": 12.6
      },
      {
        "name": "Project management",
        "count": 526,
        "pct": 10.7
      },
      {
        "name": "Agile",
        "count": 512,
        "pct": 10.5
      },
      {
        "name": "Jira",
        "count": 486,
        "pct": 9.9
      },
      {
        "name": "SQL",
        "count": 439,
        "pct": 9
      }
    ],
    "guides": [
      {
        "href": "/skills/product-manager",
        "label": "Product manager skills"
      }
    ]
  },
  {
    "slug": "product-jobs-in-fintech",
    "roleKey": "product",
    "industryKey": "fintech",
    "roleLabel": "product",
    "roleTitle": "Product",
    "industryLabel": "fintech",
    "where": "product jobs in fintech",
    "title": "Skills Employers Ask For in Product Jobs in Fintech, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,245 product jobs in fintech: Stakeholder management, Product management, Business analysis, SQL. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in product jobs in fintech",
    "answer": "In 1,245 product jobs in fintech in the SkillDrift job index, the most requested skill is Stakeholder management, named in 44.4% of postings. Product management follows at 33.3%, then Business analysis at 22.4%.",
    "sample": 1245,
    "skills": [
      {
        "name": "Stakeholder management",
        "count": 553,
        "pct": 44.4
      },
      {
        "name": "Product management",
        "count": 414,
        "pct": 33.3
      },
      {
        "name": "Business analysis",
        "count": 279,
        "pct": 22.4
      },
      {
        "name": "SQL",
        "count": 200,
        "pct": 16.1
      },
      {
        "name": "User stories",
        "count": 195,
        "pct": 15.7
      },
      {
        "name": "Data analysis",
        "count": 164,
        "pct": 13.2
      },
      {
        "name": "Agile",
        "count": 158,
        "pct": 12.7
      },
      {
        "name": "Jira",
        "count": 157,
        "pct": 12.6
      }
    ],
    "guides": [
      {
        "href": "/skills/product-manager",
        "label": "Product manager skills"
      }
    ]
  },
  {
    "slug": "product-jobs-in-software",
    "roleKey": "product",
    "industryKey": "software",
    "roleLabel": "product",
    "roleTitle": "Product",
    "industryLabel": "software",
    "where": "product jobs in software",
    "title": "Skills Employers Ask For in Product Jobs in Software, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,007 product jobs in software: Product management, User stories, Jira, Agile. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in product jobs in software",
    "answer": "In 1,007 product jobs in software in the SkillDrift job index, the most requested skill is Product management, named in 31.9% of postings. User stories follows at 14.3%, then Jira at 13.2%.",
    "sample": 1007,
    "skills": [
      {
        "name": "Product management",
        "count": 321,
        "pct": 31.9
      },
      {
        "name": "User stories",
        "count": 144,
        "pct": 14.3
      },
      {
        "name": "Jira",
        "count": 133,
        "pct": 13.2
      },
      {
        "name": "Agile",
        "count": 130,
        "pct": 12.9
      },
      {
        "name": "Business analysis",
        "count": 122,
        "pct": 12.1
      },
      {
        "name": "Project management",
        "count": 114,
        "pct": 11.3
      },
      {
        "name": "Data analysis",
        "count": 101,
        "pct": 10
      },
      {
        "name": "SQL",
        "count": 67,
        "pct": 6.7
      }
    ],
    "guides": [
      {
        "href": "/skills/product-manager",
        "label": "Product manager skills"
      }
    ]
  },
  {
    "slug": "research-jobs",
    "roleKey": "research",
    "industryKey": null,
    "roleLabel": "research",
    "roleTitle": "Research",
    "industryLabel": null,
    "where": "research jobs",
    "title": "Skills Employers Ask For in Research Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,382 research jobs: Data analysis, Python, Machine learning, Deep learning. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in research jobs",
    "answer": "In 2,382 research jobs in the SkillDrift job index, the most requested skill is Data analysis, named in 20.7% of postings. Python follows at 17.8%, then Machine learning at 11.2%.",
    "sample": 2382,
    "skills": [
      {
        "name": "Data analysis",
        "count": 493,
        "pct": 20.7
      },
      {
        "name": "Python",
        "count": 424,
        "pct": 17.8
      },
      {
        "name": "Machine learning",
        "count": 267,
        "pct": 11.2
      },
      {
        "name": "Deep learning",
        "count": 214,
        "pct": 9
      },
      {
        "name": "Market research",
        "count": 212,
        "pct": 8.9
      },
      {
        "name": "PyTorch",
        "count": 198,
        "pct": 8.3
      },
      {
        "name": "Excel",
        "count": 190,
        "pct": 8
      },
      {
        "name": "TensorFlow",
        "count": 126,
        "pct": 5.3
      }
    ],
    "guides": []
  },
  {
    "slug": "sales-jobs",
    "roleKey": "sales",
    "industryKey": null,
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": null,
    "where": "sales jobs",
    "title": "Skills Employers Ask For in Sales Jobs, October 2026 | SkillDrift",
    "description": "The skills named most often in 40,941 sales jobs: Sales, Negotiation, Lead generation, Business development. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs",
    "answer": "In 40,941 sales jobs in the SkillDrift job index, the most requested skill is Sales, named in 28.3% of postings. Negotiation follows at 26.2%, then Lead generation at 18.6%.",
    "sample": 40941,
    "skills": [
      {
        "name": "Sales",
        "count": 11576,
        "pct": 28.3
      },
      {
        "name": "Negotiation",
        "count": 10740,
        "pct": 26.2
      },
      {
        "name": "Lead generation",
        "count": 7635,
        "pct": 18.6
      },
      {
        "name": "Business development",
        "count": 7246,
        "pct": 17.7
      },
      {
        "name": "Client relationship management",
        "count": 5200,
        "pct": 12.7
      },
      {
        "name": "Customer relationship management",
        "count": 4901,
        "pct": 12
      },
      {
        "name": "Customer service",
        "count": 3887,
        "pct": 9.5
      },
      {
        "name": "CRM",
        "count": 3543,
        "pct": 8.7
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-edtech",
    "roleKey": "sales",
    "industryKey": "edtech",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "edtech",
    "where": "sales jobs in edtech",
    "title": "Skills Employers Ask For in Sales Jobs in Edtech, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,187 sales jobs in edtech: Sales, Negotiation, Lead generation, Business development. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in edtech",
    "answer": "In 1,187 sales jobs in edtech in the SkillDrift job index, the most requested skill is Sales, named in 37.1% of postings. Negotiation follows at 32.6%, then Lead generation at 24.6%.",
    "sample": 1187,
    "skills": [
      {
        "name": "Sales",
        "count": 440,
        "pct": 37.1
      },
      {
        "name": "Negotiation",
        "count": 387,
        "pct": 32.6
      },
      {
        "name": "Lead generation",
        "count": 292,
        "pct": 24.6
      },
      {
        "name": "Business development",
        "count": 251,
        "pct": 21.1
      },
      {
        "name": "CRM",
        "count": 203,
        "pct": 17.1
      },
      {
        "name": "Objection handling",
        "count": 177,
        "pct": 14.9
      },
      {
        "name": "Relationship building",
        "count": 155,
        "pct": 13.1
      },
      {
        "name": "Consultative selling",
        "count": 137,
        "pct": 11.5
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-fintech",
    "roleKey": "sales",
    "industryKey": "fintech",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "fintech",
    "where": "sales jobs in fintech",
    "title": "Skills Employers Ask For in Sales Jobs in Fintech, October 2026 | SkillDrift",
    "description": "The skills named most often in 7,943 sales jobs in fintech: Sales, Relationship management, Lead generation, Negotiation. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in fintech",
    "answer": "In 7,943 sales jobs in fintech in the SkillDrift job index, the most requested skill is Sales, named in 32.4% of postings. Relationship management follows at 18.8%, then Lead generation at 16.5%.",
    "sample": 7943,
    "skills": [
      {
        "name": "Sales",
        "count": 2577,
        "pct": 32.4
      },
      {
        "name": "Relationship management",
        "count": 1493,
        "pct": 18.8
      },
      {
        "name": "Lead generation",
        "count": 1310,
        "pct": 16.5
      },
      {
        "name": "Negotiation",
        "count": 1225,
        "pct": 15.4
      },
      {
        "name": "Client relationship management",
        "count": 1202,
        "pct": 15.1
      },
      {
        "name": "Business development",
        "count": 1176,
        "pct": 14.8
      },
      {
        "name": "Cross-selling",
        "count": 1143,
        "pct": 14.4
      },
      {
        "name": "Compliance",
        "count": 783,
        "pct": 9.9
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-healthtech",
    "roleKey": "sales",
    "industryKey": "healthtech",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "health tech",
    "where": "sales jobs in health tech",
    "title": "Skills Employers Ask For in Sales Jobs in Health Tech, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,827 sales jobs in health tech: Sales, Negotiation, Business development, Customer relationship management. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in health tech",
    "answer": "In 1,827 sales jobs in health tech in the SkillDrift job index, the most requested skill is Sales, named in 33.8% of postings. Negotiation follows at 26.1%, then Business development at 20.5%.",
    "sample": 1827,
    "skills": [
      {
        "name": "Sales",
        "count": 617,
        "pct": 33.8
      },
      {
        "name": "Negotiation",
        "count": 477,
        "pct": 26.1
      },
      {
        "name": "Business development",
        "count": 375,
        "pct": 20.5
      },
      {
        "name": "Customer relationship management",
        "count": 301,
        "pct": 16.5
      },
      {
        "name": "Lead generation",
        "count": 231,
        "pct": 12.6
      },
      {
        "name": "Stakeholder management",
        "count": 227,
        "pct": 12.4
      },
      {
        "name": "CRM",
        "count": 160,
        "pct": 8.8
      },
      {
        "name": "Account management",
        "count": 146,
        "pct": 8
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-hospitality",
    "roleKey": "sales",
    "industryKey": "hospitality",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "hospitality",
    "where": "sales jobs in hospitality",
    "title": "Skills Employers Ask For in Sales Jobs in Hospitality, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,121 sales jobs in hospitality: Sales, Negotiation, Customer service, Business development. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in hospitality",
    "answer": "In 1,121 sales jobs in hospitality in the SkillDrift job index, the most requested skill is Sales, named in 38.2% of postings. Negotiation follows at 36.8%, then Customer service at 22.6%.",
    "sample": 1121,
    "skills": [
      {
        "name": "Sales",
        "count": 428,
        "pct": 38.2
      },
      {
        "name": "Negotiation",
        "count": 413,
        "pct": 36.8
      },
      {
        "name": "Customer service",
        "count": 253,
        "pct": 22.6
      },
      {
        "name": "Business development",
        "count": 230,
        "pct": 20.5
      },
      {
        "name": "Client relationship management",
        "count": 190,
        "pct": 16.9
      },
      {
        "name": "Customer relationship management",
        "count": 186,
        "pct": 16.6
      },
      {
        "name": "Account management",
        "count": 167,
        "pct": 14.9
      },
      {
        "name": "CRM",
        "count": 118,
        "pct": 10.5
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-manufacturing",
    "roleKey": "sales",
    "industryKey": "manufacturing",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "manufacturing",
    "where": "sales jobs in manufacturing",
    "title": "Skills Employers Ask For in Sales Jobs in Manufacturing, October 2026 | SkillDrift",
    "description": "The skills named most often in 3,644 sales jobs in manufacturing: Negotiation, Sales, Business development, Customer relationship management. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in manufacturing",
    "answer": "In 3,644 sales jobs in manufacturing in the SkillDrift job index, the most requested skill is Negotiation, named in 35% of postings. Sales follows at 29.1%, then Business development at 22.5%.",
    "sample": 3644,
    "skills": [
      {
        "name": "Negotiation",
        "count": 1276,
        "pct": 35
      },
      {
        "name": "Sales",
        "count": 1060,
        "pct": 29.1
      },
      {
        "name": "Business development",
        "count": 820,
        "pct": 22.5
      },
      {
        "name": "Customer relationship management",
        "count": 814,
        "pct": 22.3
      },
      {
        "name": "Lead generation",
        "count": 637,
        "pct": 17.5
      },
      {
        "name": "B2B sales",
        "count": 487,
        "pct": 13.4
      },
      {
        "name": "Client relationship management",
        "count": 443,
        "pct": 12.2
      },
      {
        "name": "Account management",
        "count": 297,
        "pct": 8.2
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-media-entertainment",
    "roleKey": "sales",
    "industryKey": "media_entertainment",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "media and entertainment",
    "where": "sales jobs in media and entertainment",
    "title": "Skills Employers Ask For in Sales Jobs in Media and Entertainment, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,523 sales jobs in media and entertainment: Client relationship management, Business development, Sales, Lead generation. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in media and entertainment",
    "answer": "In 1,523 sales jobs in media and entertainment in the SkillDrift job index, the most requested skill is Client relationship management, named in 28.5% of postings. Business development follows at 27.8%, then Sales at 27.7%.",
    "sample": 1523,
    "skills": [
      {
        "name": "Client relationship management",
        "count": 434,
        "pct": 28.5
      },
      {
        "name": "Business development",
        "count": 424,
        "pct": 27.8
      },
      {
        "name": "Sales",
        "count": 422,
        "pct": 27.7
      },
      {
        "name": "Lead generation",
        "count": 417,
        "pct": 27.4
      },
      {
        "name": "B2B sales",
        "count": 218,
        "pct": 14.3
      },
      {
        "name": "CRM",
        "count": 197,
        "pct": 12.9
      },
      {
        "name": "Sales pipeline management",
        "count": 194,
        "pct": 12.7
      },
      {
        "name": "Digital marketing",
        "count": 160,
        "pct": 10.5
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-real-estate",
    "roleKey": "sales",
    "industryKey": "real_estate",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "real estate",
    "where": "sales jobs in real estate",
    "title": "Skills Employers Ask For in Sales Jobs in Real Estate, October 2026 | SkillDrift",
    "description": "The skills named most often in 1,834 sales jobs in real estate: Negotiation, Sales, Lead generation, Client relationship management. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in real estate",
    "answer": "In 1,834 sales jobs in real estate in the SkillDrift job index, the most requested skill is Negotiation, named in 47.1% of postings. Sales follows at 29.1%, then Lead generation at 28.8%.",
    "sample": 1834,
    "skills": [
      {
        "name": "Negotiation",
        "count": 864,
        "pct": 47.1
      },
      {
        "name": "Sales",
        "count": 533,
        "pct": 29.1
      },
      {
        "name": "Lead generation",
        "count": 528,
        "pct": 28.8
      },
      {
        "name": "Client relationship management",
        "count": 444,
        "pct": 24.2
      },
      {
        "name": "Real estate sales",
        "count": 421,
        "pct": 23
      },
      {
        "name": "Business development",
        "count": 253,
        "pct": 13.8
      },
      {
        "name": "CRM",
        "count": 252,
        "pct": 13.7
      },
      {
        "name": "Market research",
        "count": 151,
        "pct": 8.2
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-retail",
    "roleKey": "sales",
    "industryKey": "retail",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "retail",
    "where": "sales jobs in retail",
    "title": "Skills Employers Ask For in Sales Jobs in Retail, October 2026 | SkillDrift",
    "description": "The skills named most often in 2,557 sales jobs in retail: Customer service, Sales, Negotiation, Inventory management. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in retail",
    "answer": "In 2,557 sales jobs in retail in the SkillDrift job index, the most requested skill is Customer service, named in 41.8% of postings. Sales follows at 36.2%, then Negotiation at 13.8%.",
    "sample": 2557,
    "skills": [
      {
        "name": "Customer service",
        "count": 1069,
        "pct": 41.8
      },
      {
        "name": "Sales",
        "count": 925,
        "pct": 36.2
      },
      {
        "name": "Negotiation",
        "count": 354,
        "pct": 13.8
      },
      {
        "name": "Inventory management",
        "count": 308,
        "pct": 12
      },
      {
        "name": "Visual merchandising",
        "count": 289,
        "pct": 11.3
      },
      {
        "name": "Product knowledge",
        "count": 286,
        "pct": 11.2
      },
      {
        "name": "Retail sales",
        "count": 279,
        "pct": 10.9
      },
      {
        "name": "Cash handling",
        "count": 143,
        "pct": 5.6
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  },
  {
    "slug": "sales-jobs-in-software",
    "roleKey": "sales",
    "industryKey": "software",
    "roleLabel": "sales",
    "roleTitle": "Sales",
    "industryLabel": "software",
    "where": "sales jobs in software",
    "title": "Skills Employers Ask For in Sales Jobs in Software, October 2026 | SkillDrift",
    "description": "The skills named most often in 4,820 sales jobs in software: Negotiation, Lead generation, Business development, Sales pipeline management. Live job index data, and a way to check your own resume against them.",
    "h1": "Skills employers ask for in sales jobs in software",
    "answer": "In 4,820 sales jobs in software in the SkillDrift job index, the most requested skill is Negotiation, named in 31.4% of postings. Lead generation follows at 26.5%, then Business development at 19.4%.",
    "sample": 4820,
    "skills": [
      {
        "name": "Negotiation",
        "count": 1515,
        "pct": 31.4
      },
      {
        "name": "Lead generation",
        "count": 1279,
        "pct": 26.5
      },
      {
        "name": "Business development",
        "count": 933,
        "pct": 19.4
      },
      {
        "name": "Sales pipeline management",
        "count": 747,
        "pct": 15.5
      },
      {
        "name": "Sales",
        "count": 737,
        "pct": 15.3
      },
      {
        "name": "CRM",
        "count": 713,
        "pct": 14.8
      },
      {
        "name": "B2B sales",
        "count": 707,
        "pct": 14.7
      },
      {
        "name": "Cold calling",
        "count": 636,
        "pct": 13.2
      }
    ],
    "guides": [
      {
        "href": "/skills/sales-executive",
        "label": "Sales executive skills"
      }
    ]
  }
];

export const getDemandPage = (slug: string) => DEMAND_PAGES.find((p) => p.slug === slug);

// Same role, other industries (and the all-industries page), largest first.
export const sameRole = (p: DemandPage) =>
  DEMAND_PAGES.filter((q) => q.roleKey === p.roleKey && q.slug !== p.slug).sort((a, b) => b.sample - a.sample);

// Same industry, other roles, largest first. Empty for an all-industries page.
export const sameIndustry = (p: DemandPage) =>
  p.industryKey
    ? DEMAND_PAGES.filter((q) => q.industryKey === p.industryKey && q.slug !== p.slug).sort((a, b) => b.sample - a.sample)
    : [];
