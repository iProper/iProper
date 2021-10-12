import { Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { requestSms } from "../../queries/queries";
import { useMutation } from "@apollo/client";
import Loading from "../small/Loading";

import styles from "../../styles/App.styles";
import regStyles from "../../styles/RegistrationScreens.styles";

import { register } from "../../queries/queries";

import NavigationHeader from "../small/NavigationHeader";


export default function ConfirmPhoneNumberScreen({ route, navigation }) {
  const { title } = route.params;
  const { firstName, lastName, email, password, isOwner } = route.params;
  const [phoneNumber, changePhoneNumber] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [phoneMsg, setPhoneMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [PIN, setPIN] = useState(0);
  const [code, changeCode] = useState("");

  const [sendSMS] = useMutation(requestSms);
  const [registerUser] = useMutation(register);

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
      if (isOwner) {
        navigation.navigate("Upload Documents", {
          title,
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        });
      } else {
        registerUser({
          variables: {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            isOwner: false,
          }
        }).then(() => {
          navigation.navigate("Login");
        })
      }
    } else {
      setPhoneMsg("Invalid confirmation code.");
    }
  };

  return (
    <View style={[regStyles.confirmPhoneNumberScreen, styles.container]}>
      <NavigationHeader goBack={navigation.goBack} title={title}/>

      <View style={styles.formBox}>
        <Text style={styles.textH3}>Phone number</Text>
        <TextInput
          onChangeText={changePhoneNumber}
          style={styles.formInput}
          placeholder='123-345-6789'
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

      {codeSent &&
        (loading ? (
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
        ))}

      <View style={[styles.container, styles.containerAlignCenterTop]}>
        <Text style={[styles.alarmText, styles.textH4]}>{phoneMsg}</Text>
      </View>
    </View>
  );
}
