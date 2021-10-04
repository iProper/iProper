import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/App.styles";
import { ownerStyleSheet } from "../styles/OwnerScreens.styles";
import { gql, useMutation } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import { registerAdress } from "../queries/queries";

export function AddProperty(route, navigation) {
  const [registerAdress] = useMutation(registerAdress);
  const [address, changeAddress] = useState("");

  const [num, changeNum] = useState("");
  const [street, changeStreet] = useState("");
  const [city, changeCity] = useState("");
  const [province, changeProvince] = useState("");
  const [postalCode, changePostalCode] = useState("");

  const [cityMsg, setCityMsg] = useState("");
  const [provinceMsg, setProvinceNameMsg] = useState("");
  const [postalCodeMsg, setPostalCodeMsg] = useState("");
  const [streetNumMsg, setstreetNumMsg] = useState("");
  const checkAddress = () => {
    let accept = 0;

    if (!postalCode) {
      setPostalCodeMsg("Address required.");
    } else if (/d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./.test(postalCode)) {
      setPostalCodeMsg("Address should only contain Letters and Numbers.");
    } else if (!/^[A-Za-z]{7}$/.test(postalCode)) {
      setPostalCodeMsg("First name should be 7 letters long.");
    } else {
      setPostalCodeMsg("");
      accept++;
    }

    if (!num) {
      setstreetNumMsg("Address required.");
    } else if (/^[0-9]*$/.test(num)) {
      setstreetNumMsg("Street Number should only contain Numbers.");
    } else if (!/^[0-9]{7}$/.test(num)) {
      setstreetNumMsg("Street Number should be 7 Nubmbers long.");
    } else {
      setstreetNumMsg("");
      accept++;
    }

    if (!city) {
      setCityMsg("City name required.");
    } else if (!/^[A-Za-z]+$/.test(city)) {
      setCityMsg("City should only have letters");
    } else if (!/^[A-Za-z]{2,50}$/.test(city)) {
      setCityMsg("City should be from 2 to 50 letters long.");
    } else {
      setCityMsg("");
      passed++;
    }

    if (!province) {
      setProvinceNameMsg("Province name required.");
    } else if (!/^[A-Za-z]+$/.test(province)) {
      setProvinceNameMsg("City should only have letters");
    } else if (!/^[A-Za-z]{2,50}$/.test(province)) {
      setProvinceNameMsg("Province should be from 2 to 50 letters long.");
    } else {
      setProvinceNameMsg("");
      passed++;
    }

    const submitForm = () => {
      registerAdress({
        variables: {
          num,
          street,
          city,
          province,
          postalCode,
        },
      }).then((result) => navigation.navigate("Home"));
    };
    return (
      <View style={[styles.container, ownerStyleSheet.ownerDashboard]}>
        <Text style={styles.textH1}>Owner Dashboard</Text>
      </View>
    );
  };
}

export function OwnerDashboard(props, { navigation }) {
  //const [registerAdress] = useMutation(registerAdress);
  const [selectedValue, setSelectedValue] = useState("3");
  let num, city, street, province, postalCode, ownerId;
  const { onPress, createProperty = "Create Property" } = props;
  const { uploadDoc = "upload documents" } = props;

  const uploadDocBtnPressed = () => {};
  const createPropertyBtnPressed = () => {
    props.navigation.navigate("Home");
  };
  return (
    <SafeAreaView>
      <View style={ownerStyleSheet.addPropertyScreen}>
        <View style={ownerStyleSheet.lineSeparator} />
        <View>
          <View style={ownerStyleSheet.addressRow}>
            <Text style={{ marginLeft: 15 }}>Number</Text>
            <Text style={{ marginLeft: 60 }}>Street</Text>
          </View>

          <View style={ownerStyleSheet.addressRow}>
            <TextInput
              ref={(value) => (num = value)}
              style={[ownerStyleSheet.streetNumberInput]}
            />
            <TextInput
              ref={(value) => (street = value)}
              style={[ownerStyleSheet.streetInput]}
            />
          </View>

          <View style={ownerStyleSheet.addressRow}>
            <Text style={{ marginLeft: 15 }}>City</Text>
            <Text style={{ marginLeft: 190 }}>Province</Text>
          </View>

          <View style={ownerStyleSheet.addressRow}>
            <TextInput
              ref={(value) => (city = value)}
              style={[ownerStyleSheet.cityInput]}
            />
            <TextInput
              ref={(value) => (province = value)}
              style={[ownerStyleSheet.provinceInput]}
            />
          </View>
        </View>

        <View style={ownerStyleSheet.addressRow}>
          <Text style={{ marginLeft: 15 }}>Postal Code</Text>
          <Text style={{ marginLeft: 70 }}>Owner ID</Text>
        </View>
        <View style={ownerStyleSheet.addressRow}>
          <TextInput
            ref={(value) => (postalCode = value)}
            style={[ownerStyleSheet.postalCodeInput]}
          />
          <TextInput
            ref={(value) => (ownerId = value)}
            style={[ownerStyleSheet.ownerIdInput]}
          />
        </View>
        <View style={ownerStyleSheet.lineSeparator} />
        <Text style={{ marginLeft: 15, marginBottom: 8, marginTop: 7 }}>
          Number of rooms
          {/* <View>
            <Picker style={{ height: 20, width: 30 }}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>
          </View> */}
        </Text>
        <View style={ownerStyleSheet.lineSeparator} />
        <View>
          <Text style={{ textAlign: "center" }}>Rules</Text>
          <Pressable style={ownerStyleSheet.addNewRuleBtn}>
            <Text> Add new rule</Text>
          </Pressable>
        </View>
        <View style={ownerStyleSheet.lineSeparator} />
        <Text style={{ textAlign: "center", marginBottom: 7 }}>
          Description
        </Text>
        <View>
          <TextInput
            style={ownerStyleSheet.DescTextInput}
            placeholder="Enter description"
          />
        </View>
        <View style={ownerStyleSheet.lineSeparator} />
        <Text style={{ marginLeft: 11 }}>
          {" "}
          Please, provide evidence of rental property ownership
        </Text>
        <Text
          style={ownerStyleSheet.RegistrationProofOfOwnership}
          onPress={() =>
            Linking.openURL(
              "https://www.ontario.ca/page/register-land-documents-electronically"
            )
          }
        >
          Check valiable provement of ownership.
        </Text>
        <Pressable
          onPress={uploadDocBtnPressed}
          //onPress = {() => (console.log("Button press"))}
          style={ownerStyleSheet.uploadDocumentsBtn}
        >
          <Text style={ownerStyleSheet.uploadDocText}>{uploadDoc}</Text>
        </Pressable>
        <Text style={{ marginTop: 7, marginLeft: 11 }}>
          Property can be canceled or blocked if documents doesn't statisfy th
          requirement.
        </Text>
        <Pressable
          onPress={createPropertyBtnPressed}
          //onPress={() => submitForm()}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   registerAdress({
          //     variables: {
          //       num: num.value,
          //       street: street.value,
          //       city: city.value,
          //       province: province.value,
          //       postalCode: postalCode.value,
          //       ownerId: ownerId.value,
          //     },
          //   });
          // }}
          style={ownerStyleSheet.createPropertyBtnPressed}
        >
          <Text style={ownerStyleSheet.createPropertyText}>
            {createProperty}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default OwnerDashboard;
