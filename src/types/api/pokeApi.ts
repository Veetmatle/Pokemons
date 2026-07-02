// Pokemon list
export interface PokeAPIPokemonResult {
  name: string;
  url: string;
}

export interface PokeAPIResponse {
  results: PokeAPIPokemonResult[];
  next: string | null;
}

// One pokemon detail response
export interface PokeAPIDetailResponse {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
}
