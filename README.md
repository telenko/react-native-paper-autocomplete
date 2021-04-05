# General description

Library is a set of easy to use, customizable components (based on [react-native-paper](https://reactnativepaper.com/)) which can help with building autocomplete/dropdown components.

![default mode](https://media.giphy.com/media/dX1enKz3tW8CjY8BjU/giphy.gif)

# Getting started

1. Install library

```
npm install @telenko/react-native-paper-autocomplete --save
```

2. Import components

```tsx
import {
  Autocomplete,
  FlatDropdown,
  ModalDropdown,
} from "@telenko/react-native-paper-autocomplete";
```

3. Using Autocomplete with multiple mode

```tsx
const SomeForm: React.FC = () => {
  const [selectedIds, setIds] = useState([]);
  const options = useMemo(
    () => [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
    []
  );
  return (
    <Autocomplete
      multiple
      value={selectedIds}
      onChange={setIds}
      options={options}
    />
  );
};
```

4. Using Autocomplete with single mode

```tsx
const SomeForm: React.FC = () => {
  const [id, setId] = useState("");
  const options = useMemo(
    () => [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
    []
  );
  return <Autocomplete value={id} onChange={setId} options={options} />;
};
```

5.  For more examples go to [showcase](#Showcase) section or checkout [stories of storybook](https://github.com/telenko/react-native-paper-autocomplete/tree/main/storybook/storybook/stories)

**!Note, to run storybook follow such steps:**

1.  Go to /storybook folder
2.  Run: `npm run <platrofm>` (f.e. `npm run android`)
3.  [Expo](https://expo.io/) application of storybook should run

# API

1. ## Autocomplete

   ```ts
   import { Autocomplete } from "@telenko/react-native-paper-autocomplete";
   ```

   ### Autocomplete props:

   ### multiple

   - **Type**: boolean
   - **Required**: false
   - **Default**: false
   - **Description**: Sets whether component will work in **multiple** or **single** mode

   ### value

   - **Type**: string _(single mode)_ | string[] _(multiple mode)_
   - **Required**: true
   - **Default**: "" _(single mode)_ | [] _(multiple mode)_
   - **Description**: Sets value of autocomplete

   ### onChange

   - **Type**: (v: string) => void _(single mode)_ | (v: string[]) => void _(multiple mode)_
   - **Required**: true
   - **Default**: -
   - **Description**: Sets value of autocomplete

   ### renderHelper

   - **Type**: () => React.ReactElement
   - **Required**: false
   - **Default**: -
   - **Description**: Element will be rendered between host/trigger input and chips (can be useful for validation)

   ### renderDropdown

   - **Type**: (props: [DropdownProps](#Dropdown)) => React.ReactElement
   - **Required**: false
   - **Default**: _uses FlatDropdown for single mode_ | _uses ModalDropdown for multiple mode_
   - **Description**: Renders dropdown component

   ### renderOption

   - **Type**: ({ value, label, selected, onSelect }, optionItem) => React.ReactElement
   - **Required**: false
   - **Default**: _uses inner widget_
   - **Description**: Renders single option inside dropdown

   ### filterOptions

   - **Type**: (options: any[], inputV: string) => any[]
   - **Required**: false
   - **Default**: _local implementation, checks that option label includes query input string_
   - **Description**: Filters options list depending on text input value

   ### labelExtractor

   - **Type**: (item: any) => string
   - **Required**: false
   - **Default**: item => item.label
   - **Description**: Gets option view text from option item

   ### [...Inherits all other common dropdown props](#Dropdown)

   ## Multiple mode specific props

   ### renderSelectedItem

   - **Type**: ({ value, label, style, onDelete }, optionItem: any) => React.ReactElement
   - **Required**: false
   - **Default**: _Renders Chip component_
   - **Description**: Renders single selected item (below dropdown)

2. ## Dropdown

   ```ts
   import {
     FlatDropdown, // used as default dropdown for single mode
     ModalDropdown, // used as default dropdown for multiple mode
   } from "@telenko/react-native-paper-autocomplete";
   ```

   ### Dropdown props:

   ### inputValue

   - **Type**: string
   - **Required**: true
   - **Description**: Value for text input inside dropdown

   ### options

   - **Type**: any[]
   - **Required**: true
   - **Description**: options list

   ### renderOption

   - **Type**: ({ item: any, index: number }) => React.ReactElement
   - **Required**: false
   - **Default**: _uses Menu.Item component of react-native-paper_
   - **Description**: Renders single option

   ### renderHost

   - **Type**: (props: [TextInputProps](https://callstack.github.io/react-native-paper/text-input.html)) => React.ReactElement
   - **Required**: false
   - **Default**: _uses TextInput of react-native-paper_
   - **Description**: Renders main trigger element

   ### renderNoItems

   - **Type**: () => React.ReactElement
   - **Required**: false
   - **Default**: _uses internal layout_
   - **Description**: Renders when no items available in dropdown

   ### noItemsLabel

   - **Type**: string
   - **Required**: false (will be used only if _renderNoItems_ is not specified)
   - **Default**: "No items"
   - **Description**: Sets string value of noItems default widget

   ### onPress

   - **Type**: () => void
   - **Required**: false
   - **Default**: -
   - **Description**: Triggered when user presses on dropdown

   ### keyExtractor

   - **Type**: (item: any) => string
   - **Required**: false
   - **Default**: item => item.value
   - **Description**: Used to generate uniq key for each option

   ### openOnMount

   - **Type**: boolean
   - **Required**: false
   - **Default**: false
   - **Description**: Will open dropdown options after initial render

   ### [...Inherits all TextInput props](https://callstack.github.io/react-native-paper/text-input.html)

   All TextInput props will be applied to host and search inputs

   ## FlatDropdown specific props

   ### menuOffset

   - **Type**: number
   - **Required**: false
   - **Default**: 65
   - **Description**: Offset of menu from trigger (host) element

   ## ModalDropdown specific props

   ### renderSearchInput

   - **Type**: (props: [TextInputProps](https://callstack.github.io/react-native-paper/text-input.html)) => React.ReactElement
   - **Required**: false
   - **Default**: _uses TextInput of react-native-paper_
   - **Description**: Renders search input inside modal (by default looks same as trigger/host input)

# Showcase

1. Default modal mode

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

2. Flat mode

```tsx
<Autocomplete
  multiple
  renderDropdown={(props) => <FlatDropdown menuOffset={40} {...props} />}
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

3. Custom option

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

4. Custom option + flat mode + custom filter

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
    const includesIgnoreNoWhiteSpaceCase = (a: string, b: string): boolean => {
      const optionQuery = (a || "").replace(/\s/g, "").toUpperCase();
      const inputQuery = (b || "").replace(/\s/g, "").toUpperCase();
      return (
        optionQuery.includes(inputQuery) || inputQuery.includes(optionQuery)
      );
    };
    return options.filter((option) => {
      return (
        includesIgnoreNoWhiteSpaceCase(option.label, input) ||
        includesIgnoreNoWhiteSpaceCase(option.description, input)
      );
    });
  }}
  renderDropdown={(props) => <FlatDropdown menuOffset={40} {...props} />}
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

5. Custom search input for modal mode

```tsx
<Autocomplete
  multiple
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
```

![custom search](https://media.giphy.com/media/yv1v1PlCe78rPUWGsi/giphy.gif)

6. Custom chips

```tsx
<Autocomplete
  multiple
  renderSelectedItem={({ label, value, onDelete }) => (
    <Chip key={value} icon="folder" mode="outlined" onClose={onDelete}>
      {label}
    </Chip>
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

7. Validation

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

8. Single selection autocomplete

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

9. Custom host element

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

10. Plain Dropdown Component (Modal)

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

11. Plain Dropdown Component (Flat)

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

12. Writing Autocomplete which works in mixed mode (flat+modal)

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
      onChangeText={(v) => {
        setCurrentOpen(true);
        setModal(v.length > 0);
      }}
      {...props}
    />
  );
};
```

![mixed mode](https://media.giphy.com/media/U3rNdlAdLs8gfYa9qi/giphy.gif)
