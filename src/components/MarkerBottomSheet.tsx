import { useCallback, type Ref } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import {
  colors,
  radius,
  shadow,
  spacing,
  typography,
} from '../styles/globalStyles';
import PokemonCard from './PokemonCard';

interface Props {
  ref?: Ref<BottomSheetModal>;
  pokemonId: number | null;
  onDelete: () => void;
  onClose: () => void;
}

export default function MarkerBottomSheet({
  ref,
  pokemonId,
  onDelete,
  onClose,
}: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  const { height: windowHeight } = useWindowDimensions();
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 40,
    stiffness: 350,
    mass: 0.6,
  });
  const {
    data: pokemon,
    isLoading,
    isError,
  } = usePokemonDetail(String(pokemonId), pokemonId !== null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      maxDynamicContentSize={windowHeight * 0.9}
      enablePanDownToClose
      animationConfigs={animationConfigs}
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}>
      <Pressable
        style={styles.closeButton}
        onPress={() => {
          if (ref && 'current' in ref) {
            ref.current?.dismiss();
          }
        }}
        hitSlop={12}>
        <Text style={styles.closeButtonText}>✕</Text>
      </Pressable>
      <BottomSheetScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: spacing.xl + tabBarHeight },
        ]}>
        {isLoading ? (
          <ActivityIndicator color={colors.accent} />
        ) : isError || !pokemon ? (
          <Text style={typography.error}>
            Could not load Pokemon details :/
          </Text>
        ) : (
          <>
            <PokemonCard pokemon={pokemon} />
            <Pressable style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteButtonText}>Remove marker</Text>
            </Pressable>
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.surface,
  },
  handleIndicator: {
    backgroundColor: colors.accentMedium,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
    gap: spacing.lg,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.xss,
    right: spacing.lg,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow('sm'),
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textMuted,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },
});
