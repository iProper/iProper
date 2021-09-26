import { Image, Text, View, Pressable, Button } from "react-native";
import React from "react";
import styles from "../styles/App.styles";

export function AccountTypeScreen({ navigation }) {
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
          onPress={() => navigation.navigate("Login")}
          style={[
            styles.button,
            styles.buttonBig,
            styles.buttonOff,
            styles.chooseLoginScreenButton,
          ]}
        >
          <Text style={[styles.buttonOffText, styles.buttonTextBig]}>Log In</Text>
        </Pressable>
        <View style={[styles.separator, styles.separatorVertical]}></View>

        <Pressable
          onPress={() => navigation.navigate("Registration")}
          style={[styles.button, styles.buttonBig, styles.chooseLoginScreenButton]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.chooseAccountTypeArea}>
        <Text style={styles.textH1}>Who are you?</Text>
        <View
          style={[styles.separator, styles.separatorRed, styles.separator60]}
        ></View>

        <View style={styles.chooseAccountTypeButtons}>
          <View style={styles.accountTypeChoice}>
            <Text style={styles.textH2}>Owner</Text>
            <Pressable
              style={[
                styles.chooseAccountTypeButton,
                styles.chosenAccountTypeButton,
              ]}
            >
              <Image
                style={[styles.accountTypeIcon, styles.accountTypeIconOwner]}
                source={require("../assets/owner.png")}
                resizeMode={"center"}
              />
            </Pressable>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.textH3}>or</Text>
          </View>

          <View style={styles.accountTypeChoice}>
            <Text style={styles.textH2}>Renter</Text>
            <Pressable style={styles.chooseAccountTypeButton}>
              <Image
                style={[styles.accountTypeIcon]}
                source={require("../assets/user.png")}
                resizeMode={"center"}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() => {}}
          style={[styles.createAccountButton, styles.button, styles.buttonBig]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export function RegistrationFormScreen(props) {
  return (
    <SafeAreaView>
      <View style={styles.separator} />
      <Text style={styles.headerText}>First Name</Text>
      <View style={styles.registrationBox}>
        <TextInput style={styles.input} placeholder='First Name' />
      </View>
      <Text style={styles.red}>First name required</Text>
      <Text style={styles.headerText}>Last Name</Text>
      <View style={styles.registrationBox}>
        <TextInput style={styles.input} placeholder='Last Name' />
      </View>
      <Text style={styles.headerText}>Email</Text>
      <View style={styles.registrationBox}>
        <TextInput style={styles.input} placeholder='email@example.com' />
      </View>
      <Text style={styles.headerText}>Password</Text>
      <View style={styles.registrationBox}>
        <TextInput style={styles.input} placeholder='Password' />
      </View>
      <Text style={styles.headerText}>Confirm Password</Text>
      <View style={styles.registrationBox}>
        <TextInput style={styles.input} placeholder='Conform Password' />
      </View>
      <Pressable
        onPress={}
        style={styles.nextStepBtn}
      >
        <Text style={styles.nextStepText}>{title}</Text>
      </Pressable>

      <StatusBar style='auto' />
    </SafeAreaView>
  );
}
