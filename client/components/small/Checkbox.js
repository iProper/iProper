import React from "react";
import { Pressable, View, Image } from "react-native";

import styles from "../../styles/App.styles";

export default function Checkbox({ checked, setChecked, checkboxStyles = {} }) {
  return (
    <Pressable
      onPress={() => setChecked(!checked)}
      style={[
        styles.checkbox,
        checkboxStyles,
        checked ? styles.checkboxChecked : {},
      ]}
    >
      {checked ? (
        <Image
          source={require("../../assets/tick.png")}
          style={{height: 20}}
          resizeMode={"contain"}
        />
      ) : <View/>}
    </Pressable>
  );
}
