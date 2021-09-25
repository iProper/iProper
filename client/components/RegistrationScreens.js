import { Image, Text, View, Button } from "react-native";
import React from "react";
import styles from "../styles/App.styles";

export function AccountTypeScreen(props) {
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

      <View style={styles.chooseAccountTypeArea}>
        <Text>Who are you?</Text>
        <View style={[styles.separator, styles.separatorRed, styles.separator60]}></View>

        <View style={styles.chooseAccountTypeButtons}>
          <View style={styles.accountTypeChoice}>
            <Text>Owner</Text>
            <Button style={styles.chooseAccountTypeButton}>O</Button>
          </View>

          <Text>or</Text>

          <View style={styles.accountTypeChoice}>
            <Text>Renter</Text>
            <Button style={styles.chooseAccountTypeButton}>R</Button>
          </View>
        </View>

        <Button>Create Account</Button>
      </View>
    </View>
  );
}

export function RegistrationFormScreen(props) {
  return;
}
