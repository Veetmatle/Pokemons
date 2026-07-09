import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { colors, radius, spacing, typography } from '../styles/globalStyles';

interface Props {
  pokemonId: number | null;
  onDelete: () => void;
  onClose: () => void;
}

const MarkerBottomSheet = forwardRef<BottomSheet, Props>(
  ({ pokemonId, onDelete, onClose }, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 40,
      stiffness: 350,
      mass: 0.6,
    });
    const { data } = usePokemonDetail(String(pokemonId), pokemonId !== null);
    const sheetRef = useRef<BottomSheet>(null);
    useImperativeHandle(ref, () => sheetRef.current as BottomSheet);

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
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        animationConfigs={animationConfigs}
        onClose={onClose}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleIndicator}>
        <Pressable
          style={styles.closeButton}
          onPress={() => sheetRef.current?.close()}
          hitSlop={12}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
        <BottomSheetScrollView contentContainerStyle={styles.content}>
          <Text style={typography.title}>{data?.name ?? '...'}</Text>
          <Pressable style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Remove marker</Text>
          </Pressable>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

MarkerBottomSheet.displayName = 'MarkerBottomSheet';

export default MarkerBottomSheet;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.surface,
  },
  handleIndicator: {
    backgroundColor: colors.accentMedium,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 1,
    padding: spacing.xs,
  },
  closeButtonText: {
    fontSize: 18,
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
