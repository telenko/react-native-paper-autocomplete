import React from "react";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

type OptionProp = any;

export type DropdownProps = Omit<TextInputProps, "value" | "theme"> & {
  inputValue: string;
  options: OptionProp[];
  onOpen?: () => void;
  onClose?: () => void;
  renderOption: (info: {
    item: OptionProp;
    index: number;
  }) => React.ReactElement;
  renderHost?: (props: Omit<TextInputProps, "theme">) => React.ReactElement;
  renderNoItems?: () => React.ReactElement;
  noItemsLabel?: string;
  onPress?: () => void;
  keyExtractor?: (o: OptionProp) => string;
  openOnMount?: boolean;
};
