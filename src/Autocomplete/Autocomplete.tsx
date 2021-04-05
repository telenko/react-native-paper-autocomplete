import React from "react";
import MultiAutocomplete from "./MultiAutocomplete";
import SingleAutocomplete from "./SingleAutocomplete";
import type { AutocompleteProps } from "./types";

const Autocomplete: React.FC<AutocompleteProps> = (props) =>
  props.multiple === true ? (
    <MultiAutocomplete multiple {...props} />
  ) : (
    <SingleAutocomplete multiple={false} {...props} />
  );

export default Autocomplete;
