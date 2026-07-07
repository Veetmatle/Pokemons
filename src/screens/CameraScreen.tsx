import { Text, ScrollView } from 'react-native';
import { globalStyles, typography } from '../styles/globalStyles';

export default function CameraScreen() {
  return (
    <ScrollView
      style={globalStyles.screen}
      contentContainerStyle={globalStyles.centerContainer}>
      <Text style={typography.title}>Camera screen</Text>
    </ScrollView>
  );
}
