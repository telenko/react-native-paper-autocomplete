import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import {
  Provider,
  DefaultTheme,
  List,
  HelperText,
  IconButton,
  Chip,
  TextInput
} from "react-native-paper";
import React from "react";
import {
  Autocomplete,
  FlatDropdown,
  ModalDropdown,
} from "@telenko/react-native-paper-autocomplete";
import CenterView from "../CenterView";
import InputContainer from "../common/InputContainer";
import AutocompleteMixed from "./Autocomplete.mixed";

storiesOf("Autocomplete [multiple]", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => (
    <Provider theme={DefaultTheme}>{getStory()}</Provider>
  ))
  .add("Autocomplete [default modal mode]", () => {
    return (
      <InputContainer
        defaultValue={[]}
        renderInput={(value: string[], setValue: (ids: string[]) => void) => (
          <Autocomplete
            multiple
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
  .add("Autocomplete [flat dropdown]", () => {
    return (
      <InputContainer
        defaultValue={[]}
        renderInput={(value: string[], setValue: (ids: string[]) => void) => (
          <Autocomplete
            multiple
            renderDropdown={(props) => (
              <FlatDropdown menuOffset={40} {...props} />
            )}
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
  .add("Autocomplete [mixed dropdown]", () => {
    return (
      <InputContainer
        defaultValue={[]}
        renderInput={(value: string[], setValue: (ids: string[]) => void) => (
          <AutocompleteMixed
            multiple
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
  .add("Autocomplete [custom option]", () => {
    return (
      <InputContainer
        defaultValue={[]}
        renderInput={(value: string[], setValue: (ids: string[]) => void) => (
          <Autocomplete
            multiple
            value={value}
            onChange={setValue}
            style={{ width: 300 }}
            options={[
              {
                value: "1",
                label: "option 1",
                description: "some description 1",
              },
              {
                value: "2",
                label: "option 2",
                description: "some description 2",
              },
              {
                value: "3",
                label: "option 3",
                description: "some description 3",
              },
            ]}
            renderOption={({ selected, onSelect, label }, { description }) => {
              return (
                <List.Item
                  onPress={onSelect}
                  title={label}
                  description={description}
                  left={(props) => <List.Icon {...props} icon="mail" />}
                  right={
                    selected
                      ? (props) => <List.Icon {...props} icon="check" />
                      : undefined
                  }
                />
              );
            }}
          />
        )}
      />
    );
  })
  .add("Autocomplete [custom option, filter & flat mode]", () => {
    return (
      <InputContainer
        defaultValue={[]}
        renderInput={(value: string[], setValue: (ids: string[]) => void) => (
          <Autocomplete
            multiple
            value={value}
            onChange={setValue}
            style={{ width: 300 }}
            options={[
              {
                value: "1",
                label: "option 1",
                description: "some description 1",
              },
              {
                value: "2",
                label: "option 2",
                description: "some description 2",
              },
              {
                value: "3",
                label: "option 3",
                description: "some description 3",
              },
            ]}
            filterOptions={(options, input) => {
              if (!input) {
                return options;
              }
              const includesIgnoreNoWhiteSpaceCase = (
                a: string,
                b: string
              ): boolean => {
                const optionQuery = (a || "").replace(/\s/g, "").toUpperCase();
                const inputQuery = (b || "").replace(/\s/g, "").toUpperCase();
                return (
                  optionQuery.includes(inputQuery) ||
                  inputQuery.includes(optionQuery)
                );
              };
              return options.filter((option) => {
                return (
                  includesIgnoreNoWhiteSpaceCase(option.label, input) ||
                  includesIgnoreNoWhiteSpaceCase(option.description, input)
                );
              });
            }}
            renderDropdown={(props) => (
              <FlatDropdown menuOffset={40} {...props} />
            )}
            renderOption={({ selected, onSelect, label }, { description }) => {
              return (
                <List.Item
                  onPress={onSelect}
                  title={label}
                  description={description}
                  left={(props) => <List.Icon {...props} icon="folder" />}
                  right={
                    selected
                      ? (props) => <List.Icon {...props} icon="check" />
                      : undefined
                  }
                />
              );
            }}
          />
        )}
      />
    );
  })
  .add("Autocomplete [modal mode - custom search]", () => {
    return (
      <InputContainer
        defaultValue={[]}
        renderInput={(value: string[], setValue: (ids: string[]) => void) => (
          <Autocomplete
            multiple
            onOpen={action("open-menu")}
            onClose={action("close-menu")}
            renderDropdown={(props) => (
              <ModalDropdown
                {...props}
                renderSearchInput={(props) => (
                  <TextInput
                    {...props}
                    left={<TextInput.Icon name="arrow-down" size={20} />}
                  />
                )}
              />
            )}
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
  .add("Autocomplete [custom chips]", () => {
    return (
      <InputContainer
        defaultValue={[]}
        renderInput={(value: string[], setValue: (ids: string[]) => void) => (
          <Autocomplete
            multiple
            onOpen={action("open-menu")}
            onClose={action("close-menu")}
            renderSelectedItem={({ label, value, onDelete }) => (
              <Chip key={value} icon="folder" mode="outlined" onClose={onDelete}>{label}</Chip>
            )}
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
  .add("Autocomplete [validation errors]", () => {
    return (
      <InputContainer
        defaultValue={[]}
        renderInput={(value: string[], setValue: (ids: string[]) => void) => (
          <Autocomplete
            multiple
            onOpen={action("open-menu")}
            onClose={action("close-menu")}
            value={value}
            error={value.length !== 2}
            renderHelper={
              value.length !== 2
                ? () => (
                    <HelperText type="error" visible>
                      You should select 2 items
                    </HelperText>
                  )
                : null
            }
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
  });
