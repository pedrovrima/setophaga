"use client";

import { useSearchParams } from "next/navigation";
import useGetSpecies from "../hooks/useGetSpecies";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({});

export default function Add() {
  const query = useGetSpecies();

  const { get } = useSearchParams();
  const sppId = get("sppId");
  const speciesData = query?.data?.find((spp) => "" + spp.id === sppId);

  return (
    <div>
      <p>
        Adicionar novo vernáculo para {speciesData?.ptName} -{" "}
        <span className="italic">{speciesData?.scientificName}</span>
      </p>
      {/* <Form></Form> */}
    </div>
  );
}
