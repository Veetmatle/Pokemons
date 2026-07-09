import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { colors } from '../styles/globalStyles';
import { PokemonMarker as PokemonMarkerType } from '../types/marker';
import { getPokemonGitHubImageUrlById } from '../services/pokemonService';
import Image from './Image';
interface Props {
  marker: PokemonMarkerType;
  onPress: (id: string) => void;
}

const SIZE = 44;

function PinMarker({ marker, onPress }: Props) {
  const pokemonImage = getPokemonGitHubImageUrlById(marker.pokemonId);
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  return (
    <Marker
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      tracksViewChanges={tracksViewChanges}
      onPress={() => onPress(marker.id)}>
      <View style={styles.badge}>
        <Image
          source={{
            uri: pokemonImage,
          }}
          style={{ width: SIZE, height: SIZE }}
          onLoad={() => setTracksViewChanges(false)}
        />
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
});
