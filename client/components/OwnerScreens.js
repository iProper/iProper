import { Text, View, Pressable, TextInput, Image, Linking } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/App.styles";
import { gql, useMutation } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import { registerAddress } from "../queries/queries";

import ownerStyles from "../styles/OwnerScreens.styles";

const PropertyCard = ({ property }) => {
  return (
    <View style={[styles.card]}>
      <View style={[ownerStyles.propertyCard]}>
        <View style={[ownerStyles.propertyCardHeader]}>
          <Text style={ownerStyles.propertyCardAddress}>{property.address}</Text>
          <Text style={ownerStyles.propertyCardTenantsNum}>
            {property.tenants.length}/{property.rooms}
          </Text>
        </View>
        <View style={[styles.separator, styles.separatorBlue]} />
        <View style={[ownerStyles.propertyCardMain]}>
          <View style={ownerStyles.propertyCardPaidBar}>
            <View
              style={[
                ownerStyles.propertyCardPaidBarProgress,
                {
                  height: (property.tenants.length / property.rooms) * 100 + "%",
                  opacity: property.tenants.length / property.rooms,
                },
              ]}
            ></View>
          </View>
          <View style={ownerStyles.propertyCardStatuses}>
            <View style={ownerStyles.propertyCardReportMsg}>
              <Text style={ownerStyles.propertyCardReportMsgText}>
                {property.report.msg
                  ? `${property.report.sender} says: ${property.report.msg}`
                  : "Nothing happened..."}
              </Text>
            </View>
            <Text style={styles.lightText}>
              {property.tenants.find((tenant) => tenant.isResponsible).name} is
              responsible this week
            </Text>
          </View>
          <View style={ownerStyles.propertyCardButtons}>
            <Pressable style={ownerStyles.propertyCardReportStatusBtn}></Pressable>
            <Pressable style={ownerStyles.propertyCardChatBtn}></Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export function OwnerDashboard({navigation, ownerId}) {
  const properties = [
    {
      address: "Address 1",
      rooms: 3,
      report: {
        msg: "",
        sender: null,
      },
      tenants: [
        { name: "Andrei", isResponsible: false, paid: true },
        { name: "Dauren", isResponsible: false, paid: true },
        { name: "Syed", isResponsible: true, paid: false },
      ],
    },
    {
      address: "Address 2",
      rooms: 3,
      report: {
        msg: "Our AC is broken!!!",
        sender: "Antonio",
      },
      tenants: [
        { name: "Antonio", isResponsible: true, paid: true },
        { name: "Nekeisha", isResponsible: false, paid: true },
      ],
    },
  ];

  return (
    <View style={[styles.container, ownerStyles.ownerDashboard]}>
      <View style={ownerStyles.ownerDashboardHeader}>
        <Text style={styles.textH2}>Your Properties</Text>
        <View style={[styles.separator, styles.separatorBlue]} />
      </View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require("../assets/search.png")}
          resizeMode={"center"}
        />
        <TextInput style={styles.searchTextInput} placeholder='Search property...' />
      </View>
      <View style={ownerStyles.ownerDashboardProperties}>
        {properties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </View>
      <Pressable
        onPress={() => {navigation.navigate("AddProperty", {
          ownerId,
          title: "Add new property"
        })}}
        style={[styles.button, styles.buttonBig, ownerStyles.addNewPropertyButton]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>
          Add new property
        </Text>
      </Pressable>
    </View>
  );

  export function AddProperty({ title, ownerId }) {
    const [registerAddress] = useMutation(registerAddress);

    const [num, changeNum] = useState("");
    const [street, changeStreet] = useState("");
    const [city, changeCity] = useState("");
    const [province, changeProvince] = useState("");
    const [postalCode, changePostalCode] = useState("");
    const [description, changeDescription] = useState("");
/* 
    const [cityMsg, setCityMsg] = useState("");
    const [provinceMsg, setProvinceNameMsg] = useState("");
    const [postalCodeMsg, setPostalCodeMsg] = useState("");
    const [streetNumMsg, setStreetNumMsg] = useState(""); */

    const submitPropertyForm = () => {
      registerAddress({
        variables: {
          num,
          street,
          city,
          province,
          postalCode,
          ownerId
        }
      })
    }

    return (
      <View>
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

        <View style={ownerStyles.addPropertyScreen}>
          <View style={ownerStyles.lineSeparator} />
          <View>
            <View style={ownerStyles.addressRow}>
              <Text style={{ marginLeft: 15 }}>Number</Text>
              <Text style={{ marginLeft: 60 }}>Street</Text>
            </View>

            <View style={ownerStyles.addressRow}>
              <TextInput
                onChangeText={changeNum}
                style={[ownerStyles.streetNumberInput]}
                value={num}
              />
              <TextInput
                onChangeText={changeStreet}
                style={[ownerStyles.streetInput]}
                value={street}
              />
            </View>

            <View style={ownerStyles.addressRow}>
              <Text style={{ marginLeft: 15 }}>City</Text>
              <Text style={{ marginLeft: 190 }}>Province</Text>
            </View>

            <View style={ownerStyles.addressRow}>
              <TextInput
                onChangeText={changeCity}
                style={[ownerStyles.cityInput]}
                value={city}
              />
              <TextInput
                onChangeText={changeProvince}
                style={[ownerStyles.provinceInput]}
                value={province}
              />
            </View>
          </View>

          <View style={ownerStyles.addressRow}>
            <Text style={{ marginLeft: 15 }}>Postal Code</Text>
            <Text style={{ marginLeft: 70 }}>Owner ID</Text>
          </View>
          <View style={ownerStyles.addressRow}>
            <TextInput
              onChangeText={changePostalCode}
              style={[ownerStyles.postalCodeInput]}
              value={postalCode}
            />
          </View>
          <View style={ownerStyles.lineSeparator} />
          <Text style={{ marginLeft: 15, marginBottom: 8, marginTop: 7 }}>
            Number of rooms
          </Text>
            {/* <View>
            <Picker style={{ height: 20, width: 30 }}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>
          </View> */}
          <View style={ownerStyles.lineSeparator} />
          <View>
            <Text style={{ textAlign: "center" }}>Rules</Text>
            <Pressable style={ownerStyles.addNewRuleBtn}>
              <Text> Add new rule</Text>
            </Pressable>
          </View>
          <View style={ownerStyles.lineSeparator} />
          <Text style={{ textAlign: "center", marginBottom: 7 }}>Description</Text>
          <View>
            <TextInput
              onChangeText={changeDescription}
              style={ownerStyles.DescTextInput}
              placeholder='Enter description'
              value={description}
            />
          </View>
          <View style={ownerStyles.lineSeparator} />
          <Text style={{ marginLeft: 11 }}>
            {" "}
            Please, provide evidence of rental property ownership
          </Text>
          <Text
            style={ownerStyles.RegistrationProofOfOwnership}
            onPress={() =>
              Linking.openURL(
                "https://www.ontario.ca/page/register-land-documents-electronically"
              )
            }
          >
            Check viable proof of ownership.
          </Text>
          <Pressable
            onPress={uploadDocBtnPressed}
            //onPress = {() => (console.log("Button press"))}
            style={ownerStyles.uploadDocumentsBtn}
          >
            <Text style={ownerStyles.uploadDocText}>{uploadDoc}</Text>
          </Pressable>
          <Text style={{ marginTop: 7, marginLeft: 11 }}>
            Property can be canceled or blocked if documents doesn't satisfy th
            requirement.
          </Text>
          <Pressable
            onPress={createPropertyBtnPressed}
            style={ownerStyles.createPropertyBtnPressed}
          >
            <Text style={ownerStyles.createPropertyText}>{createProperty}</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  export function AddProperty(route, navigation) {

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
        accept++;
      }

      if (!province) {
        setProvinceNameMsg("Province name required.");
      } else if (!/^[A-Za-z]+$/.test(province)) {
        setProvinceNameMsg("City should only have letters");
      } else if (!/^[A-Za-z]{2,50}$/.test(province)) {
        setProvinceNameMsg("Province should be from 2 to 50 letters long.");
      } else {
        setProvinceNameMsg("");
        accept++;
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
        <View style={[styles.container, ownerStyles.ownerDashboard]}>
          <Text style={styles.textH1}>Owner Dashboard</Text>
        </View>
      );
    };
  }
}
/* 
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
} */
