type FilterModalValues = {
  location: string;
  roominess: string[];
  areaStart: string;
  areaEnd: string;
  priceStart: string;
  priceEnd: string;
  floorStart: string;
  floorEnd: string;
  source: string[];
  author: string;
  dealType: string;
  listingType: string;
  hasClient: string;
  propertySubtype: string[];
  liquidity: string;
  status: string[];
  publishedStart: string;
  publishedEnd: string;
  containsWords: string;
  excludeWords: string;
  yearStart: string;
  yearEnd: string;
  renovation: string[];
};

function createDefaultFilterModalValues(): FilterModalValues {
  return {
    location: "", roominess: [], areaStart: "", areaEnd: "", priceStart: "", priceEnd: "", floorStart: "", floorEnd: "",
    source: [], author: "Не выбрано", dealType: "Не выбрано", listingType: "Все", hasClient: "Все", propertySubtype: [],
    liquidity: "Не выбрано", status: [], publishedStart: "", publishedEnd: "", containsWords: "", excludeWords: "",
    yearStart: "", yearEnd: "", renovation: [],
  };
}

export { createDefaultFilterModalValues };
export type { FilterModalValues };
