import { useState } from "react";
import { Input } from "./ui/input";
import useSpeciesSearch from "@/app/hooks/useSpeciesSearch";
import Link from "next/link";

export default function SpeciesSearch() {
  const [searchValue, setSearchValue] = useState("");
  const filteredValues = useSpeciesSearch(searchValue);
  return (
    <div className="relative max-w-[500px]">
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="z-50 bg-white"
      />
      {filteredValues.length > 0 && (
        <div className="absolute z-10 w-full border-[1px] border-slate-100  px-2 py-4">
          <ul>
            {filteredValues.map((val) => (
              <Link href={"/especies?sppId=" + val?.id || ""}>
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

function boldifyTerm(str: String, term: string) {
  const splitString = str.split(new RegExp(term, "gi"));

  return (
    <span>
      {splitString[0]}
      <span className="font-bold">{term}</span>
      {splitString[1]}
    </span>
  );
}
