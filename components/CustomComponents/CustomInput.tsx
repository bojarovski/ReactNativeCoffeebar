import React from "react";
import { TextInput } from "react-native-paper";

interface Props {
  label: string;
  text: string;
  onChangeText: (text: string) => void;
}

const CustomInput: React.FC<Props> = ({ label, text, onChangeText }) => {
  return (
    <TextInput
      mode="outlined"
      style={{ margin: 8 }}
      label={label}
      value={text}
      onChangeText={onChangeText}
    />
  );
};

export default CustomInput;
