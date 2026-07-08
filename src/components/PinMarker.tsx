import { Image, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { PokemonMarker as PokemonMarkerType } from '../types/marker';

interface Props {
  marker: PokemonMarkerType;
  onPress: () => void;
}

export default function PinMarker({ marker, onPress }: Props) {
  return (
    <Marker
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      onPress={onPress}>
      <Image
        source={{
          uri: marker.pokemonImage,
        }}
        style={styles.image}
      />
    </Marker>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 72,
    height: 72,
  },
});
