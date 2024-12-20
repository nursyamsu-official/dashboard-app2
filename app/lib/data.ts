// import { sql } from "@vercel/postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";
import { db } from "@/src";
import { customersTable, invoicesTable, revenueTable } from "@/src/db/schema";
import { desc, eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { customers } from "./placeholder-data";

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await db.select().from(revenueTable);
    // console.log(data);

    console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await db
      .select({
        amount: invoicesTable.amount,
        name: customersTable.name,
        image_url: customersTable.img_url,
        email: customersTable.email,
        id: invoicesTable.id,
        date: invoicesTable.date,
      })
      .from(invoicesTable)
      .leftJoin(
        customersTable,
        eq(invoicesTable.customer_id, customersTable.id)
      )
      .orderBy(desc(invoicesTable.date))
      .limit(5);
    // console.log(data);

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    // console.log(latestInvoices);
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.

    const invoiceCountPromise = await db.$count(invoicesTable);
    const customerCountPromise = await db.$count(customersTable);

    const invoiceStatusPromise = await db.execute(
      sql`select
         sum(case when ${invoicesTable.status} = 'paid' then ${invoicesTable.amount} ELSE 0 end) as "paid",
         sum(case when ${invoicesTable.status} = 'pending' then ${invoicesTable.amount} ELSE 0 end) as "pending"
         from ${invoicesTable}`
    );
    // console.log(invoiceStatusPromise);

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
    // console.log(data);

    const numberOfInvoices = Number(data[0] ?? "0");
    const numberOfCustomers = Number(data[1] ?? "0");
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // const invoices = await sql<InvoicesTable>`
    const invoices = await db.execute(
      sql`SELECT
        ${invoicesTable.id}, ${invoicesTable.amount}, ${invoicesTable.date},
        ${invoicesTable.status}, ${customersTable.name}, ${customersTable.email}, ${customersTable.img_url}
      FROM ${invoicesTable}
      JOIN ${customersTable} ON ${invoicesTable.customer_id} = ${customersTable.id}
      WHERE
        ${customersTable.name} ILIKE ${`%${query}%`} OR
        ${customersTable.email} ILIKE ${`%${query}%`} OR
        ${invoicesTable.amount}::text ILIKE ${`%${query}%`} OR
        ${invoicesTable.date}::text ILIKE ${`%${query}%`} OR
        ${invoicesTable.status} ILIKE ${`%${query}%`}
      ORDER BY ${invoicesTable.id} DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`
    );
    return invoices.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await db.execute(
      sql`SELECT COUNT(*)
      FROM ${invoicesTable}
    JOIN ${customersTable} ON ${invoicesTable.customer_id} = ${customersTable.id}
    WHERE
      ${customersTable.name} ILIKE ${`%${query}%`} OR
      ${customersTable.email} ILIKE ${`%${query}%`} OR
      ${invoicesTable.amount}::text ILIKE ${`%${query}%`} OR
      ${invoicesTable.date}::text ILIKE ${`%${query}%`} OR
      ${invoicesTable.status} ILIKE ${`%${query}%`}`
    );

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    // const data = await sql<InvoiceForm>`
    //   SELECT
    //     invoices.id,
    //     invoices.customer_id,
    //     invoices.amount,
    //     invoices.status
    //   FROM invoices
    //   WHERE invoices.id = ${id};
    // `;

    const data = await db
      .select()
      .from(invoicesTable)
      .where(eq(invoicesTable.id, id));

    console.log(data);

    // const invoice = data.rows.map((invoice) => ({
    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchCustomers() {
  try {
    const customers = await db
      .select({
        id: customersTable.id,
        name: customersTable.name,
      })
      .from(customersTable)
      .orderBy(customersTable.name);
    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}
