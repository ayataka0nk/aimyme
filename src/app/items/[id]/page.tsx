export default async function ShowProjectPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>{params.id}</div>;
}
