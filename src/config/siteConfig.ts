// Central portfolio configuration — edit personal info, projects, and links here
export const siteConfig = {
  name: 'Nishanth M S',
  shortName: 'NISHANTH.MS',
  title: 'Nishanth M S | Data Analytics, Machine Learning & AI',
  description: 'Explore Nishanth M S\'s portfolio of data analytics, machine learning, AI applications, and interactive data visualization projects.',
  tagline: 'I TURN DATA\nINTO INTELLIGENCE.',
  role: 'Computer Science Graduate · Data Analytics · Machine Learning · AI Engineering',
  heroDescription: 'I explore data, uncover meaningful patterns, and build intelligent applications that transform ideas into useful products.',
  availability: 'OPEN TO OPPORTUNITIES',

  about: {
    sectionLabel: '01 / THE THINKING',
    headline: 'CURIOUS BY NATURE.\nANALYTICAL BY DESIGN.',
    paragraphs: [
      "I'm Nishanth, a Computer Science and Engineering graduate with a strong interest in data analytics, machine learning, and artificial intelligence.",
      "I enjoy exploring datasets, finding patterns that aren't immediately obvious, and building applications that turn technical ideas into practical solutions.",
      "My interests span the complete data journey—from extracting and cleaning information to exploratory analysis, predictive modeling, visualization, and intelligent application development.",
      "I'm continuously experimenting with new tools, improving my engineering skills, and looking for opportunities to solve meaningful problems with data and technology.",
    ],
    journey: ['RAW DATA', 'INSIGHTS', 'INTELLIGENCE', 'IMPACT'],
  },

  skills: {
    sectionLabel: '02 / THE TOOLKIT',
    headline: 'TOOLS ARE MY INSTRUMENTS.\nDATA IS MY PLAYGROUND.',
    categories: [
      {
        name: 'DATA ANALYTICS',
        icon: '📊',
        color: '#00E5FF',
        items: ['SQL', 'Python', 'Pandas', 'NumPy', 'Excel', 'Power BI', 'Matplotlib', 'Seaborn'],
      },
      {
        name: 'MACHINE LEARNING',
        icon: '🧠',
        color: '#7C3AED',
        items: ['Scikit-learn', 'Regression', 'Classification', 'Clustering', 'Exploratory Data Analysis', 'Feature Engineering', 'Model Evaluation', 'Statistical Analysis'],
      },
      {
        name: 'AI & APPLICATION DEV',
        icon: '⚡',
        color: '#06D6A0',
        items: ['AI App Development', 'LLM-powered Apps', 'AI Agents', 'API Integration', 'Streamlit', 'Flask'],
      },
      {
        name: 'PROGRAMMING & TOOLS',
        icon: '🔧',
        color: '#F59E0B',
        items: ['Python', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'Git', 'GitHub'],
      },
    ],
    connections: {
      'Python': ['Data Processing', 'Machine Learning', 'Predictive Insights'],
      'SQL': ['Data Extraction', 'Analysis', 'Business Intelligence'],
      'Scikit-learn': ['Model Training', 'Evaluation', 'Prediction'],
      'Streamlit': ['Rapid Prototyping', 'Data Apps', 'Interactive Dashboards'],
      'Pandas': ['Data Wrangling', 'Feature Engineering', 'Analysis'],
      'Power BI': ['Visualization', 'Dashboards', 'Business Reporting'],
      'Flask': ['API Development', 'Web Services', 'Backend Logic'],
      'NumPy': ['Numerical Computing', 'Array Operations', 'Scientific Analysis'],
    } as Record<string, string[]>,
  },

  projects: {
    sectionLabel: '03 / SELECTED WORK',
    headline: 'FROM RAW DATA TO\nREAL-WORLD INTELLIGENCE.',
    subtitle: 'Four projects. Four different challenges. One constant curiosity about what technology can make possible.',
    items: [
      {
        id: 'jobpulse',
        number: '01',
        name: 'JobPulse',
        category: 'AI Applications / Data Analytics / Job Market Intelligence',
        tagline: 'FIND OPPORTUNITIES. UNDERSTAND THE MARKET.',
        description: 'JobPulse is an AI-powered job market intelligence platform that helps users explore career opportunities, discover relevant job listings, and gain insights into market trends. Built with Streamlit, it combines data analytics with intelligent search to make career exploration more accessible and data-driven.',
        features: [
          'Job discovery and exploration with intelligent search',
          'Skill and role matching based on user preferences',
          'Job market trend analysis and insights',
          'AI-powered recommendations and filtering',
          'Interactive data visualizations for market intelligence',
        ],
        techStack: ['Python', 'Streamlit', 'Pandas', 'AI/LLM Integration', 'Data Analytics'],
        challenges: 'Designing an intuitive interface that balances comprehensive market data with user-friendly navigation. Integrating AI capabilities to provide meaningful job recommendations while maintaining fast response times.',
        liveUrl: 'https://jobpulse-ai-on5b.onrender.com',
        accentColor: '#00E5FF',
        gradientFrom: '#00E5FF',
        gradientTo: '#0091EA',
      },
      {
        id: 'predictive-retail',
        number: '02',
        name: 'Predictive Retail Analytics Platform',
        category: 'Machine Learning / Predictive Analytics / Retail Intelligence',
        tagline: 'SEE THE PATTERNS. ANTICIPATE WHAT COMES NEXT.',
        description: 'Predictive Retail explores the application of data analytics and predictive modeling to retail-related problems. The platform provides tools for exploring historical retail data, identifying trends, and generating predictive insights using machine learning techniques.',
        features: [
          'Historical data exploration and trend analysis',
          'Predictive analytics with machine learning models',
          'Product and category performance comparison',
          'Interactive retail intelligence dashboards',
          'Statistical analysis and pattern recognition',
        ],
        techStack: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Statistical Analysis'],
        challenges: 'Building reliable predictive models on retail datasets with varying data quality. Creating visualizations that clearly communicate both historical patterns and predictive outputs to non-technical users.',
        liveUrl: 'https://predictive-retail-analytics-platform.onrender.com',
        accentColor: '#7C3AED',
        gradientFrom: '#7C3AED',
        gradientTo: '#5B21B6',
      },
      {
        id: 'nexus-ai',
        number: '03',
        name: 'Nexus AI',
        category: 'Machine Learning / Demand Forecasting / Pricing Optimization',
        tagline: 'THE RIGHT PRICE ISN\'T GUESSED. IT\'S ENGINEERED.',
        description: 'Nexus AI is an enterprise-oriented AI pricing console focused on XGBoost-powered demand forecasting and profit optimization. The application features an executive dashboard with pricing recommendations, demand and profit elasticity curves, scenario exploration, sensitivity analysis, simulation capabilities, and AI diagnostics.',
        features: [
          'XGBoost-powered demand forecasting engine',
          'Dynamic pricing recommendations',
          'Demand and profit elasticity analysis',
          'Scenario exploration and sensitivity analysis',
          'Executive dashboard with financial metrics',
          'AI diagnostics and model evaluation',
        ],
        techStack: ['Python', 'Streamlit', 'XGBoost', 'Scikit-learn', 'Pandas', 'NumPy', 'Plotly'],
        challenges: 'Implementing a robust demand forecasting pipeline that translates complex XGBoost predictions into actionable pricing strategies. Balancing model complexity with interpretability for business decision-making.',
        liveUrl: 'https://dynamic-pricing-engine-on9y.onrender.com/',
        accentColor: '#06D6A0',
        gradientFrom: '#06D6A0',
        gradientTo: '#00B4D8',
        isFlagship: true,
        architectureSteps: [
          'PRODUCT INPUTS',
          'FEATURE PREPARATION',
          'XGBOOST DEMAND FORECASTING',
          'PRICING STRATEGY EVALUATION',
          'FINANCIAL ANALYSIS',
          'PRICING RECOMMENDATION',
        ],
      },
      {
        id: 'trendlens',
        number: '04',
        name: 'TrendLens',
        category: 'Data Analytics / AI Applications / Content Intelligence',
        tagline: 'DISCOVER THE SIGNAL BEHIND THE CONTENT.',
        description: 'TrendLens is a content intelligence platform focused on exploring YouTube content through data analysis, content discovery, and AI-powered features. It integrates with the YouTube Data API to provide video performance analytics, content recommendations, and trend exploration tools.',
        features: [
          'YouTube Data API v3 integration',
          'Video performance analysis and metrics',
          'Content trend exploration and discovery',
          'Engagement analytics and visualization',
          'Content recommendation engine',
          'Interactive content intelligence dashboard',
        ],
        techStack: ['Python', 'Streamlit', 'YouTube Data API v3', 'Pandas', 'NLP', 'Data Visualization'],
        challenges: 'Effectively integrating with the YouTube Data API while managing rate limits and data freshness. Designing analytics that reveal meaningful content patterns without overwhelming users with raw metrics.',
        liveUrl: 'https://trendlens-vdwt.onrender.com',
        accentColor: '#F59E0B',
        gradientFrom: '#F59E0B',
        gradientTo: '#EF4444',
      },
    ],
  },

  experience: {
    sectionLabel: '05 / THE JOURNEY',
    items: [
      {
        type: 'education' as const,
        title: 'Bachelor of Engineering in Computer Science and Engineering',
        organization: 'AGM Rural College of Engineering and Technology',
        period: '2022 — 2026',
        description: 'Focused on computer science fundamentals, data structures, algorithms, and specialized coursework in machine learning and data analytics.',
      },
      {
        type: 'work' as const,
        title: 'Data Science Intern',
        organization: 'Unlox',
        period: 'Feb 2026 — May 2026',
        description: 'Worked on Python-based data analysis, data preparation and visualization, machine learning fundamentals, and building analytical solutions.',
      },
      {
        type: 'work' as const,
        title: 'Data Analyst Intern',
        organization: 'Rubixe',
        period: 'May 2026 — Aug 2026',
        description: 'Contributed to data analytics projects, working with analytical tools and techniques to derive insights from datasets.',
      },
    ],
  },

  approach: {
    headline: 'FROM QUESTION TO CLARITY.',
    steps: [
      { number: '01', title: 'ASK', description: 'Understand the problem and define the question.' },
      { number: '02', title: 'EXPLORE', description: 'Inspect the data, identify patterns, and challenge assumptions.' },
      { number: '03', title: 'MODEL', description: 'Choose appropriate analytical techniques and evaluate the results.' },
      { number: '04', title: 'BUILD', description: 'Translate findings into dashboards, applications, or intelligent systems.' },
      { number: '05', title: 'REFINE', description: 'Validate the outcome, communicate insights, and improve the solution.' },
    ],
  },

  contact: {
    sectionLabel: '06 / THE NEXT CONNECTION',
    headline: 'HAVE A PROBLEM\nWORTH SOLVING?',
    description: "I'm always interested in meaningful problems, thoughtful collaborations, and opportunities to build useful things with data and technology.",
    email: 'nishms789@gmail.com',
    linkedin: 'https://linkedin.com/in/nishanthms', // Update with actual LinkedIn
    github: 'https://github.com/nishhh2004',
    resumeUrl: '/resume.pdf', // Place resume.pdf in public/ folder
  },

  footer: {
    tagline: 'Built with curiosity, code, and a little obsession with data.',
  },

  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
};

export type Project = typeof siteConfig.projects.items[number];
export type ExperienceItem = typeof siteConfig.experience.items[number];
export type SkillCategory = typeof siteConfig.skills.categories[number];
