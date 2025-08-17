import {
  pgTable,
  uuid,
  timestamp,
  json,
  text
} from 'drizzle-orm/pg-core';

// ... (your other schemas here, e.g., user, chat, message, etc.)

export const userProfile = pgTable('UserProfile', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
  education: json('education'),    // Stores educational details
  interests: json('interests'),    // Stores user's interests
  skills: json('skills'),          // Stores user's skills
  aptitudes: json('aptitudes'),    // Stores user's aptitudes
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
});

export const careerRecommendation = pgTable('CareerRecommendation', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
  careerPath: text('careerPath').notNull(),
  description: text('description'),
  requiredSkills: json('requiredSkills'),  // Stores list of required skills
  generatedAt: timestamp('generatedAt').notNull(),
});

// Re-export all tables, including the new ones
export {
  user,
  chat,
  messageDeprecated,
  message,
  voteDeprecated,
  vote,
  document,
  suggestion,
  stream,
  userProfile,
  careerRecommendation,
};
