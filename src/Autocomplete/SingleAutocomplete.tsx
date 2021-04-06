import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import Option from "./Option";
import { FlatDropdown } from "../Dropdown";
import type { SingleAutocompleteProps } from "./types";
import styles from "./styles";
import { filter } from "./utils";

const SingleAutocomplete: React.FC<SingleAutocompleteProps> = ({
  style,
  renderHelper,
  menuOffset,
  renderDropdown = (props) => (
    <FlatDropdown menuOffset={menuOffset} {...props} />
  ),
  renderOption: propRenderOption,
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

  const renderOption = useCallback(
    ({ item }) => {
      const isSelected = value === keyExtractor(item);
      const optionProps = {
        selected: isSelected,
        label: labelExtractor(item),
        value: keyExtractor(item),
        style: styles.option,
        onSelect: () => {
          if (!isSelected) {
            onChange(keyExtractor(item));
            setInputV(labelExtractor(item));
            (dropdownRef.current as any)?.closeMenu();
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
  const dropdownRef = useRef(null);
  return (
    <View style={style}>
      {renderDropdown({
        ref: dropdownRef,
        inputValue: inputV,
        onChangeText: setInputValueCb,
        onFocus: () => {
          setInputV("");
          (dropdownRef.current as any)?.openMenu();
        },
        onBlur: () => {
          const selectedItem =
            value && options.find((op) => keyExtractor(op) === value);
          if (!selectedItem) {
            return;
          }
          setInputV(labelExtractor(selectedItem));
        },
        options: visibleOptions,
        renderOption: renderOption,
        ...props,
      })}
      {renderHelper ? renderHelper() : null}
    </View>
  );
};

export default SingleAutocomplete;
