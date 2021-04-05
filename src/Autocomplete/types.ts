import React from "react";
import type { DropdownProps } from "../Dropdown";

type CommonAutocompleteProps = Omit<
  DropdownProps,
  "onChange" | "inputValue" | "renderOption"
> & {
  multiple?: boolean;
  renderHelper?: null | (() => React.ReactElement);
  renderDropdown?: (props: DropdownProps) => React.ReactElement;
  renderOption?: (props: OptionProps, item: any) => React.ReactElement;
  options: any[];
  filterOptions?: (options: any[], inputV: string) => any[];
  keyExtractor?: (o: any) => string;
  labelExtractor?: (o: any) => string;
};

export type MultiAutocompleteProps = CommonAutocompleteProps & {
  multiple: true;
  renderSelectedItem?: (
    props: SelectedItemProps,
    item: any
  ) => React.ReactElement;
  value?: string[];
  onChange: (v: string[]) => void;
};

export type SingleAutocompleteProps = CommonAutocompleteProps & {
  multiple?: false;
  value?: string;
  menuOffset?: number;
  onChange: (v: string) => void;
};

export type AutocompleteProps = MultiAutocompleteProps | SingleAutocompleteProps;

export type OptionProps = {
  selected: boolean;
  label: string;
  value: string;
  style: any;
  onSelect: () => void;
};

export type SelectedItemProps = {
  value: string;
  label: string;
  style: any;
  onDelete: () => void;
};