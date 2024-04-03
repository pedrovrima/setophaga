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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const returnedData = await data?.json();
      if (returnedData) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return returnedData?.result?.data?.json as SpeciesReturn[];
      }
    }
    throw new Error();
  }),
});
