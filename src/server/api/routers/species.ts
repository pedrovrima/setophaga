import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

interface SalesforceAccessToken {
  access_token: string;
  token_format: string;
  scope: string;
  instance_url: string;
  id: string;
  token_type: string;
  api_instance_url: string;
}

export interface BirdRecord {
  Danish__c: string;
  Dutch__c: string;
  Ebird__c: string;
  Especie__c: string;
  Estonian__c: string;
  Evaldo__c: number;
  Familia__c: string;
  Finnish__c: string;
  French__c: string;
  Genero__c: string;
  German__c: string;
  Hungarian__c: string;
  Japanese__c: string;
  Name: string;
  Norwegian__c: string;
  NVP__c: string;
  Ordem__c: string;
  Polish__c: string;
  Russian__c: string;
  Slovak__c: string;
  Spanish__c: string;
  Swedish__c: string;
  Taxon__c: string;
  USName__c: string;
  [key: string]: string | number | undefined;
}

export const speciesRouter = createTRPCRouter({
  getAllSpecies: publicProcedure.query(async () => {
    const _auth = await fetch(
      "https://test.salesforce.com/services/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzTVZHOU00M2lycjlKQXV6cFhGcUo4aGthOFZ0YmozYjFUOHowTnFYVXloaHJvbkU0bldqRXV3c3VlcF84M1RyQkxkUGFWU0VQX1NiNjE0V1F3QzBOIiwic3ViIjoiYXZlcy5wZWRyb3ZyaW1hQGdtYWlsLmNvbS50cmFkIiwiYXVkIjoiaHR0cHM6Ly90ZXN0LnNhbGVzZm9yY2UuY29tIiwiZXhwIjoiMjAyODIxOTM0NiJ9.ma44dj_88R4ALrJkTlRDV5qbTyXLwcecbQyywOLh4XbSWjGkLPsIxzIOj6OlGUEVS7CAWk4dEL9hvWm41XGs6c-3ktnwRh9kasiH3f3vc5P0L4RAS6PFt0r0SvJ_MOmfa9pdyfEtraubkK_kXhf4Y-T6NSMMeTx2jEoAnHEYgwvjhZMlZH8NUByGHZZSdpmtdxmTeb9E2p4-R6qeEoCd9gXvkhoCbisflKQHmurPNTS2RljP8zbubMSbDlw6PPGRmusNO-SDfqadUD2-ec6j2o35sI70ltTD5ZCFJn2uJkd6mP4IraLw0_Q8-q9pBmMGC0uAiSvCTnzH5jbjau0TwQ",
      },
    );

    const auth = (await _auth.json()) as SalesforceAccessToken;

    const data = await fetch(
      "https://evaldo--trad.sandbox.my.salesforce.com/services/data/v60.0/query?q=SELECT+Danish__c%2CDutch__c%2CEbird__c%2CEspecie__c%2CEstonian__c%2CEvaldo__c%2CFamilia__c%2CFinnish__c%2CFrench__c%2CGenero__c%2CGerman__c%2CHungarian__c%2CJapanese__c%2CName%2CNorwegian__c%2CNVP__c%2COrdem__c%2CPolish__c%2CRussian__c%2CSlovak__c%2CSpanish__c%2CSwedish__c%2CTaxon__c%2CUSName__c+FROM+elon__c+WHERE+Categoria__c+%3D+%27Esp%C3%A9cie%27",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth?.access_token}`,
        },
      },
    );

    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const returnedData = await data?.json();
      if (returnedData) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return returnedData?.records as BirdRecord[];
      }
    }
    throw new Error();
  }),
});
