export interface PokemonData {
  id: number;
  name: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonSprites {
  official: string | null;
  frontDefault: string | null;
  frontShiny: string | null;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonDetailData {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  height: number;
  weight: number;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
}
