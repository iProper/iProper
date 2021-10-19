import { Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { register } from "../../queries/queries";
import { useMutation } from "@apollo/client";
import * as DocumentPicker from "expo-document-picker";

import * as firebase from "firebase";

import NavigationHeader from "../small/NavigationHeader";

import styles from "../../styles/App.styles";
import regStyles from "../../styles/RegistrationScreens.styles";

export default function UploadOwnerDocumentsScreen({ route, navigation }) {
  const { title } = route.params;
  const { firstName, lastName, email, password, phoneNumber } = route.params;

  const [registerUser] = useMutation(register);

  const [uri, setUri] = useState("");
  const [filename, setFilename] = useState("");

  const uploadDocumentFromSystem = () => {
    DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "*/*",
    }).then(({ type, uri, name }) => {
      if (type === "cancel") return;

      setUri(uri);
      setFilename(name);
    });
  };

  const uploadDocumentToStorage = async () => {
    try {
      const fetchRes = await fetch(uri);
      const blob = await fetchRes.blob();

      firebase
        .storage()
        .ref()
        .child("documents/" + email + filename)
        .put(blob, {
          contentType: "confirmOwnerDocument",
        })
        .then((snapshot) => {
          blob.close();
          navigation.navigate("Login");
          console.log("File uploaded!");
        });
    } catch (err) {
      console.log("Error uploading file:" + err.message);
    }
  };

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
    }).then((result) => {
      uploadDocumentToStorage();
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <View style={[regStyles.uploadDocumentScreen, styles.container]}>
      <NavigationHeader goBack={navigation.goBack} title={title} />

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
        <Text style={styles.textH4}>{filename || "No files uploaded"}</Text>
      </View>

      <Pressable
        onPress={() => submitForm()}
        style={[styles.button, styles.buttonBig]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>
          Finish Registration
        </Text>
      </Pressable>
    </View>
  );
}
