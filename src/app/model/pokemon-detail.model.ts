export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  abilities: Ability[];
  forms: Form[];
  sprites: Sprites;
  types: PokemonType[];
  stats: Stat[];
  image?: string;
}

export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface Form {
  name: string;
  url: string;
}

export interface Sprites {
  front_default: string;
  back_default: string;
  other: OtherSprites;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface OtherSprites {
  [key: string]: OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: string;
}
