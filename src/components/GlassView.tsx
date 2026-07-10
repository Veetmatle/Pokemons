import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import { BlurView, BlurTargetViewProps } from 'expo-blur';
import {
  GlassView as NativeGlassView,
  isGlassEffectAPIAvailable,
} from 'expo-glass-effect';

interface GlassViewProps extends ViewProps {
  intensity?: number;
  tintColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  blurTarget?: BlurTargetViewProps['ref'];
}

export function GlassView({
  children,
  intensity = 40,
  tintColor,
  borderRadius = 24,
  style,
  blurTarget,
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

  const isAndroid = Platform.OS === 'android';

  return (
    <View style={[{ borderRadius, overflow: 'hidden' }, style]} {...rest}>
      <BlurView
        intensity={isAndroid ? Math.max(intensity, 80) : intensity}
        tint="light"
        blurMethod={isAndroid ? 'dimezisBlurView' : undefined}
        blurTarget={isAndroid ? blurTarget : undefined}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor:
              tintColor ??
              (isAndroid ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)'),
          },
        ]}
      />
      {children}
    </View>
  );
}
