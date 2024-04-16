import birds from "./data_birds.json" assert { type: "json" };

const review = "1";
const birdData = birds;
const idArray = birdData.records.map((rec) => rec.Evaldo__c);

export const urls = idArray.map((id) => ({
  url: `/especies/${id}`,
  revision: review,
}));
