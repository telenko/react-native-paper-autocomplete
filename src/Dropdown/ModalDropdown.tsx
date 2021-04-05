import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FlatList, TouchableOpacity, View, Modal } from "react-native";
import { TextInput, Divider, Text, useTheme } from "react-native-paper";
import type { DropdownProps } from "./types";
import memoCompare from "./memoCompare";
import styles from "./modalStyles";
import type { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

const ItemSeparatorComponent = () => <Divider style={styles.divider} />;

type ModalDropdownProps = {
  renderSearchInput?: (
    props: Omit<TextInputProps, "theme">
  ) => React.ReactElement;
} & DropdownProps;

const ModalDropdown: React.FC<ModalDropdownProps> = forwardRef(
  (
    {
      inputValue,
      options,
      renderOption,
      noItemsLabel = "No items",
      renderNoItems = () => (
        <View style={styles.noItems}>
          <Text>{noItemsLabel}</Text>
        </View>
      ),
      renderSearchInput = (props: Omit<TextInputProps, "theme">) => (
        <TextInput {...props} />
      ),
      renderHost,
      onPress,
      onChangeText,
      onOpen,
      onClose,
      openOnMount = false,
      keyExtractor = (option: any) => option.value,
      style,
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

    const onTextInput = useCallback((v) => {
      openMenu();
      onChangeText && onChangeText(v);
    }, []);

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
      <>
        <TouchableOpacity onPress={toggleMenu}>
          <View>
            {renderHost({
              value: inputValue,
              onFocus: openMenu,
              pointerEvents: "none",
              onChangeText: onTextInput,
              style,
              ...props,
            })}
          </View>
        </TouchableOpacity>
        <Modal
          visible={open}
          onRequestClose={closeMenu}
          animationType="slide"
          style={styles.menu}
        >
          {open
            ? renderSearchInput({
                ref: inputRef,
                autoFocus: true,
                value: inputValue,
                onChangeText: onTextInput,
                style: { ...(style as any), width: "100%" },
                ...props,
              })
            : null}
          <FlatList
            keyboardShouldPersistTaps={"always"}
            style={styles.flatList}
            ItemSeparatorComponent={ItemSeparatorComponent}
            data={options}
            renderItem={renderOption}
            ListEmptyComponent={renderNoItems}
            keyExtractor={keyExtractor}
          />
        </Modal>
      </>
    );
  }
);

export default memo(ModalDropdown, memoCompare);
