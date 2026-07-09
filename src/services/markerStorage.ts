import AsyncStorage from '@react-native-async-storage/async-storage';
import { PokemonMarker } from '../types/marker';

const MARKERS_KEY = 'pokemon_markers';
export const MAX_MARKERS = 20;

export async function loadMarkers(): Promise<PokemonMarker[]> {
  try {
    const data = await AsyncStorage.getItem(MARKERS_KEY);
    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Loading markers failed', error);
    return [];
  }
}

export async function saveMarkers(markers: PokemonMarker[]): Promise<void> {
  try {
    const trimmed = enforceMarkerLimit(markers);
    await AsyncStorage.setItem(MARKERS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Saving markers failed', error);
  }
}

export function enforceMarkerLimit(
  markers: PokemonMarker[],
): PokemonMarker[] {
  if (markers.length <= MAX_MARKERS) {
    return markers;
  }

  return [...markers]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, MAX_MARKERS);
}
