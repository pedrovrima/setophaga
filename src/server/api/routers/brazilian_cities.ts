import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export type LocaleReturn = {
  uf: string;
  cities: string[];
};

type Municipio = {
  "municipio-id": number;
  "municipio-nome": string;
  "microrregiao-id": number;
  "microrregiao-nome": string;
  "mesorregiao-id": number;
  "mesorregiao-nome": string;
  "regiao-imediata-id": number;
  "regiao-imediata-nome": string;
  "regiao-intermediaria-id": number;
  "regiao-intermediaria-nome": string;
  "UF-id": number;
  "UF-sigla": string;
  "UF-nome": string;
  "regiao-id": number;
  "regiao-sigla": string;
  "regiao-nome": string;
};

export const citiesRouter = createTRPCRouter({
  getCities: publicProcedure.query(async () => {
    const data = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado",
    );

    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const returnedData = (await data?.json()) as Municipio[];

      if (returnedData) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return returnedData.reduce(
          (obj: LocaleReturn[], data: Municipio): LocaleReturn[] => {
            const thisUF = data["UF-sigla"];
            const isPresent = obj.find((ob) => ob.uf === thisUF);
            if (!isPresent) {
              obj.push({
                uf: thisUF,
                cities: [data["municipio-nome"]],
              });
              return obj;
            }
            const rest = obj.filter((ob) => ob.uf !== thisUF);
            return [
              ...rest,
              {
                ...isPresent,
                cities: [...isPresent.cities, data["municipio-nome"]],
              },
            ];
          },
          [] as LocaleReturn[],
        );
      }
    }
    throw new Error();
  }),
});
