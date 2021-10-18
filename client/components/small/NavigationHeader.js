import { Text, View, Pressable } from "react-native";
import styles from "../../styles/App.styles";
import React from "react";

function NavigationHeader({ goBack, title, Child = () => <View /> }) {
  return (
    <View style={styles.navigationHeader}>
      <Pressable
        style={styles.navigationHeaderBackButton}
        onPress={() => {
          goBack();
        }}
      >
        <Text style={styles.navigationHeaderArrow}>{"< "}</Text>
        <Text style={styles.textH2}>{title}</Text>
      </Pressable>
      {<Child />}
      <View style={[styles.separator, styles.separatorBlue]} />
    </View>
  );
}

export default NavigationHeader;
