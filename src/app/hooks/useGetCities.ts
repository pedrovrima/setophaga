"use client";

import type { LocaleReturn } from "@/server/api/routers/brazilian_cities";
import { api } from "@/trpc/react";
import { useEffect } from "react";

const useGetCities = () => {
  const input = undefined as void;
  const query = api.cities.getCities.useQuery(input, {
    refetchInterval: 900000,
  });

  const cachedData = window?.localStorage.getItem("cities");

  useEffect(() => {
    if (query.data) {
      window.localStorage.setItem("cities", JSON.stringify(query.data));
    }
  }, [query.data]);

  if (cachedData) {
    return {
      ...query,
      data: query.data ?? (JSON.parse(cachedData) as LocaleReturn),
    };
  }
  return query;
};

export default useGetCities;
