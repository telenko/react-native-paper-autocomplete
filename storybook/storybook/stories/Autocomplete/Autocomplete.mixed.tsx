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

export default AutocompleteMixed;
