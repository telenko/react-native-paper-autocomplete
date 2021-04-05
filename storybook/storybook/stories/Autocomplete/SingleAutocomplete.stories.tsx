import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import {
  Provider,
  DefaultTheme,
  Button,
} from "react-native-paper";
import React from "react";
import {
  Autocomplete,
} from "@telenko/react-native-paper-autocomplete";
import CenterView from "../CenterView";
import InputContainer from "../common/InputContainer";

storiesOf("Autocomplete [single]", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => (
    <Provider theme={DefaultTheme}>{getStory()}</Provider>
  ))
  .add("Autocomplete [default flat mode]", () => {
    return (
      <InputContainer
        defaultValue={""}
        renderInput={(value: string, setValue: (id: string) => void) => (
          <Autocomplete
            menuOffset={40}
            onOpen={action("open-menu")}
            onClose={action("close-menu")}
            value={value}
            onChange={setValue}
            style={{ width: 300 }}
            options={[
              { value: "1", label: "option 1" },
              { value: "2", label: "option 2" },
              { value: "3", label: "option 3" },
            ]}
          />
        )}
      />
    );
  })
  .add("Autocomplete [custom host element]", () => {
    const options = [
      { value: "1", label: "option 1" },
      { value: "2", label: "option 2" },
      { value: "3", label: "option 3" },
    ];
    return (
      <InputContainer
        defaultValue={""}
        renderInput={(value: string, setValue: (id: string) => void) => (
          <Autocomplete
            menuOffset={15}
            renderHost={() => (
              <Button mode="contained">
                {value
                  ? options.find((op) => op.value === value)?.label
                  : "Select value..."}
              </Button>
            )}
            filterOptions={(options) => options}
            onOpen={action("open-menu")}
            onClose={action("close-menu")}
            value={value}
            onChange={setValue}
            style={{ width: 300 }}
            options={options}
          />
        )}
      />
    );
  });
