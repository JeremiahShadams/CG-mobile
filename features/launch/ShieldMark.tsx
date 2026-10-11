import Svg, { Path } from 'react-native-svg';
import { LAUNCH } from './launchSpec';

interface Props {
  size?: number;
}

/**
 * Approved ContractGuard shield-check mark.
 * Exact paths from the design drafts (stroke-based, teal on transparent).
 * No repo shield asset existed, so the vector is rendered directly —
 * do not substitute a CSS approximation.
 */
export function ShieldMark({ size = LAUNCH.layout.shieldSize }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={LAUNCH.colors.shield}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessibilityIgnoresInvertColors
    >
      <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <Path d="m9 12 2 2 4-4" />
    </Svg>
  );
}
