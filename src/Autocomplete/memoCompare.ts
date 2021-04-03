
import { areArraysShallowEqual, areObjectsShallowEqual } from "../utils/arrays";
import { AutocompleteProps, MultiAutocompleteProps } from "./types";

const compare = (
    { value: prevValue, options: prevOptions, ...prevProps }: MultiAutocompleteProps,
    { value: nextValue, options: nextOptions, ...nextProps }: MultiAutocompleteProps
  ): boolean => {
    const areOptionsEqual = areArraysShallowEqual(prevOptions, nextOptions);
    if (!areOptionsEqual) {
      return false;
    }
    const areValueEqual = areArraysShallowEqual(
      prevValue || [],
      nextValue || []
    );
    if (!areValueEqual) {
      return false;
    }
    return areObjectsShallowEqual(prevProps, nextProps);
  }

export default compare;