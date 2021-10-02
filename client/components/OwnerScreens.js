import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/App.styles";
import ownerStyles from "../styles/OwnerScreens.styles";

export function OwnerDashboard() {
  return (
    <View style={[styles.container, ownerStyles.ownerDashboard]}>
      <Text style={styles.textH1}>Owner Dashboard</Text>
    </View>
  );
}

export function AddProperty() {
  return (
    <View style={[styles.container, ownerStyles.addPropertyScreen]}>
      <Text style={styles.textH1}>Property Form</Text>
    </View>
  );
}