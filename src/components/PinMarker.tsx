import { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { colors } from '../styles/globalStyles';
import { PokemonMarker as PokemonMarkerType } from '../types/marker';

interface Props {
  marker: PokemonMarkerType;
  onPress: (id: string) => void;
}

const SIZE = 44;

function PinMarker({ marker, onPress }: Props) {
  const { data } = usePokemonDetail(String(marker.pokemonId));
  const letter = data?.name?.charAt(0).toUpperCase() ?? '';
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  const handleLayout = () => {
    if (letter) {
      setTracksViewChanges(false);
    }
  };

  return (
    <Marker
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      tracksViewChanges={tracksViewChanges}
      onPress={() => onPress(marker.id)}>
      <View style={styles.badge} onLayout={handleLayout}>
        <Text style={styles.letter}>{letter}</Text>
      </View>
    </Marker>
  );
}

export default memo(PinMarker);

const styles = StyleSheet.create({
  badge: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.accentMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
  },
});
