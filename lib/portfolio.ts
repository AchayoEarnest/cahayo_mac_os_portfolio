export const PORTFOLIO = {
  name: "Earnest Odhiambo Achayo",
  firstName: "Earnest",
  title: "Data Analyst | Software Engineer",
  email: "earnytechlive@gmail.com",
  phone: ["0111486539", "0739536402"],
  location: "Kenya",
  github: "https://github.com/AchayoEarnest",
  linkedin: "https://www.linkedin.com/in/earnest-achayo-3a8295244",
  avatar: "https://images.pexels.com/photos/37094968/pexels-photo-37094968.jpeg",
  cvLink: "https://drive.google.com/file/d/1pqMP4CdC_ClKl9JhIqAXoa090_LDAgZ-/view",

  summary:
    "Results-driven Data Analyst with 4+ years experience in data management, analysis, visualization, and automated data pipelines across healthcare and technology sectors. Skilled in SQL, Python, Power BI, and statistical analysis, delivering actionable insights that improve operational efficiency and decision-making.",

  typingWords: ["Data Analyst", "Software Engineer", "Data Storyteller"],

  stats: [
    { label: "Years Experience", value: "4+" },
    { label: "Projects Completed", value: "120+" },
    { label: "Data Accuracy Improved", value: "96%" },
    { label: "Reporting Time Saved", value: "60%" },
  ],

  skills: {
    programming: ["Python", "SQL", "JavaScript", "R (Basic)"],
    dataTools: ["Pandas", "NumPy", "SciPy", "Excel", "Google Sheets", "Google App Scripts"],
    visualization: ["Power BI", "Matplotlib", "Seaborn", "Plotly"],
    databases: ["MySQL", "PostgreSQL", "SQLite"],
    systems: ["DHIS2", "KHIS", "Taifa Care", "EMR Systems", "C-PAD", "DREAMS Heathstrat"],
    tools: ["Git/GitHub", "Jupyter Notebook", "VS Code", "Agile workflows", "Figma", "Canvas"],
  },

  softSkills: [
    { name: "Data Storytelling", level: 95 },
    { name: "Communication", level: 90 },
    { name: "Problem Solving", level: 92 },
    { name: "Leadership", level: 85 },
  ],

  experience: [
    {
      position: "Data Officer",
      company: "Center for Health Solutions (CHS)",
      location: "Ugenya Sub-County",
      period: "March 2023 – September 2025",
      color: "#0d9488",
      achievements: [
        "Automated reporting reducing processing time by 60%",
        "Improved data accuracy from 78% → 96%",
        "Built real-time dashboards for 5,000+ participants",
        "Statistical analysis improving service delivery by 35%",
      ],
    },
    {
      position: "Software Developer",
      company: "Moringa School",
      location: "Kenya",
      period: "March 2022 – November 2022",
      color: "#6366f1",
      achievements: [
        "Built data-driven web applications",
        "Designed optimized SQL schemas",
        "Developed REST APIs",
      ],
    },
    {
      position: "Data Clerk & Health Information Analyst",
      company: "ICAP Kenya",
      location: "Kenya",
      period: "March 2013 – September 2016",
      color: "#f59e0b",
      achievements: [
        "Data quality assessments across 10+ facilities",
        "Staff training on data management",
        "Health system data management",
      ],
    },
  ],

  projects: [
    {
      title: "Hospital & Clinic Analytics Platform",
      description:
        "Full-stack analytics platform surfacing real-time utilization and care-delivery KPIs for hospital and clinic operations teams.",
      tools: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/AchayoEarnest/DAAS",
      color: "#ef4444",
      icon: "🏥",
    },
    {
      title: "Health Program KPI Dashboard",
      description:
        "Power BI dashboard tracking 25+ KPIs with automated refresh for real-time program monitoring and leadership reporting.",
      tools: ["Power BI", "SQL", "Data Visualization"],
      github: "https://github.com/AchayoEarnest",
      color: "#0d9488",
      icon: "📊",
    },
    {
      title: "Data Quality Assessment Tool",
      description:
        "Django web application for automated data quality assessments — validation checks, completeness scoring, and reporting across facility-level datasets.",
      tools: ["Python", "Django", "Data Quality"],
      github: "https://github.com/AchayoEarnest/chs_data_quality_assessment_tool",
      color: "#6366f1",
      icon: "⚙️",
    },
    {
      title: "Community Intervention Tracker",
      description:
        "Django REST application for tracking community-based interventions and service delivery data for adolescent girls and young women.",
      tools: ["Django", "PostgreSQL", "REST API"],
      github: "https://github.com/AchayoEarnest/community_intervention_app",
      color: "#f59e0b",
      icon: "📋",
    },
    {
      title: "Trend Analysis & Forecasting",
      description:
        "Time series analysis and forecasting model for predicting program enrollment and identifying key trends.",
      tools: ["Python", "Statistical Analysis", "Forecasting"],
      github: "https://github.com/AchayoEarnest",
      color: "#ec4899",
      icon: "📈",
    },
    {
      title: "Kenest Hotel Management System",
      description:
        "Full-stack hotel management system with an Elixir/Phoenix backend and Next.js frontend, covering bookings, rooms, and billing.",
      tools: ["Elixir", "Phoenix", "Next.js"],
      github: "https://github.com/AchayoEarnest/kenest-hotel-hms",
      color: "#8b5cf6",
      icon: "🏨",
    },
    {
      title: "Afya Provider Portal",
      description:
        "Healthcare provider portal built as an Elixir/Phoenix + Next.js monorepo for managing patient records and service workflows.",
      tools: ["Elixir", "Phoenix", "Next.js"],
      github: "https://github.com/AchayoEarnest/afya-provider-portal-web",
      color: "#10b981",
      icon: "🩺",
    },
  ],

  certifications: [
    { name: "Data Analytics Certificate", issuer: "ALX Africa", year: "2024" },
    { name: "Professional Foundations Certificate", issuer: "ALX Africa", year: "2024" },
    { name: "Software Development Certificate", issuer: "Moringa School", year: "2022" },
    { name: "Data Science Specialization", issuer: "ALX Africa", year: "Ongoing 2024" },
  ],

  education: [
    { degree: "Data Science Course", school: "ALX Africa", year: "2024 – 2025" },
    { degree: "Certificate in Software Development", school: "Moringa School", year: "2022" },
    { degree: "Diploma in Information Technology", school: "Foundation Institute of Africa", year: "2011" },
    { degree: "KCSE", school: "Simenya Secondary School", year: "2010" },
  ],
};

export type Portfolio = typeof PORTFOLIO;
