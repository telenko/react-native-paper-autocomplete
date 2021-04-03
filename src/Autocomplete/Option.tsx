import React from "react";
import { StyleSheet } from "react-native";
import { Menu, useTheme } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import type { OptionProps } from "./types";

const Option: React.FC<OptionProps> = ({
  label,
  onSelect,
  selected,
  style,
  value,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <Menu.Item
        titleStyle={selected ? styles.selectedTitle : null}
        title={label}
        key={value}
        style={{
          ...style,
          ...(selected ? styles.selectedItem : null),
        }}
        onPress={onSelect}
      />
      {selected ? (
        <Entypo
          selectable
          name="check"
          size={15}
          color={colors.primary}
          style={styles.icon}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  icon: { position: "absolute", top: 10, left: 10 },
  selectedItem: { paddingLeft: 20 },
  selectedTitle: { fontWeight: "700" }
});

export default Option;
