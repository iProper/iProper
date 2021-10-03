import React from "react";
import { Text, View, Pressable, TextInput, Image } from "react-native";
import styles from "../styles/App.styles";
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
            <View style={[ownerStyles.propertyCardPaidBarProgress, {
              height: property.tenants.length/property.rooms * 100 + "%",
              opacity: property.tenants.length/property.rooms,
            }]}></View>
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

export function OwnerDashboard(props) {
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
      <Pressable onPress={() => {}} style={[styles.button, styles.buttonBig, ownerStyles.addNewPropertyButton]}>
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Add new property</Text>
      </Pressable>
    </View>
  );
}

export function AddProperty() {
  return (
    <View style={[styles.container, ownerStyles.addPropertyScreen]}>
      <Text style={styles.textH1}>Property Form</Text>
    </View>
  );
}
