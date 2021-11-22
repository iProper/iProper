import React, { useState, useRef } from "react";
import { Pressable, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles/App.styles";

export function FormPicker({ pickerValues, selected, setSelected, pickerStyles = {}}) {
  const pickerRef = useRef(null);

  return (
    <Pressable
      onPress={() => {
        pickerRef.current.focus();
      }}
      style={[styles.picker, pickerStyles]}
    >
      <Text style={[styles.pickerValue]}>{selected.label}</Text>
      <Picker
        ref={pickerRef}
        selectedValue={selected}
        onValueChange={(itemValue) => {
          setSelected(itemValue);
        }}
      >
        {pickerValues.map((value, index) => (
          <Picker.Item value={value} label={value.label} key={index} />
        ))}
      </Picker>
    </Pressable>
  );
}