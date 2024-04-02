"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import useSpeciesSearch from "@/app/hooks/useSpeciesSearch";
import Link from "next/link";

export default function SpeciesSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredValues, isLoading] = useSpeciesSearch(searchValue);
  return (
    <div className="relative mx-auto w-[500px]">
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="z-50 bg-white text-black"
        placeholder="Digite um termo"
      />
      {(!filteredValues || isLoading) && (
        <div className="absolute z-10 w-full border-[1px] border-slate-100 bg-white px-2  py-4 text-black">
          Loading...
        </div>
      )}
      {filteredValues && filteredValues.length > 0 && (
        <div className="absolute z-10 w-full border-[1px] border-slate-100  px-2 py-4">
          <ul>
            {filteredValues.map((val) => (
              <Link key={val.id} href={"/especies?sppId=" + val?.id || ""}>
                <li className="px-2 py-[1px] hover:bg-slate-300">
                  <div className="flex justify-between">
                    <p>{boldifyTerm(val.stringFound, searchValue)}</p>
                    <p className="text-sm italic text-gray-500">
                      {val?.scientificName}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function boldifyTerm(str: string, term: string) {
  const splitString = str.split(new RegExp(term, "gi"));

  return (
    <span>
      {splitString[0]}
      <span className="font-bold">{term}</span>
      {splitString[1]}
    </span>
  );
}
