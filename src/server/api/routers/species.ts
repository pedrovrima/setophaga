import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export type SpeciesReturn = {
  createdAt: string;
  enName: string;
  genusId: number;
  id: number;
  ptName: string;
  sciCode: string;
  scientificName: string;
  updatedAt: string;
};

export const speciesRouter = createTRPCRouter({
  getAllSpecies: publicProcedure.query(async () => {
    const data = await fetch(
      "https://ilicura.vercel.app/api/trpc/species.getAllSpecies",
    );

    if (data) {
      const returnedData = await data?.json();
      if (returnedData) {
        return returnedData?.result?.data?.json as SpeciesReturn[];
      }
    }
    throw new Error();
  }),
});
