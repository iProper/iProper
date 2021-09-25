import { Image, Text, View, Button, TextInput } from "react-native";
import styles from "../styles/App.styles";
import React from "react";

export function LoginScreen(props) {
  return (
    <View>
      <Image style={styles.logo} />
      <View style={[styles.separator, styles.separatorRed, styles.separator60]}></View>

      <View style={styles.chooseLoginScreenButtons}>
        <Button style={[styles.button, styles.buttonBig]}>Log In</Button>
        <View style={[styles.separator, styles.separatorVertical]}></View>
        <Button style={[styles.button, styles.buttonBig, styles.buttonOff]}>
          Sign Up
        </Button>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.loginFormArea}>
        <Button>Sign in with Google</Button>
        <Button>Sign in with Facebook</Button>
        <View style={styles.separator}></View>
        
        <TextInput style={styles.formInput} placeholder={"email@example.com"} />
        <TextInput style={styles.formInput} placeholder={"Password"} />
        
        <Text>Forgot password?</Text>

        <Button style={[styles.button, styles.buttonBig]} onPress={() => {}}>
          Log In
        </Button>
      </View>
    </View>
  );
}
