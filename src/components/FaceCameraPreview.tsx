import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Camera } from 'react-native-vision-camera';
import type { SharedValue } from 'react-native-reanimated';
import type { CameraDevice } from 'react-native-vision-camera';
import type { Bounds } from 'react-native-vision-camera-face-detector';
import { spacing } from '../styles/globalStyles';

type FaceCameraPreviewProps = {
  device: CameraDevice;
  isActive: boolean;
  pokemonImageUrl: string;
  faceBounds: SharedValue<Bounds | null>;
  isPreviewReady: SharedValue<boolean>;
  onPreviewReadyChange: (ready: boolean) => void;
};

export function FaceCameraPreview({
  device,
  isActive,
  pokemonImageUrl,
  faceBounds,
  isPreviewReady,
  onPreviewReadyChange,
}: FaceCameraPreviewProps) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    faceBounds.value = null;
    // eslint-disable-next-line react-hooks/immutability
    isPreviewReady.value = true;
    onPreviewReadyChange(true);
  }, [faceBounds, isPreviewReady, onPreviewReadyChange]);

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
      />
      <View style={styles.badge} pointerEvents="none">
        <Image
          source={{ uri: pokemonImageUrl }}
          contentFit="contain"
          style={styles.badgeImage}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 96,
    height: 96,
    opacity: 0.9,
  },
  badgeImage: {
    width: '100%',
    height: '100%',
  },
});
