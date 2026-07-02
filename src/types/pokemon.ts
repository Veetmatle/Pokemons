export interface PokemonData {
  id: number;
  name: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetailData {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  height: number;
  weight: number;
}
