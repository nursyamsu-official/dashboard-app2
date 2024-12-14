import { unique } from "drizzle-orm/mysql-core";
import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text()
});

export const invoicesTable = pgTable("invoices", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  // id: integer().primaryKey(),
  customer_id: integer(),
  amount: integer(),
  status: varchar({length:100}),
  date: date(),
});

export const customersTable = pgTable("customers", {
    // id: integer().primaryKey().generatedAlwaysAsIdentity(),
    id: integer().primaryKey(),
    name: varchar().notNull(),
    email: varchar({length: 200}).notNull().unique(),
    img_url: varchar({length: 255})
})

export const revenueTable = pgTable("revenue", {
  month: varchar({length: 10}).notNull().unique(),
  revenue: integer().notNull(),
})

