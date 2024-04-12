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
  const speciesData = query?.data?.find((spp) => "" + spp.Evaldo__c === sppId);

  return (
    <div className="mx-auto max-w-[800px] py-[100px]">
      {speciesData ? (
        <div>
          <p>{speciesData.Evaldo__c}</p>
          <p>{speciesData.Name}</p>
          <p>{speciesData.NVP__c}</p>
          <p>{speciesData.USName__c}</p>
          {isSignedIn ? (
            <button>Addicionar Vernaculo</button>
          ) : (
            <SignInButton redirectUrl={`/add?sppId=${speciesData.Evaldo__c}`}>
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
