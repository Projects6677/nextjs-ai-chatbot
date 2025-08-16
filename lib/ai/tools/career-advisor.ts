import { tool } from 'ai';
import { z } from 'zod';

const mockCareerData = {
  'Data Scientist': {
    description: 'Analyzes complex data to help organizations make better decisions.',
    requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Big Data Technologies'],
  },
  'Full Stack Developer': {
    description: 'Builds and maintains both the front-end and back-end of websites and applications.',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'Go', 'Databases', 'API Design', 'Cloud Computing'],
  },
  'Cloud Engineer': {
    description: 'Designs, implements, and manages cloud infrastructure.',
    requiredSkills: ['Cloud Computing', 'Networking', 'Security', 'Linux', 'Docker', 'Kubernetes', 'AWS/GCP/Azure'],
  },
  'Product Manager': {
    description: 'Leads the development of a product by defining its vision and strategy.',
    requiredSkills: ['Market Research', 'User Experience (UX)', 'Agile Methodologies', 'Data Analysis', 'Communication', 'Strategic Planning'],
  },
  'Digital Marketing Specialist': {
    description: 'Drives brand awareness and sales through digital channels.',
    requiredSkills: ['SEO', 'SEM', 'Content Marketing', 'Social Media Marketing', 'Analytics', 'Email Marketing'],
  },
};

const mockSkillTaxonomy = {
  'coding': 'Python',
  'programming': 'JavaScript',
  'frontend': 'React',
  'backend': 'Node.js',
  'data analysis': 'Statistics',
  'databases': 'SQL',
  'cloud': 'Cloud Computing',
  'aws': 'AWS/GCP/Azure',
  'project management': 'Agile Methodologies',
  'marketing': 'Digital Marketing',
};

// This tool maps a user's self-reported skills to a standardized taxonomy.
export const mapSkills = tool({
  description: 'Maps a user\'s self-reported skills to a standardized skills taxonomy.',
  inputSchema: z.object({
    skills: z.array(z.string()).describe('A list of skills provided by the user'),
  }),
  execute: async ({ skills }) => {
    const mappedSkills = skills.map(skill => {
      const standardizedSkill = mockSkillTaxonomy[skill.toLowerCase()] || skill;
      return {
        original: skill,
        mapped: standardizedSkill
      };
    });
    return {
      message: 'Skills mapped successfully.',
      mappedSkills: mappedSkills.map(s => s.mapped),
    };
  },
});

// This tool recommends career paths based on a user's skills and interests.
export const getCareerPaths = tool({
  description: 'Recommends career paths based on a user\'s skills and interests.',
  inputSchema: z.object({
    mappedSkills: z.array(z.string()).describe('Standardized list of user skills'),
    interests: z.array(z.string()).describe('A list of user interests'),
  }),
  execute: async ({ mappedSkills, interests }) => {
    // A simple recommendation logic based on matching skills and interests
    const recommendations = Object.keys(mockCareerData)
      .filter(careerPath => {
        const requiredSkills = mockCareerData[careerPath].requiredSkills;
        const matches = mappedSkills.some(skill => requiredSkills.includes(skill));
        const interestMatch = interests.some(interest => careerPath.toLowerCase().includes(interest.toLowerCase()));
        return matches || interestMatch;
      })
      .map(path => ({
        path: path,
        description: mockCareerData[path].description,
        requiredSkills: mockCareerData[path].requiredSkills,
      }));

    return {
      message: 'Career paths recommended.',
      recommendations: recommendations.length > 0 ? recommendations : [
        {
          path: 'Software Engineer',
          description: 'Develops software for various applications.',
          requiredSkills: ['Programming', 'Algorithms', 'Data Structures']
        }
      ],
    };
  },
});

// This tool identifies skill gaps for a user based on a target career path.
export const getSkillGaps = tool({
  description: 'Identifies skill gaps for a user based on a target career path.',
  inputSchema: z.object({
    userSkills: z.array(z.string()).describe('A list of skills the user currently has'),
    careerPath: z.string().describe('The name of the target career path'),
  }),
  execute: async ({ userSkills, careerPath }) => {
    const requiredSkills = mockCareerData[careerPath]?.requiredSkills || [];
    const skillGaps = requiredSkills.filter(skill => !userSkills.includes(skill));

    return {
      message: `Skill gaps for ${careerPath} identified.`,
      careerPath: careerPath,
      skillGaps: skillGaps,
    };
  },
});
