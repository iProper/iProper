import { Image, Text, View, Pressable, Button, TextInput } from "react-native";
import styles from "../styles/App.styles";
import React from "react";

export function LoginScreen({ navigation }) {
  return (
    <View style={(styles.loginScreen, styles.container)}>
      <View style={[styles.loginScreenHeader, styles.container]}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
          resizeMode={"center"}
        />
        <View
          style={[styles.separator, styles.separatorRed, styles.separator60]}
        ></View>
      </View>

      <View style={styles.chooseLoginScreenButtons}>
        <Pressable
          style={[styles.button, styles.buttonBig, styles.chooseLoginScreenButton]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Log In</Text>
        </Pressable>
        <View style={[styles.separator, styles.separatorVertical]}></View>

        <Pressable
          onPress={() => navigation.navigate("Registration")}
          style={[
            styles.button,
            styles.buttonBig,
            styles.buttonOff,
            styles.chooseLoginScreenButton,
          ]}
        >
          <Text style={[styles.buttonOffText, styles.buttonTextBig]}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.loginFormArea}>
        <View style={styles.buttons3rdPartyLogin}>
          <Pressable style={styles.button3rdPartyLogin}><Text style={styles.button3rdPartyLoginText}>Sign in with Google</Text></Pressable>
          <Pressable style={styles.button3rdPartyLogin}><Text style={styles.button3rdPartyLoginText}>Sign in with Facebook</Text></Pressable>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.loginForm}>
          <TextInput style={styles.formInput} placeholder={"email@example.com"} />
          <TextInput style={styles.formInput} placeholder={"Password"} />
        </View>
        
        <View style={styles.forgotPassword}>
          <Text style={styles.lightText}>Forgot password?</Text>
        </View>

        <Pressable
          style={[styles.button, styles.buttonBig, styles.loginButton]}
          onPress={() => {}}
          title='Log In'
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Log In</Text>
        </Pressable>
        <Text style={styles.formSubmissionError}>Incorrect Login</Text>
      </View>
    </View>
  );
}
