import { useEffect, useState } from 'react';
import {
  enforceMarkerLimit,
  loadMarkers,
  saveMarkers,
} from '../services/markerStorage';
import { PokemonMarker } from '../types/marker';

export function useMarkers() {
  const [markers, setMarkers] = useState<PokemonMarker[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function init() {
      const storedMarkers = await loadMarkers();
      setMarkers(storedMarkers);
      setLoaded(true);
    }

    init();
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    saveMarkers(markers);
  }, [markers, loaded]);

  function addMarker(marker: {
    latitude: number;
    longitude: number;
    pokemonId: number;
  }) {
    const newMarker: PokemonMarker = {
      id: Date.now().toString(),
      ...marker,
    };

    setMarkers(prev => enforceMarkerLimit([...prev, newMarker]));
  }

  function removeMarker(id: string) {
    setMarkers(prev => prev.filter(marker => marker.id !== id));
  }

  return {
    markers,
    addMarker,
    removeMarker,
  };
}
