import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import {
  Menu,
  Divider,
  Text,
  IconButton,
  useTheme,
} from "react-native-paper";
import TextActionsInput from "../TextActionsInput/TextActionsInput";
import type { DropdownProps } from "./types";
import memoCompare from "./memoCompare";
import styles from "./flatStyles";

type FlatDropdownProps = {
  menuOffset?: number;
} & DropdownProps;

const MENU_DEFAULT_OFFSET = 65;
const ItemSeparatorComponent = () => <Divider style={styles.divider} />;
const ListEmptyComponent = () => <Text style={styles.noItems}>No items</Text>;

const FlatDropdown: React.FC<FlatDropdownProps> = forwardRef(({
  inputValue,
  options,
  renderOption,
  renderNoItems = ListEmptyComponent,
  renderHost,
  onPress,
  onChangeText,
  onOpen,
  onClose,
  openOnMount = false,
  menuOffset = MENU_DEFAULT_OFFSET,
  keyExtractor = (option) => option.value,
  ...props
}, ref) => {
  const { colors } = useTheme();
  //TODO Actions should be clickable while focus on input!
  if (!renderHost) {
    renderHost = (props) => (
      <TextActionsInput
        rightActions={[
          <IconButton icon="arrow-down" color={colors.primary} onPress={toggleMenu} size={20}/>
        ]}
        {...props}
      />
    );
  }

  const [open, setOpen] = useState(false);
  const [optionWidth, setOptionWidth] = useState(
    (props.style as any)?.width || 100
  );
  const toggleMenu = useCallback(() => {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }, []);
  const openMenu = useCallback(() => {
    setOpen(true);
    onOpen && onOpen();
  }, []);
  const closeMenu = useCallback(() => {
    setOpen(false);
    onClose && onClose();
  }, []);
  const onLayoutCb = useCallback(({ nativeEvent: { layout: { width } } }) => {
    setOptionWidth(width);
  }, []);
  const onTextInput = useCallback((v) => {
    onChangeText && onChangeText(v);
    openMenu();
  }, []);
  const menuStyles = useMemo(() => ({ marginTop: menuOffset }), [menuOffset]);

  useLayoutEffect(() => {
    if (openOnMount) {
      openMenu();
    }
  }, []);

  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    openMenu,
    closeMenu,
    toggleMenu,
    ...inputRef.current
  }));
  return (
    <Menu
      style={menuStyles}
      visible={open}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={toggleMenu} onLayout={onLayoutCb}>
          {renderHost({
            ref: inputRef,
            value: inputValue,
            onFocus: openMenu,
            pointerEvents: "none",
            onChangeText: onTextInput,
            ...props,
          })}
        </TouchableOpacity>
      }
    >
      <FlatList
        keyboardShouldPersistTaps={"handled"}
        style={{ ...styles.flatList, width: optionWidth }}
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={options}
        renderItem={renderOption}
        ListEmptyComponent={renderNoItems}
        keyExtractor={keyExtractor}
      />
    </Menu>
  );
});

export default memo(FlatDropdown, memoCompare);
