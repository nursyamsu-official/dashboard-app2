export default async function InvoiceIdEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <div>Edit Invoice Page. ID = {id}</div>;
}
