"use server";

import { z } from "zod";
import { db } from "@/src";
import { invoicesTable } from "@/src/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

// Membuat variable baru dimana "id" dan "date" di hilangkan
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export default async function createInvoice(formData: FormData) {
  //   const rawFormData = {
  //     customerId: formData.get("customerId"),
  //     status: formData.get("status"),
  //     amount: formData.get("amount"),

  // Tip: If you're working with forms that have many fields,
  // you may want to consider using the entries() method with JavaScript's Object.fromEntries().
  // For example:
  // const rawFormData = Object.fromEntries(formData.entries());

  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await db.insert(invoicesTable).values({
      customer_id: `${customerId}`,
      amount: `${amount}`,
      status: `${status}`,
      date: `${date}`,
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  // Next.js 15 no cache by default, so didn't need "rrevalidatePath"
  // revalidatePath("/dashboard/invoices");

  redirect("/dashboard/invoices");
}

// UPDATE INVOICE

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await db
      .update(invoicesTable)
      .set({
        customer_id: `${customerId}`,
        amount: `${amountInCents}`,
        status: `${status}`,
      })
      .where(eq(invoicesTable.id, id));
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  // revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  throw new Error("Failed to Delete Invoice");

  try {
    await db.delete(invoicesTable).where(eq(invoicesTable.id, id));
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}
