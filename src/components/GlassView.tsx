import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  GlassView as NativeGlassView,
  isGlassEffectAPIAvailable,
} from 'expo-glass-effect';

interface GlassViewProps extends ViewProps {
  intensity?: number;
  tintColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function GlassView({
  children,
  intensity = 40,
  tintColor,
  borderRadius = 24,
  style,
  ...rest
}: GlassViewProps) {
  if (isGlassEffectAPIAvailable()) {
    return (
      <NativeGlassView
        glassEffectStyle="regular"
        tintColor={tintColor}
        style={[{ borderRadius, overflow: 'hidden' }, style]}
        {...rest}>
        {children}
      </NativeGlassView>
    );
  }

  return (
    <View style={[{ borderRadius, overflow: 'hidden' }, style]} {...rest}>
      <BlurView
        intensity={intensity}
        tint="light"
        experimentalBlurMethod={
          Platform.OS === 'android' ? 'dimezisBlurView' : undefined
        }
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: tintColor ?? 'rgba(255,255,255,0.18)' },
        ]}
      />
      {children}
    </View>
  );
}
