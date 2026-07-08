// Pokemon list
export interface PokeAPIPokemonResult {
  name: string;
  url: string;
}

export interface PokeAPIResponse {
  results: PokeAPIPokemonResult[];
  next: string | null;
}

export interface PokeAPISprites {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface PokeAPIAbility {
  ability: { name: string };
  is_hidden: boolean;
}

// One pokemon detail response
export interface PokeAPIDetailResponse {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
  sprites: PokeAPISprites;
  abilities: PokeAPIAbility[];
}
