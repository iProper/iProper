import { Image, Text, View, Pressable, TextInput } from "react-native";
import styles from "../../styles/App.styles";
import loginStyles from "../../styles/LoginScreen.styles";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { login } from "../../queries/queries";

export default function LoginScreen({ setJwtToken, navigation }) {
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
      .then(async ({ data }) => {
        setJwtToken(data.login);
      })
      .catch(() => {
        setDisplayMsg(true);
      });
  };

  return (
    <View style={(loginStyles.loginScreen, styles.container)}>
      <View style={[loginStyles.loginScreenHeader, styles.container]}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo.png")}
          resizeMode={"center"}
        />
        <View
          style={[styles.separator, styles.separatorRed, styles.separator60]}
        ></View>
      </View>

      <View style={loginStyles.chooseLoginScreenButtons}>
        <Pressable
          style={[
            styles.button,
            styles.buttonBig,
            loginStyles.chooseLoginScreenButton,
          ]}
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
            loginStyles.chooseLoginScreenButton,
          ]}
        >
          <Text style={[styles.buttonOffText, styles.buttonTextBig]}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.separator}></View>

      <View style={loginStyles.loginFormArea}>
        <View style={loginStyles.buttons3rdPartyLogin}>
          <Pressable style={[loginStyles.button3rdPartyLogin, {justifyContent: "flex-start"}]}>
            <Image
              style={[styles.iconS, {marginHorizontal: 35}]}
              source={require("../../assets/google-icon.png")}
            />
            <Text style={loginStyles.button3rdPartyLoginText}>
              Sign in with Google
            </Text>
          </Pressable>
          <Pressable style={[loginStyles.button3rdPartyLogin, {backgroundColor: "#45619D", justifyContent: "flex-start"}]}>
            <Image
              style={[styles.iconS, {marginHorizontal: 35}]}
              source={require("../../assets/facebook-icon.png")}
            />
            <Text style={[loginStyles.button3rdPartyLoginText, {color: "#fff"}]}>
              Sign in with Facebook
            </Text>
          </Pressable>
        </View>

        <View style={styles.separator}></View>

        <View style={loginStyles.loginForm}>
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

        <View style={loginStyles.forgotPassword}>
          <Text style={styles.lightText}>Forgot password?</Text>
        </View>

        <Pressable
          style={[styles.button, styles.buttonBig, loginStyles.loginButton]}
          onPress={() => submitLogin()}
          title='Log In'
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Log In</Text>
        </Pressable>

        <View style={{ paddingVertical: 5 }}>
          <Text style={[styles.alarmText, styles.textH4]}>
            {displayMsg && "Incorrect email or password!"}
          </Text>
        </View>
      </View>
    </View>
  );
}
