import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import { Provider, DefaultTheme, Button, IconButton } from "react-native-paper";
import React from "react";
import { TextActionsInput } from "@telenko/react-native-paper-autocomplete";
import CenterView from "../CenterView";
import InputContainer from "../common/InputContainer";

storiesOf("TextActionsInpur", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => (
    <Provider theme={DefaultTheme}>{getStory()}</Provider>
  ))
  .add("Left Actions", () => {
    return (
      <InputContainer
        defaultValue={""}
        renderInput={(value: string, setValue: (id: string) => void) => (
          <TextActionsInput
            style={{ width: 300 }}
            value={value}
            onChangeText={setValue}
            leftActions={[<IconButton icon="close" size={20} />]}
          />
        )}
      />
    );
  })
  .add("Left & Right Actions", () => {
    return (
      <InputContainer
        defaultValue={""}
        renderInput={(value: string, setValue: (id: string) => void) => (
          <TextActionsInput
            style={{ width: 300 }}
            value={value}
            onChangeText={setValue}
            leftActions={[<IconButton icon="close" size={20} />]}
            rightActions={[<IconButton icon="arrow-expand" size={20} />]}
          />
        )}
      />
    );
  });
