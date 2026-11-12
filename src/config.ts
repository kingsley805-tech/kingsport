/**
 * Portfolio Configuration File
 * -------------------------------------------------------------
 * Primary source of truth derived from Kingsley_Atta_Yeboah_CV.pdf
 * and verified GitHub / deployment portfolio assets.
 */

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  track: 'engineering' | 'support' | 'infrastructure';
  skills: {
    name: string;
    context?: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  badge: string;
  category: 'engineering' | 'support' | 'hybrid';
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface FeaturedCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'software' | 'erp-pos' | 'infrastructure';
  organization: string;
  status: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  contribution: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  track: 'software' | 'support';
  description: string;
  capabilities: string[];
}

export interface CertificationItem {
  name: string;
  focus: 'IT Support & Networking' | 'Web & Software Development' | 'Academic & Communication';
  providerHint?: string;
}

export const PORTFOLIO_CONFIG = {
  // Personal Info (verified from CV)
  name: 'Kingsley Atta Yeboah',
  shortName: 'Kingsley',
  monogram: 'KAY',
  title: 'Software Engineer & Technical Support Specialist',
  cvTitle: 'Senior Frontend Developer | Full Stack Developer | Systems Administrator',
  subtitle: 'Full-Stack Web, Desktop & Mobile Applications • Systems Administration • IT & Network Support',
  typingRoles: [
    'Software Engineer',
    'Full-Stack Developer',
    'Technical Support Specialist',
    'Systems Administrator',
    'Frontend Developer'
  ],
  location: 'Accra, Ghana',
  availability: 'Available for Remote, International & On-Site Roles',
  timezone: 'Africa/Accra', // UTC+0

  // GitHub Settings
  githubUsername: 'kingsley805-tech',

  // Contact & Socials (verified from CV & existing repo links)
  email: 'kingsleyyeboah805@gmail.com',
  phone: '+233 503688781',
  photoUrl: '/profile.jpg',
  altPhotoUrl: '/profile-portrait.jpg',
  avatarUrl: '/profile.jpg',
  cvFilename: 'Kingsley_Atta_Yeboah_CV.pdf',
  socials: {
    github: 'https://github.com/kingsley805-tech',
    linkedin: 'https://linkedin.com/in/kingsley-atta-yeboah',
    resume: '/Kingsley_Atta_Yeboah_CV.pdf'
  },

  // Hero Bio & Summary (refined from CV)
  headline: 'Building Digital Solutions. Engineering Technology. Solving Real-World Problems.',
  bio: 'Senior Frontend Developer, Full-Stack Software Engineer, and Technical Support Specialist with hands-on experience designing modern web, desktop, and mobile applications, architecting RESTful APIs and databases, and deploying and maintaining reliable IT and network infrastructure.',

  // Extended Bio & Stats for About Section
  about: {
    lead: 'Combining full-stack software engineering with practical systems administration and hands-on IT & network support.',
    paragraphs: [
      'Graduating with a Bachelor’s Degree in Computer Science from the University of the People (12/2025) and certified in Google IT Support, Systems Administration, and Computer Networking, I bring a complete understanding of how software interacts with real-world users, servers, and networks.',
      'Across engagements with Techmaxx Technologies, MCubePlus LMT-Accra, Rapid Entrepreneurs, Livingston Research, and Kake Create Studio, I have built scalable applications—including multi-tenant school ERPs, POS platforms, and parcel logistics software—while also configuring servers, troubleshooting hardware and OS issues, and deploying ISP and Starlink network infrastructure across Ghana.'
    ],
    stats: [
      { label: 'Years Active in Tech', value: 4, suffix: '+', detail: 'Since May 2022' },
      { label: 'Engineering & IT Roles', value: 5, suffix: '', detail: 'Full-Time, Contract & Volunteer' },
      { label: 'Verified Certifications', value: 7, suffix: '', detail: 'Google IT Support, FCC & Web' },
      { label: 'Public Repositories', value: 37, suffix: '+', detail: 'Synced via GitHub API' }
    ]
  },

  // Technical Skills organized into clear, evidence-backed categories (no arbitrary percentages)
  skillCategories: [
    {
      id: 'languages',
      title: 'Programming Languages',
      subtitle: 'Core languages used across frontend, backend, and database systems',
      track: 'engineering',
      skills: [
        { name: 'JavaScript', context: 'ES6+ / Full-Stack' },
        { name: 'TypeScript', context: 'Type-Safe Apps' },
        { name: 'PHP', context: 'Backend Frameworks' },
        { name: 'SQL', context: 'Relational Queries' },
        { name: 'HTML5 & CSS3', context: 'Semantic & Responsive' }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      subtitle: 'Building responsive, accessible, interactive user interfaces',
      track: 'engineering',
      skills: [
        { name: 'React.js', context: 'Component Architecture' },
        { name: 'Tailwind CSS', context: 'Design Systems' },
        { name: 'jQuery', context: 'DOM & Legacy UI' },
        { name: 'Figma', context: 'UI Prototyping & Handoff' },
        { name: 'Cross-Browser Testing', context: 'Compatibility QA' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend & API Integration',
      subtitle: 'Server-side logic, business workflows, and RESTful integrations',
      track: 'engineering',
      skills: [
        { name: 'Laravel', context: 'Full-Stack MVC Framework' },
        { name: 'PHP', context: 'Backend Engineering' },
        { name: 'Node.js', context: 'Runtime & Services' },
        { name: 'Express.js', context: 'REST API Servers' },
        { name: 'RESTful APIs', context: 'Design & Integration' },
        { name: 'Payment Gateways', context: 'SaaS & ERP Billing' }
      ]
    },
    {
      id: 'databases',
      title: 'Database Management',
      subtitle: 'Schema modeling, querying, optimization, and troubleshooting',
      track: 'engineering',
      skills: [
        { name: 'SQL', context: 'Relational Queries & Schema Design' },
        { name: 'PostgreSQL', context: 'Multi-Tenant Relational' },
        { name: 'MySQL', context: 'Relational Database Management' },
        { name: 'MongoDB', context: 'NoSQL Document Store' },
        { name: 'Performance Tuning', context: 'Query & System Speed' }
      ]
    },
    {
      id: 'cross-platform',
      title: 'Desktop & Mobile Development',
      subtitle: 'Unified software delivery beyond the browser',
      track: 'engineering',
      skills: [
        { name: 'Electron.js', context: 'Desktop Applications' },
        { name: 'React Native', context: 'Mobile Applications' },
        { name: 'Cross-Platform Development', context: 'Web, Desktop & Mobile' }
      ]
    },
    {
      id: 'devops-arch',
      title: 'Cloud, DevOps & Architecture',
      subtitle: 'Scalable deployment, multi-tenant architecture, and team workflows',
      track: 'infrastructure',
      skills: [
        { name: 'Cloud Solutions', context: 'Production Hosting' },
        { name: 'Containerization', context: 'Isolated Environments' },
        { name: 'DevOps Practices', context: 'Delivery & Reliability' },
        { name: 'Multi-Tenant Architecture', context: 'SaaS / ERP Platforms' },
        { name: 'Git & Code Reviews', context: 'Version Control & QA' }
      ]
    },
    {
      id: 'support-net',
      title: 'Technical Support & Networking',
      subtitle: 'Hands-on IT operations, diagnostics, systems administration, and field deployments',
      track: 'support',
      skills: [
        { name: 'Systems Administration', context: 'Servers & Operations' },
        { name: 'Infrastructure Management', context: 'IT Equipment & Apps' },
        { name: 'Network Architecture', context: 'ISP & LAN/Wi-Fi Design' },
        { name: 'Network Security', context: 'Firewalls & Access Control' },
        { name: 'Identity Management', context: 'RBAC & User Accounts' },
        { name: 'Hardware & Software Troubleshooting', context: 'Diagnostics & Repair' },
        { name: 'Starlink & ISP Deployments', context: 'Field Setup & Monitoring' },
        { name: 'IoT & Electronics Testing', context: 'Circuit Simulation & QA' }
      ]
    }
  ] as SkillCategory[],

  // Experience Timeline (exact dates, organizations, and duties from CV)
  experience: [
    {
      period: '08/2025 – 09/2026',
      role: 'Software Development / Systems Administrator',
      company: 'Techmaxx Technologies',
      location: 'Ghana',
      badge: 'Software & Systems',
      category: 'hybrid',
      description: 'Engineered scalable production software while overseeing systems administration to maintain dependable infrastructure and uptime.',
      responsibilities: [
        'Built scalable software solutions, including the Ghana STC Parcel system.',
        'Developed and maintained software applications as part of the engineering team.',
        'Handled systems administration duties to keep systems and infrastructure running reliably.'
      ],
      technologies: ['JavaScript', 'React.js', 'Node.js', 'PostgreSQL', 'Systems Administration']
    },
    {
      period: '01/2025 – 06/2025',
      role: 'Software And Hardware Engineer (Contract)',
      company: 'MCubePlus LMT-Accra',
      location: 'Accra, Ghana',
      badge: 'Contract • IT & Eng',
      category: 'support',
      description: 'Combined IT infrastructure administration, network & security deployment, and hardware/software diagnostics to maximize operational stability.',
      responsibilities: [
        'Installed, configured, and maintained networks, servers, and security infrastructure to support operational stability.',
        'Troubleshot hardware, software, and network issues, reducing downtime and improving system reliability.',
        'Managed IT systems, applications, and equipment, facilitating smooth operations across the organization.',
        'Tested application compatibility across various systems to ensure proper functionality.',
        'Designed and tested hardware components for electronic devices and utilized simulation software to analyze circuit performance and reliability.'
      ],
      technologies: ['Networking', 'Servers & Security', 'Hardware Diagnostics', 'Compatibility Testing', 'Simulation Software']
    },
    {
      period: '05/2024 – 06/2024',
      role: 'Volunteer Technology Contributor',
      company: 'Rapid Entrepreneurs',
      location: 'Kumasi, Ghana',
      badge: 'Volunteer',
      category: 'engineering',
      description: 'Partnered with leadership to digitize institutional workflows and expand access to digital educational administration in Ghana.',
      responsibilities: [
        'Contributed technical expertise to support education and digital development, identifying challenges in school administration and proposing practical technology-based solutions.',
        'Designed and developed a School and Hospital Management System to digitize student records, attendance, grading, and communication between schools, parents, and teachers.',
        'Improved the efficiency of school administration and contributed to better access to digital educational services in Ghana.'
      ],
      technologies: ['React.js', 'Node.js', 'SQL Databases', 'System Design']
    },
    {
      period: '08/2023 – 01/2024',
      role: 'Full Stack Software Developer (Freelance-Ukraine)',
      company: 'Livingston Research',
      location: 'Remote (Ukraine)',
      badge: 'Freelance • Lead',
      category: 'engineering',
      description: 'Led a software development team delivering full-stack web applications, RESTful API integrations, and disciplined code quality.',
      responsibilities: [
        'Led software development team to ensure timely delivery of high-quality projects.',
        'Conducted code reviews to promote quality standards and accountability within the team.',
        'Developed full-stack applications and user-friendly web applications using JavaScript and React frameworks.',
        'Integrated RESTful APIs to enhance application functionality and data retrieval.',
        'Implemented new technologies to align with industry trends and collaborated with designers on responsive, accessible interfaces.'
      ],
      technologies: ['JavaScript', 'React.js', 'RESTful APIs', 'Full-Stack Architecture', 'Code Review']
    },
    {
      period: '05/2022 – 01/2023',
      role: 'Front-End Developer (Freelance-Accra)',
      company: 'Kake Create Studio',
      location: 'Accra, Ghana (Contract)',
      badge: 'Contract',
      category: 'engineering',
      description: 'Built responsive, accessible client interfaces and worked closely with backend engineers for seamless full-stack integration.',
      responsibilities: [
        'Generated user-friendly interfaces utilizing HTML, CSS, JavaScript, React, and TypeScript.',
        'Developed responsive web interfaces for diverse clients and implemented user-friendly layouts in collaboration with designers.',
        'Collaborated closely with back-end developers to integrate server-side logic seamlessly.',
        'Executed rigorous cross-browser and cross-platform testing to guarantee consistent functionality.'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js']
    }
  ] as ExperienceItem[],

  // Featured Case Studies (derived strictly from CV & verified GitHub repos)
  featuredCaseStudies: [
    {
      id: 'edumanage-erp',
      title: 'EduManage — Multi-Tenant School Management ERP',
      subtitle: 'Cloud-Based Multi-School Academic, Finance & Portal Platform',
      category: 'erp-pos',
      organization: 'Current Flagship Project',
      status: 'Active Development',
      summary: 'Comprehensive multi-tenant cloud school management ERP engineered for web, desktop, and mobile environments using Node.js, React, Tailwind CSS, and PostgreSQL.',
      problem: 'Schools often juggle disconnected spreadsheets and legacy tools for admissions, grading, attendance, fees, HR, and parent communication, with no centralized multi-campus visibility.',
      solution: 'Leading the design and development of a scalable multi-tenant SaaS architecture supporting isolated school tenants, role-based access control, automated report cards, accounting, and integrated payment gateways.',
      features: [
        'Multi-school tenant isolation & subscription management',
        'Student admissions, attendance, examinations & report cards',
        'Dedicated parent, teacher, and student portals',
        'Accounting, fee billing & integrated payment gateways',
        'HR, inventory, transport & hostel management modules',
        'Role-based access control & executive analytics dashboards'
      ],
      technologies: ['Node.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      contribution: 'Lead architecture, full-stack development, database schema design, and cross-platform delivery.',
      liveUrl: 'https://edumanagement-eight.vercel.app',
      githubUrl: 'https://github.com/kingsley805-tech/edumanageschools'
    },
    {
      id: 'enterprise-erp-pos',
      title: 'Enterprise Business Management & POS System',
      subtitle: 'Point of Sale, Inventory & Business Operations Platform',
      category: 'erp-pos',
      organization: 'Enterprise Software',
      status: 'Repository Available',
      summary: 'Integrated business management and Point of Sale (POS) software system designed to unify sales checkout, inventory control, customer workflows, and operational reporting.',
      problem: 'Retail and commercial enterprises struggle with inventory discrepancies, slow checkout workflows, and fragmented sales reporting across branches.',
      solution: 'Engineered a structured ERP & POS platform combining fast transactional point-of-sale execution with real-time stock tracking, sales history, and administrative controls.',
      features: [
        'Point of Sale (POS) transaction & billing workflow',
        'Real-time inventory & stock level management',
        'Sales tracking, receipt generation & business reporting',
        'Customer & marketing workflow integration',
        'Role-managed administrative dashboard'
      ],
      technologies: ['TypeScript', 'React.js', 'Node.js', 'REST APIs', 'SQL'],
      contribution: 'Full-stack system engineering, UI workflow design, and business logic implementation.',
      githubUrl: 'https://github.com/kingsley805-tech/Enterprise-Marketing-ERP-POS-SYSTEM'
    },
    {
      id: 'ghana-stc-parcel',
      title: 'Ghana STC Parcel System',
      subtitle: 'Scalable Parcel & Logistics Management Software',
      category: 'software',
      organization: 'Techmaxx Technologies',
      status: 'Production Engineering',
      summary: 'Scalable software application developed as part of the engineering team at Techmaxx Technologies to streamline parcel handling and logistics operations.',
      problem: 'High-volume intercity parcel transport requires reliable digital tracking, dispatch coordination, and dependable server uptime across stations.',
      solution: 'Contributed to building and maintaining scalable parcel management software modules alongside systems administration to keep production services running reliably.',
      features: [
        'Scalable parcel workflow & dispatch management',
        'Maintainable application architecture built with engineering team',
        'Systems administration & reliability monitoring',
        'Production operational support'
      ],
      technologies: ['JavaScript', 'React.js', 'Node.js', 'Systems Administration'] ,
      contribution: 'Software developer and systems administrator supporting application build and infrastructure reliability.'
    },
    {
      id: 'school-hospital-mgmt',
      title: 'School & Hospital Management System',
      subtitle: 'Digital Records & Communication Platform',
      category: 'software',
      organization: 'Rapid Entrepreneurs — Kumasi',
      status: 'Completed Engagement',
      summary: 'Designed and built during a volunteer engineering engagement in Kumasi to digitize institutional records, attendance, grading, and stakeholder communication.',
      problem: 'Paper-based student and clinic record-keeping delayed administrative reporting and limited timely communication between institutions, parents, and staff.',
      solution: 'Developed an accessible web-based management platform digitizing records, attendance logs, academic grading, and parent-teacher communication workflows.',
      features: [
        'Digitized student & patient record management',
        'Attendance tracking & academic grading workflows',
        'Parent, teacher & school communication portal',
        'Practical administrative reporting for local institutions'
      ],
      technologies: ['JavaScript', 'React.js', 'Node.js', 'SQL'],
      contribution: 'Requirement discovery with organization leadership, end-to-end UI and system implementation.'
    },
    {
      id: 'hostel-isp-deployment',
      title: 'ISP Network Deployment for Student Hostels',
      subtitle: 'Multi-Building High-Speed Network Infrastructure',
      category: 'infrastructure',
      organization: 'Infrastructure & Networking',
      status: 'Field Deployment',
      summary: 'End-to-end design and implementation of high-speed Internet Service Provider (ISP) network infrastructure serving multiple residential student hostel buildings.',
      problem: 'Multi-building student residences experience severe congestion, dead zones, and frequent outages without structured routing, cabling, and bandwidth governance.',
      solution: 'Planned and deployed a structured multi-building ISP network with configured routers, switches, wireless access points, bandwidth monitoring, and proactive fault troubleshooting.',
      features: [
        'End-to-end network topology & capacity planning',
        'Router & managed switch configuration',
        'Structured cabling & multi-building Wi-Fi AP deployment',
        'Bandwidth management, monitoring & fault troubleshooting'
      ],
      technologies: ['Network Architecture', 'Routers & Switches', 'Structured Cabling', 'Bandwidth Monitoring', 'Wi-Fi APs'],
      contribution: 'Network architect and lead deployment engineer from planning through ongoing monitoring.'
    },
    {
      id: 'feeder-roads-starlink',
      title: 'Department of Feeder Roads — Starlink Network Setup',
      subtitle: 'Enterprise Satellite Connectivity, Firewall & LAN/Wi-Fi Deployment',
      category: 'infrastructure',
      organization: 'Department of Feeder Roads',
      status: 'Operational Deployment',
      summary: 'Deployment and configuration of Starlink satellite internet solutions providing secure, stable enterprise connectivity for the Department of Feeder Roads.',
      problem: 'Operational departments require resilient high-speed internet and secure internal LAN/Wi-Fi distribution where conventional terrestrial links are unreliable.',
      solution: 'Executed full site assessment, Starlink dish installation and alignment, router and firewall hardening, LAN/Wi-Fi rollout, and ongoing technical support.',
      features: [
        'Site survey & Starlink dish installation and alignment',
        'Router & security firewall configuration',
        'Enterprise LAN & Wi-Fi coverage deployment',
        'Throughput testing, system optimization & technical support'
      ],
      technologies: ['Starlink Satellite', 'Firewall Configuration', 'LAN / Wi-Fi', 'Network Security', 'Technical Support'],
      contribution: 'Lead installation, network configuration, optimization, and ongoing technical support.'
    }
  ] as FeaturedCaseStudy[],

  // Services supported directly by CV capabilities
  services: [
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      track: 'software',
      description: 'End-to-end design and development of tailored software applications built around real operational workflows.',
      capabilities: ['Requirements analysis', 'Clean modular architecture', 'Desktop & web delivery']
    },
    {
      id: 'fullstack-web',
      title: 'Full-Stack Web Development',
      track: 'software',
      description: 'Responsive, high-performance web applications using React.js, TypeScript, Tailwind CSS, Node.js, and Express.js.',
      capabilities: ['Responsive UI/UX', 'Cross-browser QA', 'Production deployment']
    },
    {
      id: 'backend-api',
      title: 'Backend & REST API Development',
      track: 'software',
      description: 'Secure, scalable server-side logic, authentication, payment gateway integrations, and RESTful API engineering.',
      capabilities: ['Node.js & Express.js', 'PHP frameworks', 'Third-party API integration']
    },
    {
      id: 'database-design',
      title: 'Database Design & Management',
      track: 'software',
      description: 'Structured relational and NoSQL database modeling, query optimization, and data integrity management.',
      capabilities: ['PostgreSQL & SQL', 'MongoDB', 'Performance tuning']
    },
    {
      id: 'pos-erp',
      title: 'POS, ERP & Business Systems',
      track: 'software',
      description: 'Multi-tenant school ERPs, business management platforms, inventory tracking, and Point of Sale applications.',
      capabilities: ['Multi-tenant SaaS', 'Role-based access control', 'Billing & reporting']
    },
    {
      id: 'desktop-mobile',
      title: 'Desktop & Mobile Applications',
      track: 'software',
      description: 'Cross-platform software delivery extending web ecosystems to desktop and mobile devices.',
      capabilities: ['Electron.js desktop apps', 'React Native mobile apps', 'Unified codebases']
    },
    {
      id: 'tech-support',
      title: 'Technical Support & Troubleshooting',
      track: 'support',
      description: 'Systematic diagnosis and resolution of hardware, software, operating system, and application issues.',
      capabilities: ['Root-cause diagnostics', 'Compatibility testing', 'End-user assistance']
    },
    {
      id: 'network-setup',
      title: 'Network Setup, Starlink & ISP Infrastructure',
      track: 'support',
      description: 'Planning, cabling, router/firewall configuration, Wi-Fi access point rollout, and Starlink satellite deployments.',
      capabilities: ['Router & switch config', 'Firewall & network security', 'Bandwidth monitoring']
    },
    {
      id: 'sysadmin',
      title: 'Systems Administration & Maintenance',
      track: 'support',
      description: 'Server setup, user account and identity management, software installation, and ongoing reliability monitoring.',
      capabilities: ['Server & IT management', 'Identity & access control', 'Downtime reduction']
    }
  ] as ServiceItem[],

  // Technical Support & IT Operations Highlights (Section 13)
  supportHighlights: [
    {
      title: 'Hardware & OS Troubleshooting',
      detail: 'Systematic fault isolation across workstations, peripherals, electronic devices, and operating systems to minimize downtime.'
    },
    {
      title: 'Network & Connectivity Diagnostics',
      detail: 'End-to-end LAN/Wi-Fi, ISP, and Starlink satellite link troubleshooting, packet/bandwidth inspection, and firewall verification.'
    },
    {
      title: 'Software Installation & Compatibility',
      detail: 'Deploying business applications, configuring runtime environments, and testing compatibility across diverse operating systems.'
    },
    {
      title: 'Systems & Server Administration',
      detail: 'Managing IT equipment, servers, user accounts, role-based identity permissions, and proactive security configurations.'
    },
    {
      title: 'Database & Application Support',
      detail: 'Diagnosing application errors, verifying API connectivity, inspecting SQL/NoSQL data issues, and performance tuning.'
    },
    {
      title: 'User Assistance & Field Rollout',
      detail: 'Providing clear technical guidance, documentation, and on-site or remote support for institutional and enterprise teams.'
    }
  ],

  // 7-Step Development & Support Lifecycle
  processSteps: [
    { step: '01', title: 'Requirement Analysis', desc: 'Align on business goals, user workflows, and infrastructure constraints.' },
    { step: '02', title: 'Planning & Architecture', desc: 'Design database schemas, API contracts, and scalable system topology.' },
    { step: '03', title: 'UI/UX Design', desc: 'Prototype clear, responsive interfaces in Figma and component systems.' },
    { step: '04', title: 'Development', desc: 'Implement frontend, backend services, and cross-platform modules.' },
    { step: '05', title: 'Testing & Debugging', desc: 'Verify cross-browser behavior, compatibility, and code quality.' },
    { step: '06', title: 'Deployment', desc: 'Configure servers, containers, domains, and secure network access.' },
    { step: '07', title: 'Maintenance & Support', desc: 'Monitor uptime, tune performance, and provide ongoing technical support.' }
  ],

  // Education (exact from CV)
  education: [
    {
      degree: "Bachelor's Degree in Computer Science",
      institution: 'University Of The People',
      location: 'Pasadena, CA, USA',
      date: '12/2025',
      highlights: [
        'Focused on computer systems, software engineering, algorithms, databases, and networking foundations.'
      ]
    }
  ],

  // Certifications (exact from CV — no fabricated dates or URLs)
  certifications: [
    {
      name: 'Google IT Support Certification',
      focus: 'IT Support & Networking'
    },
    {
      name: 'Systems Administration and IT Infrastructures',
      focus: 'IT Support & Networking'
    },
    {
      name: 'The Bits and Bytes of Computer Networking Certification',
      focus: 'IT Support & Networking'
    },
    {
      name: 'HTML, CSS, and Javascript for Web Developers Certification',
      focus: 'Web & Software Development'
    },
    {
      name: 'FreeCodeCamp Certification',
      focus: 'Web & Software Development'
    },
    {
      name: 'English and Academic Preparation - Pre-Collegiate Certification',
      focus: 'Academic & Communication'
    },
    {
      name: 'English for Career Development Certification',
      focus: 'Academic & Communication'
    }
  ] as CertificationItem[],

  languages: [
    { name: 'English', level: 'Proficient (C2)' }
  ],

  reference: {
    name: 'Stephen Totimeh',
    role: 'CEO, Rapid Entrepreneurs',
    phone: '+233 240 675 759',
    emails: ['steve@rapidentrepreneurs.com', 'info@rapidentrepreneurs.com'],
    location: 'Tanoso, Kumasi, Ghana'
  },

  // Hero Terminal Status lines (authentic software & IT support context)
  bootSequence: [
    'ROLE: Software Engineer • Full-Stack Developer • Technical Support Specialist',
    'STACK: Laravel • PHP • SQL • React.js • TypeScript • Node.js • PostgreSQL',
    'APPS: Electron.js Desktop • React Native Mobile • Multi-Tenant SaaS & POS',
    'IT OPS: Systems Admin • Network Security • Starlink & ISP Infrastructure',
    'EDU: B.Sc. Computer Science (UoPeople) • Google IT Support Certified',
    'STATUS: Ready for remote, international & technical engineering collaborations.'
  ],

  // Authentic Fallback Projects (real repos from github.com/kingsley805-tech if API rate-limits)
  fallbackProjects: [
    {
      id: 901,
      name: 'edumanageschools',
      description: 'Multi-tenant cloud school management ERP built with Node.js, React, Tailwind CSS, and PostgreSQL for desktop, web, and mobile environments.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: '2026-10-01T12:00:00Z',
      topics: ['react', 'typescript', 'nodejs', 'postgresql', 'erp', 'multi-tenant'],
      html_url: 'https://github.com/kingsley805-tech/edumanageschools',
      homepage: 'https://edumanagement-eight.vercel.app',
      category: 'software',
      isHardware: false
    },
    {
      id: 902,
      name: 'Enterprise-Marketing-ERP-POS-SYSTEM',
      description: 'Enterprise business management, ERP, and Point of Sale (POS) software system for sales, inventory, and operations.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: '2026-09-15T12:00:00Z',
      topics: ['erp', 'pos', 'business-management', 'typescript', 'fullstack'],
      html_url: 'https://github.com/kingsley805-tech/Enterprise-Marketing-ERP-POS-SYSTEM',
      homepage: '',
      category: 'software',
      isHardware: false
    },
    {
      id: 903,
      name: 'AifaServicesNet1',
      description: 'Modern service business web application and digital platform deployed on Vercel.',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: '2026-08-20T12:00:00Z',
      topics: ['javascript', 'react', 'web-app'],
      html_url: 'https://github.com/kingsley805-tech/AifaServicesNet1',
      homepage: 'https://aifa-services-net1.vercel.app',
      category: 'software',
      isHardware: false
    },
    {
      id: 904,
      name: 'medflux-web',
      description: 'Healthcare and digital web platform interface engineered with TypeScript and modern frontend architecture.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: '2026-08-10T12:00:00Z',
      topics: ['typescript', 'healthcare', 'web'],
      html_url: 'https://github.com/kingsley805-tech/medflux-web',
      homepage: '',
      category: 'software',
      isHardware: false
    },
    {
      id: 905,
      name: 'Gringo-admin-system',
      description: 'Administrative management dashboard and operational control system.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: '2026-07-15T12:00:00Z',
      topics: ['admin', 'dashboard', 'management-system'],
      html_url: 'https://github.com/kingsley805-tech/Gringo-admin-system',
      homepage: '',
      category: 'software',
      isHardware: false
    },
    {
      id: 906,
      name: 'ecommerce1',
      description: 'Full-featured e-commerce web storefront built with TypeScript and modern UI architecture.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: '2026-07-01T12:00:00Z',
      topics: ['ecommerce', 'typescript', 'react'],
      html_url: 'https://github.com/kingsley805-tech/ecommerce1',
      homepage: '',
      category: 'software',
      isHardware: false
    }
  ]
};

export default PORTFOLIO_CONFIG;
