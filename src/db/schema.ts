import { pgTable, text, timestamp, boolean, integer, numeric, jsonb, serial, uuid } from 'drizzle-orm/pg-core';

// 1. Users Table (Auth.js compatible)
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  experienceLevel: text('experience_level'), // 'beginner' | 'intermediate' | 'advanced'
  country: text('country'),
  timezone: text('timezone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Auth.js Verification Tokens for Email Magic Links
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// 2. Waitlist Table
export const waitlist = pgTable('waitlist', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  source: text('source').default('website').notNull(),
  status: text('status').default('pending').notNull(), // 'pending' | 'confirmed'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Quiz Attempts Table (80% passing mark)
export const quizAttempts = pgTable('quiz_attempts', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),
  quizId: text('quiz_id').notNull(),
  courseId: text('course_id').notNull(),
  score: integer('score').notNull(), // 0 to 100
  passed: boolean('passed').notNull(), // score >= 80
  answers: jsonb('answers'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Lesson Progress Table
export const lessonProgress = pgTable('lesson_progress', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: text('lesson_id').notNull(),
  courseId: text('course_id').notNull(),
  completed: boolean('completed').default(false).notNull(),
  reflection: text('reflection'),
  completedAt: timestamp('completed_at'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 5. Journal Trades Table
export const journalTrades = pgTable('journal_trades', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  symbol: text('symbol').notNull(), // e.g. 'EURUSD'
  type: text('type').notNull(), // 'BUY' | 'SELL'
  entryPrice: numeric('entry_price', { precision: 12, scale: 5 }).notNull(),
  exitPrice: numeric('exit_price', { precision: 12, scale: 5 }).notNull(),
  lotSize: numeric('lot_size', { precision: 6, scale: 2 }).notNull(),
  pnl: numeric('pnl', { precision: 10, scale: 2 }).notNull(),
  pnlPercent: numeric('pnl_percent', { precision: 6, scale: 2 }).notNull(),
  setup: text('setup'),
  notes: text('notes'),
  tradeDate: timestamp('trade_date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 6. Alert Preferences Table
export const alertPreferences = pgTable('alert_preferences', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  telegramEnabled: boolean('telegram_enabled').default(true).notNull(),
  emailEnabled: boolean('email_enabled').default(true).notNull(),
  browserEnabled: boolean('browser_enabled').default(false).notNull(),
  highImpactOnly: boolean('high_impact_only').default(true).notNull(),
  fifteenMinBefore: boolean('fifteen_min_before').default(true).notNull(),
  atRelease: boolean('at_release').default(true).notNull(),
  sixtyMinAfter: boolean('sixty_min_after').default(false).notNull(),
  quietHoursEnabled: boolean('quiet_hours_enabled').default(true).notNull(),
  quietHoursStart: text('quiet_hours_start').default('22:00').notNull(),
  quietHoursEnd: text('quiet_hours_end').default('07:00').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 7. Telegram Links Table
export const telegramLinks = pgTable('telegram_links', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  telegramChatId: text('telegram_chat_id').notNull().unique(),
  telegramUsername: text('telegram_username'),
  linkedAt: timestamp('linked_at').defaultNow().notNull(),
});
