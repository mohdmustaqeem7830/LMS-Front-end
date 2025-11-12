import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums (JS version)
export const USER_ROLES = ["SUPER_ADMIN", "LIBRARY_ADMIN", "LIBRARIAN", "STUDENT"];
export const SUBSCRIPTION_STATUS = ["ACTIVE", "GRACE", "INACTIVE"];

export const subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  maxStudents: integer("max_students").notNull(),
  pricePerMonth: decimal("price_per_month", { precision: 10, scale: 2 }).notNull(),
  bufferPercent: integer("buffer_percent").notNull().default(10),
  features: text("features").array(),
});

export const tenants = pgTable("tenants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address"),
  logo: text("logo"),
  timezone: text("timezone").notNull().default("UTC"),
  status: text("status").notNull().default("ACTIVE"),
  subscriptionPlanId: varchar("subscription_plan_id").references(() => subscriptionPlans.id),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  gracePeriodDays: integer("grace_period_days").notNull().default(7),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").references(() => tenants.id),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const books = pgTable("books", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().references(() => tenants.id),
  title: text("title").notNull(),
  author: text("author").notNull(),
  isbn: text("isbn"),
  category: text("category").notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(1),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().references(() => tenants.id),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  studentId: text("student_id").notNull(),
  phone: text("phone"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const issues = pgTable("issues", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().references(() => tenants.id),
  studentId: varchar("student_id").notNull().references(() => students.id),
  bookId: varchar("book_id").notNull().references(() => books.id),
  issuedAt: timestamp("issued_at").notNull().default(sql`now()`),
  dueDate: timestamp("due_date").notNull(),
  returnedAt: timestamp("returned_at"),
  fineAmount: decimal("fine_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  finePaid: boolean("fine_paid").notNull().default(false),
});

// Insert Schemas (JS version)
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).omit({ id: true });
export const insertTenantSchema = createInsertSchema(tenants).omit({ id: true, createdAt: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertBookSchema = createInsertSchema(books).omit({ id: true, createdAt: true });
export const insertStudentSchema = createInsertSchema(students).omit({ id: true, createdAt: true });
export const insertIssueSchema = createInsertSchema(issues).omit({ id: true });

// Validation Schemas
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const tenantOnboardingSchema = z.object({
  tenantName: z.string().min(2),
  tenantAddress: z.string().min(5),
  adminFirstName: z.string().min(2),
  adminLastName: z.string().min(2),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(8),
  subscriptionPlanId: z.string(),
});
