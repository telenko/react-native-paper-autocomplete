import React from "react";
import MultiAutocomplete from "./MultiAutocomplete";
import SingleAutocomplete from "./SingleAutocomplete";
import type { AutocompleteProps } from "./types";

/**
 * TODO list
 * 1) vvv renderHost story    e
 * 2) vvv renderSearch story    e
 * 3) vvv single mode      e
 * 4) vvv TextActionsInput styles for input?     e
 * 5) vvv render Chip story     e
 * 6) vvv ref story (down action) + input ref props working???       m
 * 7) test with allergy_ui     m
 * 8) vvv inputactions bug + story   m
 */

const Autocomplete: React.FC<AutocompleteProps> = (props) =>
  props.multiple === true ? (
    <MultiAutocomplete {...props} />
  ) : (
    <SingleAutocomplete {...props} />
  );

export default Autocomplete;
