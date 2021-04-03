import {
  areArraysShallowEqual,
  areObjectsShallowEqual,
} from "../utils/arrays";
import { DropdownProps } from "./types";

const memoCheck = (
  { options: prevOptions, ...prevProps }: DropdownProps,
  { options: nextOptions, ...nextProps }: DropdownProps
): boolean => {
  const areOptionsEqual = areArraysShallowEqual(prevOptions, nextOptions);
  if (!areOptionsEqual) {
    return false;
  }
  return areObjectsShallowEqual(prevProps, nextProps);
};

export default memoCheck;
