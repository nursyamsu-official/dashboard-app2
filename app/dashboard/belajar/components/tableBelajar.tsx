import Image from "next/image";
import { AmbilInvoice, AmbilInvoice2 } from "../lib/belajarData";

export default async function TableBelajar() {
  const data = await AmbilInvoice();
  const data2 = await AmbilInvoice2();
  //   console.log(data);
  return (
    <>
      <div>Table Belajar Components</div>
      <div className="">
        {data.map((item) => (
          <div key={item.invoices.id}>
            <div className="flex items-center gap-1 m-2">
              <Image
                src={item.customers?.img_url}
                alt="Profile picture"
                width={28}
                height={28}
                className="m-2 rounded-full"
              />
              {item.customers?.name} | {item.customers?.email} |
              {item.invoices.amount} | {item.invoices.date}
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="">
        {data2.map((item) => (
          <div key={item.id}>
            <div className="flex items-center gap-1 m-2">
              <Image
                src={item.img_url}
                alt="Profile picture"
                width={28}
                height={28}
                className="m-2 rounded-full"
              />
              {item.name} | {item.email} |{item.amount} | {item.date}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
