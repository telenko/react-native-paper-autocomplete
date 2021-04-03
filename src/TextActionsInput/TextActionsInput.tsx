import React, { forwardRef, useCallback, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import type { TextActionsProps } from "./types";
import styles from "./styles";

const isValidActions = (list?: React.ReactElement[]) => {
  return Array.isArray(list) && list.length > 0;
};

const TestActionsInput: React.FC<TextActionsProps> = forwardRef(({
  marginOffset = -12,
  containerStyle = {},
  leftActions,
  rightActions,
  gap = 0,
  ...props
}, ref) => {
  const [rightWidth, setRightWidth] = useState(0);
  const [leftWidth, setLeftWidth] = useState(0);
  const leftLayoutCallback = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      setLeftWidth(width + marginOffset);
    },
    []
  );
  const rightLayoutCallback = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      setRightWidth(width + marginOffset);
    },
    []
  );
  return (
    <View style={{ ...containerStyle, position: 'relative' }}>
      {isValidActions(leftActions) ? (
        <View
          onLayout={leftLayoutCallback}
          style={{
            ...styles.actionsContainer,
            left: 0
          }}
        >
          {leftActions.map((action, index) => (
            <View key={index} style={{ marginHorizontal: gap }}>
              {action}
            </View>
          ))}
        </View>
      ) : null}

      <TextInput
        {...props}
        ref={ref}
        style={{
          ...(props.style as any),
          paddingRight: rightWidth,
          paddingLeft: leftWidth,
        }}
      />

      {isValidActions(rightActions) ? (
        <View
          onLayout={rightLayoutCallback}
          style={{
            ...styles.actionsContainer,
            right: 0,
          }}
        >
          {rightActions.map((action, index) => (
            <View key={index} style={{ marginHorizontal: gap }}>
              {action}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
});

export default TestActionsInput;
