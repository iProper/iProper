import { View, Image, Pressable, Text } from "react-native";
import loginStyles from "../../styles/LoginScreen.styles";
import React, { useState } from "react";

// Styles
import styles from "../../styles/App.styles";
import regStyles from "../../styles/RegistrationScreens.styles";

export default function AccountTypeScreen({ navigation }) {
  const [isOwner, setIsOwner] = useState(false);

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
          onPress={() => navigation.navigate("Login")}
          style={[
            styles.button,
            styles.buttonBig,
            styles.buttonOff,
            loginStyles.chooseLoginScreenButton,
          ]}
        >
          <Text style={[styles.buttonOffText, styles.buttonTextBig]}>Log In</Text>
        </Pressable>
        <View style={[styles.separator, styles.separatorVertical]}></View>

        <Pressable
          onPress={() => navigation.navigate("Registration")}
          style={[
            styles.button,
            styles.buttonBig,
            loginStyles.chooseLoginScreenButton,
          ]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.separator}></View>

      <View style={regStyles.chooseAccountTypeArea}>
        <Text style={styles.textH1}>Who are you?</Text>
        <View
          style={[styles.separator, styles.separatorRed, styles.separator60]}
        ></View>

        <View style={regStyles.chooseAccountTypeButtons}>
          <View style={regStyles.accountTypeChoice}>
            <Text style={styles.textH2}>Owner</Text>
            <Pressable
              onPress={() => setIsOwner(true)}
              style={[
                regStyles.chooseAccountTypeButton,
                isOwner && regStyles.chosenAccountTypeButton,
              ]}
            >
              <Image
                style={[regStyles.accountTypeIcon, regStyles.accountTypeIconOwner]}
                source={require("../../assets/owner.png")}
                resizeMode={"center"}
              />
            </Pressable>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.textH3}>or</Text>
          </View>

          <View style={regStyles.accountTypeChoice}>
            <Text style={styles.textH2}>Renter</Text>
            <Pressable
              onPress={() => setIsOwner(false)}
              style={[
                regStyles.chooseAccountTypeButton,
                !isOwner && regStyles.chosenAccountTypeButton,
              ]}
            >
              <Image
                style={[regStyles.accountTypeIcon]}
                source={require("../../assets/user.png")}
                resizeMode={"center"}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate("Registration Form", {
              isOwner,
              title: isOwner ? "Owner Registration" : "Renter Registration",
            });
          }}
          style={[regStyles.createAccountButton, styles.button, styles.buttonBig]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
