"use client";

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import useGetSpecies from "../hooks/useGetSpecies";
import SpeciesSearch from "@/components/speciesSearch";

const data = [{ id: 1 }, { id: 2 }];

export default function Especies() {
  const query = useGetSpecies();

  const { get, set } = useSearchParams();
  const sppId = get("sppId");
  const speciesData = query?.data?.find((spp) => "" + spp.id === sppId);

  return (
    <div>
      {speciesData ? (
        <div>
          <p>{speciesData.id}</p>
          <p>{speciesData.scientificName}</p>
          <p>{speciesData.ptName}</p>
          <p>{speciesData.enName}</p>
        </div>
      ) : (
        <SpeciesSearch />
      )}
    </div>
  );
}
