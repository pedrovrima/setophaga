import { useEffect, useState } from "react";
import useGetSpecies from "@/app/hooks/useGetSpecies";
import { SpeciesReturn } from "@/server/api/routers/species";

type SearchReturn = {
  id: number;
  stringFound: String;
  scientificName: String;
};

export default function useSpeciesSearch(searchValue: string): SearchReturn[] {
  const query = useGetSpecies();
  const [filteredValues, setFilteredValues] = useState<SearchReturn[]>([]);

  useEffect(() => {
    if (query.data && searchValue.length > 2) {
      const queriedData = query.data.reduce(
        (container: SearchReturn[], value) => {
          value.scientificName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) &&
            container.push({
              id: value.id,
              scientificName: value.scientificName,
              stringFound: value.scientificName,
            });

          value.enName.toLowerCase().includes(searchValue.toLowerCase()) &&
            container.push({
              id: value.id,
              scientificName: value.scientificName,
              stringFound: value.enName,
            });

          value.ptName.toLowerCase().includes(searchValue.toLowerCase()) &&
            container.push({
              id: value.id,
              scientificName: value.scientificName,
              stringFound: value.ptName,
            });
          console.log(container);

          return container;
        },
        [],
      );

      console.log(queriedData);
      setFilteredValues(queriedData);
    }
  }, [searchValue, query.data]);
  if (searchValue.length < 2) return [];

  return filteredValues;
}
