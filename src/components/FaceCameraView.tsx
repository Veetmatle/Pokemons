import React, { useCallback } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import {
  createAnimatedComponent,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import { Camera } from 'react-native-vision-camera-face-detector';
import type { Bounds } from 'react-native-vision-camera-face-detector';
import type { CameraDevice } from 'react-native-vision-camera';

const AnimatedImage = createAnimatedComponent(Image);

type FaceCameraViewProps = {
  device: CameraDevice;
  isActive: boolean;
  pokemonImageUrl: string;
  faceBounds: SharedValue<Bounds | null>;
  isPreviewReady: SharedValue<boolean>;
  onPreviewReadyChange: (ready: boolean) => void;
};

function FaceCameraViewComponent({
  device,
  isActive,
  pokemonImageUrl,
  faceBounds,
  isPreviewReady,
  onPreviewReadyChange,
}: FaceCameraViewProps) {
  const { width, height } = useWindowDimensions();

  const handleFacesDetected = useCallback<
    React.ComponentProps<typeof Camera>['onFacesDetected']
  >(
    faces => {
      const b = faces[0]?.bounds;
      // eslint-disable-next-line react-hooks/immutability
      faceBounds.value = b
        ? { x: b.x, y: b.y, width: b.width, height: b.height }
        : null;
    },
    [faceBounds],
  );

  const handlePreviewStarted = useCallback(() => {
    // eslint-disable-next-line react-hooks/immutability
    isPreviewReady.value = true;
    onPreviewReadyChange(true);
  }, [isPreviewReady, onPreviewReadyChange]);

  const handlePreviewStopped = useCallback(() => {
    // eslint-disable-next-line react-hooks/immutability
    isPreviewReady.value = false;
    onPreviewReadyChange(false);
  }, [isPreviewReady, onPreviewReadyChange]);

  const handleError = useCallback((error: Error) => {
    console.error('Face detection error:', error);
  }, []);

  const hatStyle = useAnimatedStyle(() => {
    const b = faceBounds.value;
    if (!b || !isPreviewReady.value) {
      return { opacity: 0 };
    }
    const size = b.width;
    return {
      opacity: 1,
      left: b.x,
      top: b.y - size,
      width: size,
      height: size,
    };
  });

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        autoMode
        cameraFacing="front"
        windowWidth={width}
        windowHeight={height}
        performanceMode="fast"
        onFacesDetected={handleFacesDetected}
        onPreviewStarted={handlePreviewStarted}
        onPreviewStopped={handlePreviewStopped}
        onError={handleError}
      />
      <AnimatedImage
        pointerEvents="none"
        source={{ uri: pokemonImageUrl }}
        contentFit="contain"
        style={[styles.hat, hatStyle]}
      />
    </>
  );
}

export const FaceCameraView = React.memo(FaceCameraViewComponent);

const styles = StyleSheet.create({
  hat: {
    position: 'absolute',
  },
});
