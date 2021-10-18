import { Text, View, Pressable, Image, Platform } from "react-native";
import React from "react";
import styles from "../../styles/App.styles";

import ownerStyles from "../../styles/OwnerScreens.styles";

const PropertyCard = ({ navigation, property, propertyId }) => {
  return (
    <Pressable
      style={[styles.card]}
      onPress={() =>
        navigation.navigate("PropertyTabs", {
          id: propertyId,
        })
      }
    >
      <View style={[ownerStyles.propertyCard]}>
        <View style={[ownerStyles.propertyCardHeader]}>
          <Text style={ownerStyles.propertyCardAddress}>{property.address1}</Text>
          <Text style={ownerStyles.propertyCardTenantsNum}>
            {property.residents.length}/{property.numOfRooms}
          </Text>
        </View>
        <View style={[styles.separator, styles.separatorBlue]} />
        <View style={[ownerStyles.propertyCardMain]}>
          <View style={ownerStyles.propertyCardPaidBar}>
            <View
              style={[
                ownerStyles.propertyCardPaidBarProgress,
                {
                  height:
                    (property.residents.length / property.numOfRooms) * 100 + "%",
                  opacity: property.residents.length / property.numOfRooms,
                },
              ]}
            ></View>
          </View>
          <View style={ownerStyles.propertyCardStatuses}>
            <View style={ownerStyles.propertyCardReportMsg}>
              <Text style={ownerStyles.propertyCardReportMsgText}>
                {property.report?.msg
                  ? `${property.report.sender} says: ${property.report.msg}`
                  : "Nothing happened..."}
              </Text>
            </View>
            <Text style={styles.lightText}>
              {property.residents.length
                ? property.residents.find((tenant) => tenant?.isResponsible)?.name +
                  " is responsible this week"
                : "Oh no, there are no tenants!"}
            </Text>
          </View>
          <View style={ownerStyles.propertyCardButtons}>
            <Pressable style={ownerStyles.propertyCardReportStatusBtn}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  color: "#ddd",
                  fontFamily: Platform.OS == "ios" ? "Courier" : "monospace",
                }}
              >
                i
              </Text>
            </Pressable>
            <Pressable style={ownerStyles.propertyCardChatBtn}>
              <Image
                style={ownerStyles.propertyCardChatBtn}
                source={require("../../assets/chat-red.png")}
                resizeMode='center'
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PropertyCard;
