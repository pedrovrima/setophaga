"use client";

import { useSearchParams } from "next/navigation";
import useGetSpecies from "../hooks/useGetSpecies";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useGetCities from "../hooks/useGetCities";

const formSchema = z.object({});

export default function Add() {
  // const query = useGetSpecies();
  // const query2 = useGetCities();
  // console.log(query2);
  // const { get } = useSearchParams();
  // const sppId = get("sppId");
  // const speciesData = query?.data?.find((spp) => "" + spp.Evaldo__c === sppId);
  // return (
  //   <div>
  //     <p>
  //       Adicionar novo vernáculo para {speciesData?.NVP__c} -{" "}
  //       <span className="italic">{speciesData?.Name}</span>
  //     </p>
  //     {/* <Form></Form> */}
  //   </div>
  // );
}
