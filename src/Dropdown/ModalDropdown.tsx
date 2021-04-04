import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FlatList, TouchableOpacity, View, Modal } from "react-native";
import {
  TextInput,
  List,
  Divider,
  Text,
  useTheme,
  IconButton,
} from "react-native-paper";
import { DropdownProps } from "./types";
import memoCompare from "./memoCompare";
import styles from "./modalStyles";
import type { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import TextActionsInput from "../TextActionsInput/TextActionsInput";

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
      renderSearchInput = (props) => <TextInput {...props} />,
      renderHost,
      onPress,
      onChangeText,
      onOpen,
      onClose,
      openOnMount = false,
      keyExtractor = (option) => option.value,
      style,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    //TODO Actions should be clickable while focus on input!
    if (!renderHost) {
      renderHost = (props) => (
        <TextActionsInput
          rightActions={[
            <IconButton
              icon="arrow-down"
              color={colors.primary}
              onPress={toggleMenu}
              size={20}
            />,
          ]}
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
      ...inputRef.current,
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
