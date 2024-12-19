export default async function InvoiceIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params)
  return <div>Invoice ID Page. ID = {id} </div>;
}
