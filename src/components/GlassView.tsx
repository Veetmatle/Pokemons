import React from 'react';
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassViewProps extends ViewProps {
  intensity?: number;
  tintColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function GlassView({
  children,
  intensity = 40,
  tintColor = 'rgba(255,255,255,0.18)',
  borderRadius = 24,
  style,
  ...rest
}: GlassViewProps) {
  return (
    <View style={[{ borderRadius, overflow: 'hidden' }, style]} {...rest}>
      <BlurView
        intensity={intensity}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: tintColor }]}
      />
      {children}
    </View>
  );
}
