import { Platform, StyleSheet } from 'react-native';

export const colors = {
  background: '#FBF3E4',
  surface: '#FFFDF9',
  card: '#FCF9F2',
  border: 'rgba(120, 53, 15, 0.08)',
  accent: '#B45309',
  accentSoft: 'rgba(180, 83, 9, 0.08)',
  textPrimary: '#1E293B',
  textSecondary: '#78350F',
  danger: '#991B1B',
  shadow: '#78350F',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
};

export const shadow = (level: 'sm' | 'md' | 'lg') => {
  const presets = {
    sm: { elevation: 2, shadowOpacity: 0.08, shadowRadius: 3, offset: 1 },
    md: { elevation: 4, shadowOpacity: 0.12, shadowRadius: 6, offset: 2 },
    lg: { elevation: 8, shadowOpacity: 0.16, shadowRadius: 12, offset: 4 },
  };
  const preset = presets[level];

  return Platform.select({
    android: { elevation: preset.elevation },
    default: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: preset.offset },
      shadowOpacity: preset.shadowOpacity,
      shadowRadius: preset.shadowRadius,
    },
  });
};

export const typography = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.accent,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  error: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.danger,
  },
});

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow('md'),
  },
});
