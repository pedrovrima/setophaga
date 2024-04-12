"use client";

import type { BirdRecord } from "@/server/api/routers/species";
import { api } from "@/trpc/react";
import { useEffect } from "react";

const useGetSpecies = () => {
  const input = undefined as void;
  const query = api.species.getAllSpecies.useQuery(input, {
    refetchInterval: 900000,
  });

  const cachedData = window?.localStorage.getItem("speciesData");

  useEffect(() => {
    if (query.data) {
      window.localStorage.setItem("speciesData", JSON.stringify(query.data));
    }
  }, [query.data]);

  if (cachedData) {
    return {
      ...query,
      data: query.data ?? (JSON.parse(cachedData) as BirdRecord[]),
    };
  }
  return query;
};

export default useGetSpecies;
