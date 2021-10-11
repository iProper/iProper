import { Text, View, Pressable, Platform, TextInput } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { register } from "../../queries/queries";

import styles from "../../styles/App.styles";
import regStyles from "../../styles/RegistrationScreens.styles";

export default function RegistrationFormScreen({ route, navigation }) {
  const { isOwner, title } = route.params;

  const [firstName, changeFirstName] = useState("");
  const [lastName, changeLastName] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [confirmPassword, changeConfirmPassword] = useState("");

  const [registerUser] = useMutation(register);

  const [firstNameMsg, setFirstNameMsg] = useState("");
  const [lastNameMsg, setLastNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");

  const checkForm = () => {
    let passed = 0;
    // First name checks
    if (!firstName) {
      setFirstNameMsg("First name required.");
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setFirstNameMsg("First name should only have letters.");
    } else if (!/^[A-Za-z]{2,50}$/.test(firstName)) {
      setFirstNameMsg("First name should be from 2 to 50 letters long.");
    } else {
      setFirstNameMsg("");
      passed++;
    }

    // Last name checks
    if (!lastName) {
      setLastNameMsg("Last name required.");
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setLastNameMsg("Last name should only have letters.");
    } else if (!/^[A-Za-z]{2,50}$/.test(lastName)) {
      setLastNameMsg("Last name should be from 2 to 50 letters long.");
    } else {
      setLastNameMsg("");
      passed++;
    }

    // Email checks
    if (passed && !email) {
      setEmailMsg("Email required.");
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setEmailMsg("Invalid email format.");
    } else {
      setEmailMsg("");
      passed++;
    }

    // password checks
    if (passed && !password) {
      setPasswordMsg("Password required");
    } else if (!/^.{8,64}$/.test(password)) {
      setPasswordMsg("Password should be from 8 to 64 characters");
    } else if (!/^[A-Za-z\d][\w!@#$%^&*()+\-=,.;:'"<>\?/\\]{7,64}$/.test(password)) {
      setPasswordMsg(`Password should only have A-Za-z0-9_!@#$%^&*()+-=,.;:'"<>\?/`);
    } else {
      setPasswordMsg("");
      passed++;
    }

    // confirm password checks
    if (passed && !confirmPassword) {
      setConfirmPasswordMsg("Please confirm the password.");
    } else if (confirmPassword !== password) {
      setConfirmPasswordMsg("Passwords should match.");
    } else {
      setConfirmPasswordMsg("");
      passed++;
    }

    return passed == 5;
  };

  const submitForm = () => {
    if (!checkForm()) return;

    if (isOwner) {
      navigation.navigate("Confirm Phone Number", {
        title,
        firstName,
        lastName,
        email,
        password,
      });
    } else {
      registerUser({
        variables: {
          firstName,
          lastName,
          email,
          password,
          isOwner,
        },
      }).then((result) => navigation.navigate("Login"));
    }
  };

  return (
    <View style={[regStyles.registerForm, styles.container]}>
      <View style={styles.navigationHeaderArea}>
        <View style={styles.navigationHeader}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.navigationHeaderArrow}>{"< "}</Text>
          </Pressable>
          <Text style={styles.navigationHeaderText}>{title}</Text>
        </View>
        <View style={[styles.separator, styles.separatorBlue]} />
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>First Name</Text>
        <TextInput
          onChangeText={changeFirstName}
          style={styles.formInput}
          placeholder='First Name'
          value={firstName}
          textContentType={Platform.OS == "ios" ? "givenName" : "none"}
        />
        <Text style={styles.alarmText}>{firstNameMsg}</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>Last Name</Text>
        <TextInput
          onChangeText={changeLastName}
          style={styles.formInput}
          placeholder='Last Name'
          textContentType={Platform.OS == "ios" ? "familyName" : "none"}
          value={lastName}
        />
        <Text style={styles.alarmText}>{lastNameMsg}</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>Email</Text>
        <TextInput
          onChangeText={changeEmail}
          style={styles.formInput}
          placeholder='email@example.com'
          autoCompleteType='email'
          value={email}
          textContentType={Platform.OS == "ios" ? "email" : "none"}
        />
        <Text style={styles.alarmText}>{emailMsg}</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>Password</Text>
        <TextInput
          onChangeText={changePassword}
          style={styles.formInput}
          placeholder='Password'
          secureTextEntry={true}
          value={password}
          textContentType={Platform.OS == "ios" ? "newPassword" : "none"}
        />
        <Text style={styles.alarmText}>{passwordMsg}</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>Confirm Password</Text>
        <TextInput
          onChangeText={changeConfirmPassword}
          style={styles.formInput}
          placeholder='Confirm Password'
          secureTextEntry={true}
          value={confirmPassword}
          textContentType={Platform.OS == "ios" ? "newPassword" : "none"}
        />
        <Text style={styles.alarmText}>{confirmPasswordMsg}</Text>
      </View>

      <Pressable
        onPress={() => submitForm()}
        style={[styles.button, styles.buttonBig, styles.nextStepBtn]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>
          {isOwner ? "Next Step" : "Create Account"}
        </Text>
      </Pressable>
    </View>
  );
}
