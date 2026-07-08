import AsyncStorage from '@react-native-async-storage/async-storage';
import { PokemonMarker } from '../types/marker';

const MARKERS_KEY = 'pokemon_markers';

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
    await AsyncStorage.setItem(MARKERS_KEY, JSON.stringify(markers));
  } catch (error) {
    console.error('Saving markers failed', error);
  }
}
