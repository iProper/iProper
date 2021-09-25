import { Image, Text, View, Button } from "react-native";
import React from "react";
import styles from "../styles/App.styles";

export function AccountTypeScreen({navigation}) {
  return (
    <View>
      <Image style={styles.logo} />
      <View
        style={[styles.separator, styles.separatorRed, styles.separator60]}
      ></View>

      <View style={styles.chooseLoginScreenButtons}>
        <Button
          onPress={() => navigation.navigate("Login")}
          style={[styles.button, styles.buttonBig, styles.buttonOff]}
          title='Log In'
        />
        <View style={[styles.separator, styles.separatorVertical]}></View>
        <Button style={[styles.button, styles.buttonBig]} title='Sign Up' />
      </View>

      <View style={styles.separator}></View>

      <View style={styles.chooseAccountTypeArea}>
        <Text>Who are you?</Text>
        <View
          style={[styles.separator, styles.separatorRed, styles.separator60]}
        ></View>

        <View style={styles.chooseAccountTypeButtons}>
          <View style={styles.accountTypeChoice}>
            <Text>Owner</Text>
            <Button style={styles.chooseAccountTypeButton} title='O' />
          </View>

          <Text>or</Text>

          <View style={styles.accountTypeChoice}>
            <Text>Renter</Text>
            <Button style={styles.chooseAccountTypeButton} title='R' />
          </View>
        </View>

        <Button title='Create Account' />
      </View>
    </View>
  );
}

export function RegistrationFormScreen(props) {
  return;
}
