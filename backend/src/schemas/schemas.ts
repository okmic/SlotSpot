import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const slots = pgTable('slots', {
  id: text('id').primaryKey(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  title: text('title').notNull(),
  startTime: timestamp('start_time', { mode: 'date' }).notNull(),
  endTime: timestamp('end_time', { mode: 'date' }).notNull(),
})