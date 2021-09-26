import { Image, Text, View, Pressable, TextInput, Button } from "react-native";
import React, { useState } from "react";
import styles from "../styles/App.styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export function AccountTypeScreen({ navigation }) {
  const [isOwner, setIsOwner] = useState(false);

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
              onPress={() => setIsOwner(true)}
              style={[
                styles.chooseAccountTypeButton,
                isOwner && styles.chosenAccountTypeButton,
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
            <Pressable
              onPress={() => setIsOwner(false)}
              style={[
                styles.chooseAccountTypeButton,
                !isOwner && styles.chosenAccountTypeButton,
              ]}
            >
              <Image
                style={[styles.accountTypeIcon]}
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

export function RegistrationFormScreen({ route, navigation }) {
  const { isOwner, title } = route.params;

  const submitForm = () => {
    return;
  };

  const onPressNextStep = () => {
    if (isOwner) navigation.navigate("ConfirmPhoneNumber", { title });
    else submitForm();
  };

  return (
    <View style={styles.registerForm}>
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
        <TextInput style={styles.formInput} placeholder='First Name' />
        <Text style={styles.alarmText}>First name required</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>Last Name</Text>
        <TextInput style={styles.formInput} placeholder='Last Name' />
        <Text style={styles.alarmText}></Text>
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>Email</Text>
        <TextInput style={styles.formInput} placeholder='email@example.com' />
        <Text style={styles.alarmText}></Text>
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>Password</Text>
        <TextInput style={styles.formInput} placeholder='Password' />
        <Text style={styles.alarmText}></Text>
      </View>

      <View style={styles.formBox}>
        <Text style={[styles.textH3, styles.formLabel]}>Confirm Password</Text>
        <TextInput style={styles.formInput} placeholder='Confirm Password' />
        <Text style={styles.alarmText}></Text>
      </View>

      <Pressable
        onPress={() => onPressNextStep()}
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
  const [codeSent, setCodeSent] = useState(false);

  const SMSrequestCode = () => {
    return;
  };

  return (
    <View style={styles.confirmPhoneNumberScreen}>
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

      <View style={styles.registrationBox}>
        <Text style={styles.textH3}>Phone number</Text>
        <TextInput style={styles.formInput} placeholder='123-345-6789' />
      </View>

      <Pressable
        style={[styles.button, styles.requestBtn]}
        onPress={() => {
          SMSrequestCode();
        }}
      >
        <Text style={[styles.buttonText]}>Request SMS Code Again</Text>
      </Pressable>

      <View style={styles.formBox}>
        <Text style={styles.textH3}>Enter code</Text>
        <TextInput style={styles.formInput} placeholder='e.g. 123456' />
      </View>

      <Pressable
        onPress={() => {
          navigation.navigate("UploadOwnerDocuments", { title });
        }}
        style={[styles.button, styles.buttonBig, styles.confirmButton]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>Confirm</Text>
      </Pressable>
    </View>
  );
}

export function UploadOwnerDocumentsScreen({ route, navigation }) {
  const { title } = route.params;

  return (
    <View style={styles.uploadDocumentScreen}>
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
      <View style={styles.uploadDocumentsArea}>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Upload Documents</Text>
        </Pressable>
          <Text style={styles.textH4}>No files uploaded</Text>
      </View>

      <Pressable onPress={() => {}} style={[styles.button, styles.buttonBig]}>
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
        name='ChooseAccountType'
        component={AccountTypeScreen}
      />
      <RegistrationStack.Screen
        name='RegistrationForm'
        component={RegistrationFormScreen}
      />
      <RegistrationStack.Screen
        name='ConfirmPhoneNumber'
        component={ConfirmPhoneNumberScreen}
      />
      <RegistrationStack.Screen
        name='UploadOwnerDocuments'
        component={UploadOwnerDocumentsScreen}
      />
    </RegistrationStack.Navigator>
  );
}
