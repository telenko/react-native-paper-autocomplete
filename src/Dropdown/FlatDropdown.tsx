import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Menu, Divider, Text, TextInput, useTheme } from "react-native-paper";
import type { DropdownProps } from "./types";
import memoCompare from "./memoCompare";
import styles from "./flatStyles";

type FlatDropdownProps = {
  menuOffset?: number;
} & DropdownProps;

const MENU_DEFAULT_OFFSET = 65;
const ItemSeparatorComponent = () => <Divider style={styles.divider} />;

const FlatDropdown: React.FC<FlatDropdownProps> = forwardRef(
  (
    {
      inputValue,
      options,
      renderOption,
      noItemsLabel = "No items",
      renderNoItems = () => <Text style={styles.noItems}>{noItemsLabel}</Text>,
      renderHost,
      onPress,
      onChangeText,
      onOpen,
      onClose,
      openOnMount = false,
      menuOffset = MENU_DEFAULT_OFFSET,
      keyExtractor = (option: any) => option.value,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    if (!renderHost) {
      renderHost = (props) => (
        <TextInput
          right={
            <TextInput.Icon
              name="arrow-down"
              color={colors.primary}
              onPress={toggleMenu}
              size={20}
            />
          }
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
      ...(inputRef.current as any),
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
  }
);

export default memo(FlatDropdown, memoCompare);
