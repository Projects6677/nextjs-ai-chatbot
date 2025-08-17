import {
  pgTable,
  uuid,
  timestamp,
  json,
  text
} from 'drizzle-orm/pg-core';

// ... (all your table definitions above here!)
// Example definitions (replace with your real schemas):

export const user = pgTable('User', {...});
export const chat = pgTable('Chat', {...});
export const messageDeprecated = pgTable('MessageDeprecated', {...});   // only if still used!
export const message = pgTable('Message', {...});
export const voteDeprecated = pgTable('VoteDeprecated', {...});         // only if still used!
export const vote = pgTable('Vote', {...});
export const document = pgTable('Document', {...});
export const suggestion = pgTable('Suggestion', {...});
export const stream = pgTable('Stream', {...});

export const userProfile = pgTable('UserProfile', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  userId: uuid('userId').notNull().references(() => user.id),
  education: json('education'),
  interests: json('interests'),
  skills: json('skills'),
  aptitudes: json('aptitudes'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
});

export const careerRecommendation = pgTable('CareerRecommendation', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  userId: uuid('userId').notNull().references(() => user.id),
  careerPath: text('careerPath').notNull(),
  description: text('description'),
  requiredSkills: json('requiredSkills'),
  generatedAt: timestamp('generatedAt').notNull(),
});

// Export only tables that are DEFINED above!
export {
  user,
  chat,
  messageDeprecated,      // comment if not defined above!
  message,
  voteDeprecated,         // comment if not defined above!
  vote,
  document,
  suggestion,
  stream,
  userProfile,
  careerRecommendation,
}
