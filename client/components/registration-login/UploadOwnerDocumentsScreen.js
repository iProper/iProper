import { Text, View, Pressable } from "react-native";
import React from "react";
import { register } from "../../queries/queries";
import { useMutation } from "@apollo/client";

import styles from "../../styles/App.styles";
import regStyles from "../../styles/RegistrationScreens.styles";

export default function UploadOwnerDocumentsScreen({ route, navigation }) {
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
