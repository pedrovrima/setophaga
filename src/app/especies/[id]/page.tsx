import { api } from "@/trpc/server";

export default async function Especies({ params }: { params: { id: string } }) {
  const speciesData = await api.species.getSpeciesByID({ id: params.id });

  console.log(speciesData);
  return <div>{speciesData?.Name}</div>;
}
