import type { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

export type TextActionsProps = {
  containerStyle?: any;
  gap?: number;
  leftActions?: React.ReactElement[];
  rightActions?: React.ReactElement[];
  marginOffset?: number;
} & Omit<TextInputProps, "theme">;
