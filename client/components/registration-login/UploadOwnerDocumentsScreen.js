import { Text, View, Pressable } from "react-native";
import React from "react";
import { register } from "../../queries/queries";
import { useMutation } from "@apollo/client";
import * as DocumentPicker from "expo-document-picker";

import * as firebase from 'firebase';

import NavigationHeader from "../small/NavigationHeader";

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

  const uploadDocumentFromSystem = () => {
    DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "*/*",
    }).then(async ({ type, uri, name }) => {
      console.log(name);
      if (type === "cancel")
        return;
      
      try {
        const fetchRes = await fetch(uri);
        const blob = await fetchRes.blob();

        firebase
          .storage()
          .ref()
          .child("documents/" + name).put(blob, {
            contentType: type
          }).then((snapshot) => {
            blob.close();
            console.log("File uploaded!")
          });

      } catch (err) {
        console.log("Error uploading file:" + err.message);
      }
    });
  };

  return (
    <View style={[regStyles.uploadDocumentScreen, styles.container]}>
      <NavigationHeader goBack={navigation.goBack} title={title}/>

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
        <Pressable onPress={uploadDocumentFromSystem} style={styles.button}>
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
