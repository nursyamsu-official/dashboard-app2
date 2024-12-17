import { desc, eq } from "drizzle-orm";
import { db } from "@/src";
import { customersTable, invoicesTable } from "@/src/db/schema";

async function AmbilInvoice() {
  const responData = await db
    .select()
    .from(invoicesTable)
    .leftJoin(customersTable, eq(invoicesTable.customer_id, customersTable.id))
    .orderBy(desc(invoicesTable.id));

  console.log(responData);

  return responData;
}
async function AmbilInvoice2() {
  const responData = await db
    .select({
      id: invoicesTable.id,
      name: customersTable.name,
      email: customersTable.email,
      img_url: customersTable.img_url,
      amount: invoicesTable.amount,
      date: invoicesTable.date,
    })
    .from(invoicesTable)
    .leftJoin(customersTable, eq(invoicesTable.customer_id, customersTable.id))
    .orderBy(desc(invoicesTable.date));

  console.log(responData);

  return responData;
}

export { AmbilInvoice, AmbilInvoice2 };
