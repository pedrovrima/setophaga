"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

const useGetSpecies = () => {
  const query = api.species.getAllSpeices.useQuery();
  const cachedData = window.localStorage.getItem("speciesData");

  useEffect(() => {
    if (query.data) {
      window.localStorage.setItem("speciesData", JSON.stringify(query.data));
    }
  }, [query.data]);

  return { ...query, data: query.data || JSON.parse(cachedData) };
};

export default useGetSpecies;
