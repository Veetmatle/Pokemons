import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';

export default function CameraScreen() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text style={styles.text}>Camera screen</Text>
        <Text style={styles.text}>Work in progress :DD</Text>
      </View>
      <View className="flex-1 bg-white dark:bg-black">
        <Text>Motive color button change</Text>
        <TouchableOpacity onPress={toggleColorScheme}>
          <Text style={styles.text}>Change color</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e63b0c',
  },
});
