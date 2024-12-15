import { eq } from "drizzle-orm";
import {
  customersTable,
  invoicesTable,
  revenueTable,
  usersTable,
} from "../schema";
import { db } from "@/src";
import {
  dataCustomers,
  dataInvoices,
  dataRevenue,
  dataUsers,
} from "./placeholder-data.";

async function SeedData() {
  await db.delete(usersTable);
  await db.delete(invoicesTable);
  await db.delete(customersTable);
  await db.delete(revenueTable);

  // USERS
  // await db.insert(usersTable).values(user);
  await db.insert(usersTable).values(dataUsers);
  console.log("New user created!");

  // CUSTOMERS
  await db.insert(customersTable).values(dataCustomers);
  console.log("New customers created!");

  // INVOICES

  await db.insert(invoicesTable).values(dataInvoices);
  console.log("New invoice created!");

  // REVENUE

  await db.insert(revenueTable).values(dataRevenue);
  console.log("New revenue created!");

  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  //   UPDATE

  //   await db
  //     .update(usersTable)
  //     .set({
  //       age: 31,
  //     })
  //     .where(eq(usersTable.email, user.email));
  //   console.log('User info updated!')

  // DELETE

  //   await db.delete(usersTable).where(eq(usersTable.email, user.email));
  //   console.log('User deleted!')
}

SeedData();
