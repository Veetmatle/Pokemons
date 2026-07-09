import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useCamera } from '../hooks/useCamera';
import { NoCameraPermission } from '../components/NoCameraPermission';
import { globalStyles } from '../styles/globalStyles';

export default function CameraScreen() {
  const { hasPermission, canRequestPermission, requestPermission, device } =
    useCamera();

  useEffect(() => {
    requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Camera style={StyleSheet.absoluteFill} device={device} isActive />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
