import {
  Image,
  Text,
  View,
  Pressable,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { register, requestSms } from "../queries/queries";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";

import styles from "../styles/App.styles";
import loginStyles from "../styles/LoginScreen.styles";
import regStyles from "../styles/RegistrationScreens.styles";

export function AccountTypeScreen({ navigation }) {
  const [isOwner, setIsOwner] = useState(false);

  return (
    <View style={(loginStyles.loginScreen, styles.container)}>
      <View style={[loginStyles.loginScreenHeader, styles.container]}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
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
          <Text style={[styles.buttonOffText, styles.buttonTextBig]}>
            Log In
          </Text>
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
                style={[
                  regStyles.accountTypeIcon,
                  regStyles.accountTypeIconOwner,
                ]}
                source={require("../assets/owner.png")}
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
                source={require("../assets/user.png")}
                resizeMode={"center"}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate("RegistrationForm", {
              isOwner,
              title: isOwner ? "Owner Registration" : "Renter Registration",
            });
          }}
          style={[
            regStyles.createAccountButton,
            styles.button,
            styles.buttonBig,
          ]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export function RegistrationFormScreen({ route, navigation }) {
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
    } else if (
      !/^[A-Za-z\d][\w!@#$%^&*()+\-=,.;:'"<>\?/\\]{7,64}$/.test(password)
    ) {
      setPasswordMsg(
        `Password should only have A-Za-z0-9_!@#$%^&*()+-=,.;:'"<>\?/`
      );
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
      navigation.navigate("ConfirmPhoneNumber", {
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
          placeholder="First Name"
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
          placeholder="Last Name"
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
          placeholder="email@example.com"
          autoCompleteType="email"
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
          placeholder="Password"
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
          placeholder="Confirm Password"
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

export function ConfirmPhoneNumberScreen({ route, navigation }) {
  const { title } = route.params;
  const { firstName, lastName, email, password } = route.params;
  const [phoneNumber, changePhoneNumber] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [phoneMsg, setPhoneMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [PIN, setPIN] = useState(0);  
  const [code, changeCode] = useState("");

  const [sendSMS] = useMutation(requestSms);

  const SMSrequestCode = () => {
    if (phoneNumber) {
      setCodeSent(true);
      setPhoneMsg("");
      setLoading(true);
      sendSMS({
        variables: {
          phoneNumber,
        },
      })
        .then(({ data }) => {
          setPIN(data.requestSMS);
          setLoading(false);
        })
        .catch((error) => {
          setCodeSent(false);
          setLoading(false);
          setPhoneMsg("Please enter valid phone number.");
        });
    } else {
      setPhoneMsg("Please enter valid phone number.");
    }
  };

  const checkCode = () => {
    if (code == PIN) {
      setCodeSent(false);
      setPhoneMsg("");
      navigation.navigate("UploadOwnerDocuments", {
        title,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
    } else {
      setPhoneMsg("Invalid confirmation code.");
    }
  };

  return (
    <View style={[regStyles.confirmPhoneNumberScreen, styles.container]}>
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
        <Text style={styles.textH3}>Phone number</Text>
        <TextInput
          onChangeText={changePhoneNumber}
          style={styles.formInput}
          placeholder="123-345-6789"
          value={phoneNumber}
        />
      </View>

      <Pressable
        style={[styles.button, regStyles.requestBtn]}
        onPress={() => {
          SMSrequestCode();
        }}
      >
        <Text style={[styles.buttonText]}>
          {codeSent ? "Request SMS Code Again" : "Request SMS Code"}
        </Text>
      </Pressable>

      {codeSent && (
        loading ? (
      <Loading text={"Sending sms..."} />
    ) : (
      <View>
        <View style={styles.formBox}>
          <Text style={styles.textH3}>Enter code</Text>
          <TextInput
            value={code}
            onChangeText={changeCode}
            style={styles.formInput}
            placeholder='e.g. 123456'
          />
        </View>

        <Pressable
          onPress={() => checkCode()}
          style={[styles.button, styles.buttonBig, regStyles.confirmButton]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Confirm</Text>
        </Pressable>
      </View>
    )
      )}

      <View style={[styles.container, styles.containerAlignCenterTop]}>
        <Text style={[styles.alarmText, styles.textH4]}>{phoneMsg}</Text>
      </View>
    </View>
  );
}

export function UploadOwnerDocumentsScreen({ route, navigation }) {
  const { title } = route.params;
  const { firstName, lastName, email, password, phoneNumber } = route.params;

  const [registerUser] = useMutation(register);

  const submitForm = () => {
    registerUser({
      variables: {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        isOwner: true,
      },
    }).then((result) => navigation.navigate("Login"));
  };

  return (
    <View style={[regStyles.uploadDocumentScreen, styles.container]}>
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

      <Text style={styles.textH2}>
        Please, provide evidences of rental property ownership.
      </Text>
      <Text
        style={styles.lightText}
        onPress={() =>
          Linking.openURL(
            "https://www.ontario.ca/page/register-land-documents-electronically"
          )
        }
      >
        Check viable proof of ownership.
      </Text>
      <View style={regStyles.uploadDocumentsArea}>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Upload Documents</Text>
        </Pressable>
        <Text style={styles.textH4}>No files uploaded</Text>
      </View>

      <Pressable
        onPress={() => submitForm()}
        style={[styles.button, styles.buttonBig]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>
          Finish Registration
        </Text>
      </Pressable>

      <Text></Text>
    </View>
  );
}

const RegistrationStack = createNativeStackNavigator();

export function RegistrationScreens({ navigation }) {
  return (
    <RegistrationStack.Navigator
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <RegistrationStack.Screen
        name="ChooseAccountType"
        component={AccountTypeScreen}
      />
      <RegistrationStack.Screen
        name="RegistrationForm"
        component={RegistrationFormScreen}
      />
      <RegistrationStack.Screen
        name="ConfirmPhoneNumber"
        component={ConfirmPhoneNumberScreen}
      />
      <RegistrationStack.Screen
        name="UploadOwnerDocuments"
        component={UploadOwnerDocumentsScreen}
      />
    </RegistrationStack.Navigator>
  );
}
