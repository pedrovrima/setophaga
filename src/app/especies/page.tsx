"use client";

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import useGetSpecies from "../hooks/useGetSpecies";

const data = [{ id: 1 }, { id: 2 }];

export default function Especies() {
  const query = useGetSpecies();

  const { get, set } = useSearchParams();
  const sppId = get("sppId");
  console.log(query.data);
  const speciesData = query?.data?.find((spp) => "" + spp.id === sppId);

  return <div>{speciesData ? <p>data</p> : <p>noData</p>}</div>;
}
