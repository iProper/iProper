import { Image, Text, View, Pressable, Button, TextInput } from "react-native";
import styles from "../styles/App.styles";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { login } from "../queries/queries";

export function LoginScreen({ setLoggedIn, navigation }) {
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  const [loginUser] = useMutation(login);

  const [displayMsg, setDisplayMsg] = useState(false);

  const submitLogin = () => {
    loginUser({
      variables: {
        email,
        password,
      },
    })
      .then((res) => {
        setLoggedIn(true);
      })
      .catch(() => {
        setDisplayMsg(true);
      });
  };

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
          <Pressable style={styles.button3rdPartyLogin}>
            <Text style={styles.button3rdPartyLoginText}>Sign in with Google</Text>
          </Pressable>
          <Pressable style={styles.button3rdPartyLogin}>
            <Text style={styles.button3rdPartyLoginText}>Sign in with Facebook</Text>
          </Pressable>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.loginForm}>
          <TextInput
            style={styles.formInput}
            placeholder={"email@example.com"}
            autoCompleteType={"email"}
            onChangeText={changeEmail}
          />
          <TextInput
            style={styles.formInput}
            placeholder={"Password"}
            autoCompleteType={"password"}
            secureTextEntry={true}
            onChangeText={changePassword}
          />
        </View>

        <View style={styles.forgotPassword}>
          <Text style={styles.lightText}>Forgot password?</Text>
        </View>

        <Pressable
          style={[styles.button, styles.buttonBig, styles.loginButton]}
          onPress={() => submitLogin()}
          title='Log In'
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Log In</Text>
        </Pressable>
        <Text style={styles.alarmText}>
          {displayMsg && "Incorrect email or password!"}
        </Text>
      </View>
    </View>
  );
}
