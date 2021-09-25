import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles/App.styles";
import { LoginScreen } from "./components/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen/>
      <StatusBar style="auto" />
    </View>
  );
}