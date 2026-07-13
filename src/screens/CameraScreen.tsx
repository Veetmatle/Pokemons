import { useCallback, useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import type { CameraDevice } from 'react-native-vision-camera';
import type { Bounds } from 'react-native-vision-camera-face-detector';
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';
import { useCamera } from '../hooks/useCamera';
import { useFavouritePokemonValue } from '../hooks/useFavouritePokemonValue';
import { getPokemonOfficialArtworkUrlById } from '../services/pokemonService';
import { FaceCameraPreview } from '../components/FaceCameraPreview';
import { NoCameraPermission } from '../components/NoCameraPermission';
import { globalStyles } from '../styles/globalStyles';

const FALLBACK_POKEMON_ID = 1;

type CameraViewProps = {
  device: CameraDevice;
  isActive: boolean;
  pokemonImageUrl: string;
  faceBounds: SharedValue<Bounds | null>;
  isPreviewReady: SharedValue<boolean>;
  onPreviewReadyChange: (ready: boolean) => void;
};

const faceDetectorEnabled =
  Constants.expoConfig?.extra?.faceDetectorEnabled ?? true;

const CameraView: ComponentType<CameraViewProps> = faceDetectorEnabled
  ? // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../components/FaceCameraView').FaceCameraView
  : FaceCameraPreview;

export default function CameraScreen() {
  const { hasPermission, canRequestPermission, requestPermission, device } =
    useCamera();
  const { favouritePokemon } = useFavouritePokemonValue();
  const isFocused = useIsFocused();
  const faceBounds = useSharedValue<Bounds | null>(null);
  const isPreviewReady = useSharedValue(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);

  useEffect(() => {
    requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFocused) {
      isPreviewReady.value = false;
    }
  }, [isFocused, isPreviewReady]);

  const handlePreviewReadyChange = useCallback((ready: boolean) => {
    setIsPreviewLoading(loading => (loading === !ready ? loading : !ready));
  }, []);

  const pokemonId = favouritePokemon?.id ?? FALLBACK_POKEMON_ID;
  const pokemonImageUrl = getPokemonOfficialArtworkUrlById(pokemonId);

  if (!hasPermission && !canRequestPermission) {
    return <NoCameraPermission />;
  }

  if (!hasPermission) {
    return <View style={globalStyles.screen} />;
  }

  if (!device) {
    return <View style={globalStyles.screen} />;
  }

  return (
    <View style={styles.container}>
      <CameraView
        device={device}
        isActive={isFocused}
        pokemonImageUrl={pokemonImageUrl}
        faceBounds={faceBounds}
        isPreviewReady={isPreviewReady}
        onPreviewReadyChange={handlePreviewReadyChange}
      />
      {isPreviewLoading && (
        <View style={styles.loaderOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
});
