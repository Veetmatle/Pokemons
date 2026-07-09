import { memo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { colors } from '../styles/globalStyles';
import { PokemonMarker as PokemonMarkerType } from '../types/marker';
import { getPokemonGitHubImageUrlById } from '../services/pokemonService';
import Image from './Image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
interface Props {
  marker: PokemonMarkerType;
  onPress: (id: string) => void;
}

const SIZE = 44;

function PinMarker({ marker, onPress }: Props) {
  const pokemonImage = getPokemonGitHubImageUrlById(marker.pokemonId);
  const [tracksViewChanges, setTracksViewChanges] = useState(true);
  const opacity = useSharedValue(1);

  const animateOpacity = (toValueOpacity: number) => {
    opacity.value = withTiming(toValueOpacity, { duration: 50 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Marker
      coordinate={marker}
      tracksViewChanges={tracksViewChanges}
      onPress={() => onPress(marker.id)}>
      <Pressable
        onPressIn={() => animateOpacity(0.3)}
        onPressOut={() => animateOpacity(1)}>
        <Animated.View style={[styles.badge, animatedStyle]}>
          <Image
            source={{
              uri: pokemonImage,
            }}
            style={{ width: SIZE, height: SIZE }}
            onLoad={() => setTracksViewChanges(false)}
          />
        </Animated.View>
      </Pressable>
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
