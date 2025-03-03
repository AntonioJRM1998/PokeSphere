export interface PokemonAllCards {
  data: PokemonCard[];
}

export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom?: string;
  attacks: Attack[];
  weaknesses: Weakness[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: CardSet;
  number: string;
  artist: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: CardImages;
  tcgplayer?: MarketInfo;
  cardmarket?: MarketInfo;
}

interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Weakness {
  type: string;
  value: string;
}

interface CardSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

interface Legalities {
  unlimited: string;
}

interface CardImages {
  small: string;
  large: string;
}

interface SetImages {
  symbol: string;
  logo: string;
}

interface MarketInfo {
  url: string;
  updatedAt: string;
  prices: MarketPrices;
}

interface MarketPrices {
  holofoil?: PriceDetails;
  averageSellPrice?: number;
  lowPrice?: number;
  trendPrice?: number;
  germanProLow?: number;
  suggestedPrice?: number;
  reverseHoloSell?: number;
  reverseHoloLow?: number;
  reverseHoloTrend?: number;
  lowPriceExPlus?: number;
  avg1?: number;
  avg7?: number;
  avg30?: number;
  reverseHoloAvg1?: number;
  reverseHoloAvg7?: number;
  reverseHoloAvg30?: number;
}

interface PriceDetails {
  low?: number;
  mid?: number;
  high?: number;
  market?: number;
  directLow?: number | null;
}
