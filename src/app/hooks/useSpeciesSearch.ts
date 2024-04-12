"use client";

import { useEffect, useState } from "react";
import useGetSpecies from "@/app/hooks/useGetSpecies";
import type { BirdRecord } from "@/server/api/routers/species";

type SearchReturn = {
  id: number;
  stringFound: string;
  scientificName: string;
};

type HookReturn = [SearchReturn[] | undefined, boolean];

const criterias = [
  "Danish__c",
  "Dutch__c",
  "Estonian__c",
  "Finnish__c",
  "French__c",
  "German__c",
  "Hungarian__c",
  "Japanese__c",
  "Name",
  "Norwegian__c",
  "NVP__c",
  "Polish__c",
  "Russian__c",
  "Slovak__c",
  "Spanish__c",
  "Swedish__c",
  "USName__c",
];

export default function useSpeciesSearch(searchValue: string): HookReturn {
  const query = useGetSpecies();
  const [filteredValues, setFilteredValues] = useState<SearchReturn[]>([]);

  useEffect(() => {
    if (query.data && searchValue.length > 2) {
      const queriedData = query.data.reduce(
        (container: SearchReturn[], value) => {
          criterias.map((crt: string) => {
            searchByCriteria(crt, value, searchValue, container);
          });

          return container;
        },
        [],
      );

      setFilteredValues(queriedData);
    }
  }, [searchValue, query.data]);
  if (!query.data) return [undefined, query.isLoading];
  if (searchValue.length < 3) return [[], false];

  return [filteredValues, false];
}

const searchByCriteria = (
  criteria: string,
  value: BirdRecord,
  searchValue: string,
  container: SearchReturn[],
): void => {
  value[criteria]?.toLowerCase().includes(searchValue.toLowerCase()) &&
    container.push({
      id: value.Evaldo__c,
      scientificName: value.Name,
      stringFound: value[criteria]!,
    });
};
