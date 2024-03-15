import * as React from "react";
import { KeyboardTypeOptions } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  label: string;
  text?: string;
  onChangeText: (text: string) => void;
  type: KeyboardTypeOptions; // Define type as either "number" or "text"
}

const CustomInput: React.FC<Props> = ({ label, text, onChangeText, type }) => {
  return (
    <TextInput
      left={<TextInput.Icon icon="cup" />}
      mode="outlined"
      dense
      style={{ margin: 8 }}
      label={label}
      value={text}
      onChangeText={onChangeText}
      keyboardType={type} // Set keyboardType based on the type prop
    />
  );
};

export default CustomInput;
