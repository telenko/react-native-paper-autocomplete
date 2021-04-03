import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";
import Option from "./Option";
import { ModalDropdown } from "../Dropdown";
import type {
  MultiAutocompleteProps,
  SelectedItemProps,
} from "./types";
import memoCompare from "./memoCompare";
import styles from "./styles";
import { filter } from "./utils";

const MultiAutocomplete: React.FC<MultiAutocompleteProps> = ({
  style,
  renderHelper,
  renderDropdown = (props) => <ModalDropdown {...props} />,
  renderOption: propRenderOption,
  renderSelectedItem,
  filterOptions,
  value = [],
  options = [],
  onChange,
  keyExtractor = (option) => option.value,
  labelExtractor = (option) => option.label,
  onChangeText,
  ...props
}) => {
  const [inputV, setInputV] = useState("");
  const [visibleOptions, setOptions] = useState(options);

  useEffect(() => {
    setOptions(filterCb(options, inputV));
  }, [inputV, value.length, options.length]);

  const setInputValueCb = useMemo(() => {
    return (v: string) => {
      onChangeText && onChangeText(v);
      setInputV(v);
    };
  }, [onChangeText]);
  const filterCb = useMemo(() => {
    if (typeof filterOptions === "function") {
      return filterOptions;
    }
    return (options: any[], inputV: string) => {
      return filter(options, inputV, labelExtractor);
    };
  }, [filterOptions]);
  const removeItem = useCallback(
    (valueIt: string) => {
      onChange(value.filter((val) => val !== valueIt));
    },
    [value, onChange]
  );
  const renderOption = useCallback(
    ({ item }) => {
      const isSelected = !!value.find((id) => keyExtractor(item) === id);
      const optionProps = {
        selected: isSelected,
        label: labelExtractor(item),
        value: keyExtractor(item),
        style: styles.option,
        onSelect: () => {
          if (isSelected) {
            onChange(value.filter((vId) => vId !== keyExtractor(item)));
          } else {
            onChange([...value, keyExtractor(item)]);
          }
        },
      };
      if (propRenderOption) {
        return propRenderOption(optionProps, item);
      }
      return <Option {...optionProps} />;
    },
    [value, propRenderOption]
  );
  return (
    <View style={style}>
      {renderDropdown({
        inputValue: inputV,
        onChangeText: setInputValueCb,
        options: visibleOptions,
        renderOption: renderOption,
        ...props,
      })}
      {renderHelper ? renderHelper() : null}
      <View style={styles.chipContainer}>
        {value.map((valueIt: string) => {
          const selectedItem = options.find(
            (op) => keyExtractor(op) === valueIt
          );
          const selectedItemProps: SelectedItemProps = {
            label: labelExtractor(selectedItem),
            value: valueIt,
            onDelete: () => removeItem(valueIt),
            style: styles.chip,
          };
          if (renderSelectedItem) {
            return renderSelectedItem(selectedItemProps, selectedItem);
          }
          return (
            <Chip
              style={selectedItemProps.style}
              key={selectedItemProps.value}
              onPress={selectedItemProps.onDelete}
              onClose={selectedItemProps.onDelete}
            >
              {selectedItemProps.label}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

export default memo(MultiAutocomplete, memoCompare);
