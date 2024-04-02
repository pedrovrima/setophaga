import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export type SpeciesReturn = {
  createdAt: String;
  enName: String;
  featuredPicture: Object;
  genusId: number;
  id: number;
  ptName: String;
  sciCode: String;
  scientificName: String;
  updatedAt: String;
};

export const speciesRouter = createTRPCRouter({
  getAllSpecies: publicProcedure.query(async ({ input }) => {
    const data = await fetch(
      "https://ilicura.vercel.app/api/trpc/species.getAllSpecies",
    );

    const returnedData = await data.json();
    return returnedData.result.data.json as SpeciesReturn[];
  }),
});
