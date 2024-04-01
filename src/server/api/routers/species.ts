import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const speciesRouter = createTRPCRouter({
  getAllSpeices: publicProcedure.query(async ({ input }) => {
    const data = await fetch(
      "https://ilicura.vercel.app/api/trpc/species.getAllSpeacies",
    );
    const returnedData = await data.json();
    return returnedData.result.data.json;
  }),
});
