import { Text, View, Pressable, TextInput, Linking, ScrollView } from "react-native";
import React, { useState, useRef } from "react";
import styles from "../../styles/App.styles";
import { useMutation } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import { addProperty } from "../../queries/queries";
import * as DocumentPicker from "expo-document-picker";

import * as firebase from "firebase";

import Rule from "../small/Rule";
import NavigationHeader from "../small/NavigationHeader";

import ownerStyles from "../../styles/OwnerScreens.styles";

function AddProperty({ route, navigation }) {
  const { jwtToken } = route.params;
  const [submitProperty] = useMutation(addProperty);

  const [address1, changeAddress1] = useState("");
  const [address2, changeAddress2] = useState("");
  const [city, changeCity] = useState("");
  const [province, changeProvince] = useState("");
  const [postalCode, changePostalCode] = useState("");
  const [description, changeDescription] = useState("");

  /* const [cityMsg, setCityMsg] = useState("");
  const [provinceMsg, setProvinceNameMsg] = useState("");
  const [postalCodeMsg, setPostalCodeMsg] = useState("");
  const [streetNumMsg, setStreetNumMsg] = useState(""); */

  const [numOfRooms, setNumOfRooms] = useState(3);
  const pickerRef = useRef();

  const [rules, setRules] = useState([]);

  const [uri, setUri] = useState("");
  const [filename, setFilename] = useState("");

  const addNewRule = () => {
    setRules((rules) => {
      let newRules = rules.map((r) => r);
      newRules.push("");
      return newRules;
    });
  };

  const setRule = (index, newRule) => {
    setRules((rules) => {
      let newRules = rules.map((r) => r);
      newRules[index] = newRule;
      return newRules;
    });
  };

  const deleteRule = (index) => {
    setRules((rules) => {
      return rules.filter((r, i) => i !== index);
    });
  };

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
        .child("documents/" + address1 + filename)
        .put(blob, {
          contentType: "confirmOwnerDocument",
        })
        .then((snapshot) => {
          blob.close();
          navigation.goBack()
          console.log("File uploaded!");
        });
    } catch (err) {
      console.log("Error uploading file:" + err.message);
    }
  };

  const submitPropertyForm = () => {
    submitProperty({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        address1,
        address2,
        city,
        province,
        postalCode,
        rules,
        description,
        numOfRooms,
        note: "",
      },
    })
      .then((result) => {
        uploadDocumentToStorage()
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={[styles.container, ownerStyles.addPropertyScreen]}>
      <NavigationHeader goBack={navigation.goBack} title="Add new property"/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[ownerStyles.addPropertyScreenForm]}
      >
        <View style={{paddingVertical: 5}}>
          <View style={styles.formBox}>
            <Text style={[styles.textH4, styles.formLabel]}>Address Line 1</Text>
            <TextInput
              onChangeText={changeAddress1}
              style={styles.formInput}
              value={address1}
              autoCompleteType='street-address'
            />
            <Text style={styles.alarmText}>{}</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={[styles.textH4, styles.formLabel]}>Address Line 2</Text>
            <TextInput
              onChangeText={changeAddress2}
              style={styles.formInput}
              value={address2}
            />
            <Text style={styles.alarmText}>{}</Text>
          </View>

          <View style={[styles.formBox]}>
            <Text style={[styles.textH4, styles.formLabel]}>City</Text>
            <TextInput
              onChangeText={changeCity}
              style={styles.formInput}
              value={city}
            />
            <Text style={styles.alarmText}>{}</Text>
          </View>

          <View style={styles.formRowContainer}>
            <View style={[styles.formBox, styles.formBoxSize1]}>
              <Text style={[styles.textH4, styles.formLabel]}>Province</Text>
              <TextInput
                onChangeText={changeProvince}
                style={styles.formInput}
                value={province}
              />
              <Text style={styles.alarmText}>{}</Text>
            </View>

            <View style={styles.formRowSpace} />

            <View style={[styles.formBox, styles.formBoxSize1]}>
              <Text style={[styles.textH4, styles.formLabel]}>Postal Code</Text>
              <TextInput
                onChangeText={changePostalCode}
                style={styles.formInput}
                value={postalCode}
              />
              <Text style={styles.alarmText}>{}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={ownerStyles.chooseNumOfRoomsArea}>
          <Text style={[ownerStyles.chooseNumOfRooms, styles.textH3]}>
            Number of rooms
          </Text>
          <Pressable
            onPress={() => {
              pickerRef.current.focus();
            }}
            style={styles.formPicker}
          >
            <Text style={[styles.formPickerValue]}>{numOfRooms}</Text>
            <Picker
              ref={pickerRef}
              style={styles.formPickerButton}
              selectedValue={numOfRooms}
              onValueChange={(itemValue) => {
                setNumOfRooms(itemValue);
              }}
            >
              {(() => {
                let items = [];
                for (let i = 1; i < 13; i++)
                  items.push(<Picker.Item value={i} label={`${i}`} key={i} />);
                return items;
              })()}
            </Picker>
          </Pressable>
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={ownerStyles.rulesList}>
          <Text style={[styles.textH3, ownerStyles.rulesListHeader]}>Rules</Text>
          {rules.map((rule, index) => {
            return (
              <Rule
                key={index}
                rule={rule}
                index={index}
                setRule={setRule}
                deleteRule={deleteRule}
              />
            );
          })}
          <Pressable
            onPress={() => {
              addNewRule();
            }}
            style={[styles.button, styles.buttonRound, ownerStyles.addNewRuleBtn]}
          >
            <Text style={styles.buttonText}>Add new rule</Text>
          </Pressable>
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={ownerStyles.editPropertyDesc}>
          <Text style={styles.textH3}>Description</Text>

          <TextInput
            onChangeText={changeDescription}
            style={ownerStyles.descTextInput}
            placeholder='Enter description'
            value={description}
            multiline={true}
          />
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={ownerStyles.uploadPropertyDocumentArea}>
          <Text style={[styles.textH3, { textAlign: "center" }]}>
            Please, provide evidence of rental property ownership
          </Text>
          <Text
            style={[styles.lightText]}
            onPress={() =>
              Linking.openURL(
                "https://www.ontario.ca/page/register-land-documents-electronically"
              )
            }
          >
            Check viable proof of ownership.
          </Text>
          <View style={[styles.flexRow, { margin: 10 }]}>
            <Pressable onPress={() => uploadDocumentFromSystem()} style={[styles.button, styles.flexSize1]}>
              <Text style={styles.buttonText}>Upload document</Text>
            </Pressable>
            <Text style={[styles.textH4, styles.flexSize1, { textAlign: "center" }]}>
              {filename || "No file uploaded"}
            </Text>
          </View>

          <View style={[styles.separator, styles.separatorBlue]} />
        </View>

        <Pressable
          onPress={() => submitPropertyForm()}
          style={[styles.button, styles.buttonBig]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>
            Add new property
          </Text>
        </Pressable>
        <View style={{height: 10}}/>
      </ScrollView>
    </View>
  );
}

export default AddProperty;
