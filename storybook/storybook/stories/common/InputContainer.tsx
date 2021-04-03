import React, { useState } from "react";

const InputContainer: React.FC<{
  defaultValue?: any,
  renderInput: (
    val: any,
    onChange: (i: any) => void
  ) => React.ReactElement;
}> = ({ renderInput, defaultValue = '' }) => {
  const [input, setInput] = useState(defaultValue);
  return renderInput(input, setInput);
};

export default InputContainer;
