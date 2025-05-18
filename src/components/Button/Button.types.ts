export interface IButtonProps {
  onPress: () => void;
  disabled?: boolean;
  label: string;
  activeScale?: number;
}

export const DEFAULT_ACTIVE_SCALE = 0.94;
