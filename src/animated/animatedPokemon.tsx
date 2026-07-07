import {
  cancelAnimation,
  runOnJS,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import Image from '../components/Image';

interface AnimatedPokemonProps {
  imageUrl: string;
}

// Do naprawy na koniec
export default function AnimatedPokemon({ imageUrl }: AnimatedPokemonProps) {
  const wobble = useSharedValue(0);
  const progress = useSharedValue(0);
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);
  const wobbleDuration = 500;

  const handleOnLoad = () => {
    cancelAnimation(wobble);
    progress.value = withTiming(
      1,
      { duration: 500 },
      runOnJS(() => setAnimationFinished(true)),
    );
  };

  useEffect(() => {
    wobble.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 150 }),
        withTiming(-15, { duration: 300 }),
        withTiming(0, { duration: 150 }),
        withDelay(500, withTiming(0, { duration: 0 })),
      ),
      -1,
      false,
    );
  }, [wobble]);

  return (
    <Image
      source={{ uri: imageUrl }}
      style={{ width: 180, height: 180 }}
      transition={400}
      onLoad={handleOnLoad}
    />
  );
}
