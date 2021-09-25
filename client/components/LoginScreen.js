import { Image, Text, View, Button, TextInput } from "react-native";
import styles from "../styles/App.styles";
import React from "react";

export function LoginScreen({ navigation }) {
  return (
    <View>
      <Image style={styles.logo} />
      <View
        style={[styles.separator, styles.separatorRed, styles.separator60]}
      ></View>

      <View style={styles.chooseLoginScreenButtons}>
        <Button style={[styles.button, styles.buttonBig]} title='Log In' />
        <View style={[styles.separator, styles.separatorVertical]}></View>
        <Button
          onPress={() => navigation.navigate("Registration")}
          style={[styles.button, styles.buttonBig, styles.buttonOff]}
          title='Sign Up'
        />
      </View>

      <View style={styles.separator}></View>

      <View style={styles.loginFormArea}>
        <Button title='Sign in with Google' />
        <Button title='Sign in with Facebook' />
        <View style={styles.separator}></View>

        <TextInput style={styles.formInput} placeholder={"email@example.com"} />
        <TextInput style={styles.formInput} placeholder={"Password"} />

        <Text>Forgot password?</Text>

        <Button
          style={[styles.button, styles.buttonBig]}
          onPress={() => {}}
          title='Log In'
        />
      </View>
    </View>
  );
}
