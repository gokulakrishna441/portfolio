import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Resume from '../models/Resume.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const skillsData = [
  { name: 'JavaScript', category: 'Languages', level: 92, order: 1 },
  { name: 'TypeScript', category: 'Languages', level: 85, order: 2 },
  { name: 'PHP', category: 'Languages', level: 80, order: 3 },
  { name: 'React.js', category: 'Frontend', level: 92, order: 1 },
  { name: 'React Router', category: 'Frontend', level: 90, order: 2 },
  { name: 'Redux', category: 'Frontend', level: 88, order: 3 },
  { name: 'React Hook Form', category: 'Frontend', level: 86, order: 4 },
  { name: 'Material UI', category: 'Frontend', level: 84, order: 5 },
  { name: 'Node.js', category: 'Backend', level: 90, order: 1 },
  { name: 'Express.js', category: 'Backend', level: 90, order: 2 },
  { name: 'Sails.js', category: 'Backend', level: 78, order: 3 },
  { name: 'Socket.io', category: 'Backend', level: 82, order: 4 },
  { name: 'MongoDB', category: 'Databases', level: 88, order: 1 },
  { name: 'MySQL', category: 'Databases', level: 84, order: 2 },
  { name: 'REST API', category: 'API & Technologies', level: 92, order: 1 },
  { name: 'GraphQL', category: 'API & Technologies', level: 75, order: 2 },
  { name: 'Redis', category: 'API & Technologies', level: 80, order: 3 },
  { name: 'Google Analytics', category: 'API & Technologies', level: 78, order: 4 },
  { name: 'Google Indexing API', category: 'API & Technologies', level: 76, order: 5 },
  { name: 'GIT / GitHub', category: 'Tools & Platforms', level: 90, order: 1 },
  { name: 'SEO', category: 'Tools & Platforms', level: 85, order: 2 },
  { name: 'AWS', category: 'Tools & Platforms', level: 72, order: 3 },
  { name: 'Jira', category: 'Tools & Platforms', level: 80, order: 4 },
  { name: 'VS Code', category: 'Tools & Platforms', level: 92, order: 5 },
  { name: 'TablePlus', category: 'Tools & Platforms', level: 78, order: 6 },
  { name: 'ChatGPT / Cursor AI / Perplexity', category: 'Tools & Platforms', level: 88, order: 7 },
];

const projectsData = [
  {
    title: 'Teemie – Scheduling & Payroll App',
    slug: 'teemie',
    shortDescription:
      'Roster management UI, REST APIs, real-time notifications, and secure role-based access.',
    description:
      'Built a scheduling and payroll platform with a React.js roster management UI, Node.js/Express REST APIs, Socket.io real-time notifications, and secure role-based access control for teams.',
    techStack: ['React.js', 'Node.js', 'Express', 'Socket.io', 'MongoDB'],
    category: 'Full Stack',
    features: [
      'Roster management interface',
      'REST API architecture',
      'Real-time notifications with Socket.io',
      'Role-based access control',
    ],
    featured: true,
    order: 1,
  },
  {
    title: 'InstantRo – Automotive Platform',
    slug: 'instantro',
    shortDescription:
      'Backend workflows, ScraperAPI integration, React dashboards, and Redis-optimized data ops.',
    description:
      'Engineered backend workflows in Node.js, integrated ScraperAPI (PHP), created analytics dashboards with React.js/Chart.js, and optimized heavy data operations with Redis.',
    techStack: ['Node.js', 'PHP', 'React.js', 'Chart.js', 'Redis', 'ScraperAPI'],
    category: 'Full Stack',
    features: [
      'Backend workflow engineering',
      'ScraperAPI (PHP) integration',
      'React.js / Chart.js dashboards',
      'Redis for heavy data operations',
    ],
    featured: true,
    order: 2,
  },
  {
    title: 'Footprints – Retail Media Network',
    slug: 'footprints',
    shortDescription:
      'Campaign management modules, shopper analytics APIs, and retailer admin interfaces.',
    description:
      'Developed React.js modules for campaign management, integrated APIs for shopper analytics, and built admin interfaces tailored for retail media network partners.',
    techStack: ['React.js', 'REST APIs', 'Analytics'],
    category: 'Frontend',
    features: [
      'Campaign management modules',
      'Shopper analytics API integrations',
      'Retailer admin interfaces',
    ],
    featured: true,
    order: 3,
  },
  {
    title: 'eNova ERP Product – University ERP',
    slug: 'enova-erp',
    shortDescription:
      'ERP modules for student, faculty, and administrative workflows.',
    description:
      'Developed university ERP modules for student, faculty, and administrative workflows using PHP (CodeIgniter), MySQL, JavaScript, and Bootstrap.',
    techStack: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'Bootstrap'],
    category: 'ERP',
    features: [
      'Student & faculty workflows',
      'Administrative ERP modules',
      'CodeIgniter + MySQL stack',
    ],
    featured: false,
    order: 4,
  },
];

const experienceData = [
  {
    company: 'eNova Software And Hardware Solutions',
    role: 'Programmer',
    location: 'Coimbatore, Tamil Nadu',
    startDate: 'March 2026',
    endDate: 'Present',
    description: [
      'Developed course registration, faculty allocation, and student enrollment management features.',
      'Collaborated with cross-functional teams to deliver new features, perform code reviews, and maintain application stability.',
      'Worked extensively with REST APIs, MySQL, PHP (CodeIgniter CI4), JavaScript, jQuery, and Bootstrap to build responsive web applications.',
    ],
    technologies: ['PHP', 'CodeIgniter CI4', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap', 'REST APIs'],
    order: 1,
  },
  {
    company: 'App Innovation Technologies',
    role: 'MERN Stack Developer',
    location: 'Coimbatore, Tamil Nadu',
    startDate: 'June 2023',
    endDate: 'August 2025',
    description: [
      'Built full-stack MERN applications with modular architecture & REST APIs.',
      'Built features including dynamic dashboards, admin portals, and user-driven analytics modules.',
      'Developed reusable React.js components, state management with Redux, and routing with React Router.',
      'Designed MongoDB schemas, aggregation pipelines & implemented JWT-based authentication.',
      'Integrated Stripe & Google Analytics; optimized SEO with SSR where required.',
    ],
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT', 'Stripe', 'SSR'],
    order: 2,
  },
  {
    company: 'Sai Techno Solutions',
    role: 'Web Developer',
    location: 'Coimbatore, Tamil Nadu',
    startDate: 'June 2022',
    endDate: 'March 2023',
    description: [
      'Built static web pages with HTML/CSS; contributed to minor frontend updates.',
      'Explored HTML elements, tags, and semantic structure to build accessible and SEO-friendly web layouts.',
    ],
    technologies: ['HTML', 'CSS', 'SEO'],
    order: 3,
  },
  {
    company: 'Besant Technologies',
    role: 'Intern',
    location: 'Bengaluru, Tamil Nadu',
    startDate: 'November 2022',
    endDate: 'April 2022',
    description: [
      'Developed full-stack web applications using JavaScript, React.js, Node.js, Express.js, and MongoDB.',
    ],
    technologies: ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB'],
    order: 4,
  },
];

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Profile.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Experience.deleteMany({}),
    Education.deleteMany({}),
    Resume.deleteMany({}),
  ]);

  await User.create({
    name: 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@gokulakrishna.dev',
    password: process.env.ADMIN_PASSWORD || 'Admin@123456',
  });

  await Profile.create({
    name: 'Gokula Krishna A',
    title: 'MERN Stack Developer',
    tagline: 'Building elegant full-stack products with React, Node.js, and MongoDB.',
    about:
      'I am a MERN Stack Developer based in Coimbatore, Tamil Nadu, with hands-on experience building modular full-stack applications, admin portals, analytics dashboards, and ERP workflows. I focus on clean architecture, reusable React components, REST APIs, MongoDB schema design, JWT authentication, and SEO-minded delivery. Recently I have been developing university ERP features at eNova, and previously shipped production MERN products at App Innovation Technologies.',
    email: 'gokulakrishna441@gmail.com',
    phone: '+91 6379185957',
    location: 'Coimbatore, Tamil Nadu, India',
    socials: {
      linkedin: 'https://www.linkedin.com/in/gokula-krishna-2b0984229',
      github: 'https://github.com/gokulakrishna441',
      twitter: '',
    },
    availability: 'Open to full-time opportunities',
  });

  await Skill.insertMany(skillsData);
  await Project.insertMany(projectsData);
  await Experience.insertMany(experienceData);
  await Education.create({
    degree: 'Bachelor of Mechanical Engineering',
    institution: 'Sengunthar Engineering College, Tiruchengode',
    university: 'Anna University',
    location: 'Tiruchengode, Tamil Nadu',
    startDate: 'June 2015',
    endDate: 'May 2019',
    description: 'Bachelor of Mechanical Engineering under Anna University.',
    order: 1,
  });

  await Resume.create({
    filename: 'Gokula_Krishna_Resume.pdf',
    originalName: 'Gokula_Krishna_Resume.pdf',
    path: path.join('uploads/resumes', 'Gokula_Krishna_Resume.pdf'),
    mimeType: 'application/pdf',
    isActive: true,
  });

  console.log('Database seeded successfully');
  console.log(`Admin: ${process.env.ADMIN_EMAIL || 'admin@gokulakrishna.dev'}`);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
