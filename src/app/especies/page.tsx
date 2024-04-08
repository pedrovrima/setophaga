"use client";

import { useSearchParams } from "next/navigation";
import useGetSpecies from "../hooks/useGetSpecies";
import SpeciesSearch from "@/components/speciesSearch";
import { SignInButton, useAuth } from "@clerk/nextjs";

export default function Especies() {
  const query = useGetSpecies();
  const { isSignedIn } = useAuth();

  const { get } = useSearchParams();
  const sppId = get("sppId");
  const speciesData = query?.data?.find((spp) => "" + spp.id === sppId);

  return (
    <div className="mx-auto max-w-[800px] py-[100px]">
      {speciesData ? (
        <div>
          <p>{speciesData.id}</p>
          <p>{speciesData.scientificName}</p>
          <p>{speciesData.ptName}</p>
          <p>{speciesData.enName}</p>
          {isSignedIn ? (
            <button>Addicionar Vernaculo</button>
          ) : (
            <SignInButton redirectUrl={`/add?sppId=${speciesData.id}`}>
              Para adicionar um vernaculo, faça o login
            </SignInButton>
          )}
        </div>
      ) : (
        <SpeciesSearch />
      )}
    </div>
  );
}
