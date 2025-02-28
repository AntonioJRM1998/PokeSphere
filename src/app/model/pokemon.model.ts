import { PokemonDetail } from './pokemon-detail.model';

export interface PokemonList {
  count?: number;
  next?: string;
  previous?: string;
  results?: PokemonDetail[];
}

export interface Pokemon {
  name: string;
  url: string;
  image?: string;
  id?: number;
}
