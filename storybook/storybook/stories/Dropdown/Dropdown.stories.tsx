import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import { Menu, Provider, DefaultTheme } from "react-native-paper";
import React from "react";
import {
  FlatDropdown,
  ModalDropdown,
} from "@telenko/react-native-paper-autocomplete";
import CenterView from "../CenterView";
import InputContainer from "../common/InputContainer";

storiesOf("Dropdown", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => (
    <Provider theme={DefaultTheme}>{getStory()}</Provider>
  ))
  .add("FlatDropdown", () => {
    return (
      <InputContainer
        renderInput={(input, setInput) => (
          <FlatDropdown
            onOpen={action("open-menu")}
            onClose={action("close-menu")}
            onChangeText={setInput}
            menuOffset={40}
            style={{ width: 300 }}
            inputValue={input}
            options={[
              { value: "1", label: "option 1" },
              { value: "2", label: "option 2" },
              { value: "3", label: "option 3" },
            ]}
            renderOption={({ item }) => (
              <Menu.Item onPress={action("clicked-item")} title={item.label} />
            )}
          />
        )}
      />
    );
  })
  .add("ModalDropdown", () => {
    return (
      <InputContainer
        renderInput={(input, setInput) => (
          <ModalDropdown
            onOpen={action("open-menu")}
            onClose={action("close-menu")}
            onChangeText={setInput}
            style={{ width: 300 }}
            inputValue={input}
            options={[
              { value: "1", label: "option 1" },
              { value: "2", label: "option 2" },
              { value: "3", label: "option 3" },
            ]}
            renderOption={({ item }) => (
              <Menu.Item onPress={action("clicked-item")} title={item.label} />
            )}
          />
        )}
      />
    );
  });
