import { useEffect, useState } from 'react';
import { loadMarkers, saveMarkers } from '../services/markerStorage';
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

  function addMarker(marker: Omit<PokemonMarker, 'id' | 'createdAt'>) {
    const newMarker: PokemonMarker = {
      id: Date.now().toString(),
      createdAt: Date.now(),
      ...marker,
    };

    setMarkers(prev => [...prev, newMarker]);
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
