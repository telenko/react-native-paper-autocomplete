# react-native-paper-autocomplete

Full docs in progress...
# Showcase

1) Default modal mode
```tsx
    <Autocomplete
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
```
![default mode](https://media.giphy.com/media/dX1enKz3tW8CjY8BjU/giphy.gif)

2) Flat mode
```tsx
        <Autocomplete
            multiple
            renderDropdown={(props) => (
              <FlatDropdown menuOffset={40} {...props} />
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
```
![flat mode](https://media.giphy.com/media/4YlhkQViF5pYN9kZui/giphy.gif)

3) Custom option
```tsx
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
```
![custom option](https://media.giphy.com/media/h8GS08RlbTaWvOBIL3/giphy.gif)

4) Custom option + flat mode + custom filter
```tsx
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
```
![custom option + flat + filter](https://media.giphy.com/media/kf8IZ07p2lwb1NF8Us/giphy.gif)

5) Custom search input for modal mode
```tsx
        <Autocomplete
            multiple
            renderDropdown={(props) => (
              <ModalDropdown
                {...props}
                renderSearchInput={(props) => (
                  <TextActionsInput
                    {...props}
                    leftActions={[<IconButton icon="arrow-down" size={20} />]}
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
```
![custom search](https://media.giphy.com/media/yv1v1PlCe78rPUWGsi/giphy.gif)

6) Custom chips
```tsx
        <Autocomplete
            multiple
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
```

![custom chips](https://media.giphy.com/media/s9wrnUVrtUTgjfp4rq/giphy.gif)

7) Validation
```tsx
        <Autocomplete
            multiple
            onOpen={() => {}}
            onClose={() => {}}
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
```
![validation](https://media.giphy.com/media/rE6x7d7L0igyjKxj1a/giphy.gif)

8) Single selection autocomplete
```tsx
        <Autocomplete
            menuOffset={40}
            value={value}
            onChange={setValue}
            style={{ width: 300 }}
            options={[
              { value: "1", label: "option 1" },
              { value: "2", label: "option 2" },
              { value: "3", label: "option 3" },
            ]}
          />
```
![single selection](https://media.giphy.com/media/ui2OsIJIdyI4tdEvFv/giphy.gif)

9) Custom host element
```tsx
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
            onOpen={() => {}}
            onClose={() => {}}
            value={value}
            onChange={setValue}
            style={{ width: 300 }}
            options={options}
          />
```

![custom host](https://media.giphy.com/media/BFz2x25motsoj1YvcX/giphy.gif)

10) InputActions Component
```tsx
        <TextActionsInput
            style={{ width: 300 }}
            value={value}
            onChangeText={setValue}
            leftActions={[<IconButton icon="close" size={20} />]}
            rightActions={[<IconButton icon="arrow-expand" size={20} />]}
          />
```

![input actions](https://media.giphy.com/media/4fc4ETdwjk1mPUSKO1/giphy.gif)

11) Plain Dropdown Component (Modal)
```tsx
        <ModalDropdown
            onOpen={() => {}}
            onClose={() => {}}
            onChangeText={setInput}
            style={{ width: 300 }}
            inputValue={input}
            options={[
              { value: "1", label: "option 1" },
              { value: "2", label: "option 2" },
              { value: "3", label: "option 3" },
            ]}
            renderOption={({ item }) => (
              <Menu.Item onPress={() => {}} title={item.label} />
            )}
          />
```

![modal dropdown](https://media.giphy.com/media/h9Qd8io8mOPmUV2jr4/giphy.gif)

12) Plain Dropdown Component (Flat)
```tsx
        <FlatDropdown
            onOpen={() => {}}
            onClose={() => {}}
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
              <Menu.Item onPress={() => {}} title={item.label} />
            )}
          />
```

![flat dropdown](https://media.giphy.com/media/1NSQcfrQF1r3SBHQgP/giphy.gif)

13) Writing Autocomplete which works in mixed mode (flat+modal)
```tsx
import {
  FlatDropdown,
  ModalDropdown,
  Autocomplete,
  AutocompleteProps,
} from "@telenko/react-native-paper-autocomplete";
import React, { useState } from "react";

const AutocompleteMixed: React.FC<AutocompleteProps> = (props) => {
  const [modal, setModal] = useState(false);
  const [currentOpen, setCurrentOpen] = useState(props.openOnMount);
  return (
    <Autocomplete
      renderDropdown={(props) =>
        modal ? (
          <ModalDropdown openOnMount={currentOpen} {...props} />
        ) : (
          <FlatDropdown openOnMount={currentOpen} menuOffset={40} {...props} />
        )
      }
      onClose={() => {
        setCurrentOpen(false);
        setModal(false);
      }}
      onChangeText={v => {
        setCurrentOpen(true);
        setModal(v.length > 0);
      }}
      {...props}
    />
  );
};
```

![mixed mode](https://media.giphy.com/media/U3rNdlAdLs8gfYa9qi/giphy.gif)