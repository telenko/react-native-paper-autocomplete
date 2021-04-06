import React from "react";
import MultiAutocomplete from "./MultiAutocomplete";
import SingleAutocomplete from "./SingleAutocomplete";
import type { AutocompleteProps } from "./types";

const Autocomplete: React.FC<AutocompleteProps> = (props) =>
  props.multiple === true ? (
    <MultiAutocomplete {...props} multiple />
  ) : (
    <SingleAutocomplete {...props} multiple={false} />
  );

export default Autocomplete;
