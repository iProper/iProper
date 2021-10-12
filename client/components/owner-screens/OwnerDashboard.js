import { Text, View, Pressable, TextInput, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../styles/App.styles";
import { useQuery } from "@apollo/client";
import { getOwnerProperties } from "../../queries/queries";
import PropertyCard from "./PropertyCard";

import ownerStyles from "../../styles/OwnerScreens.styles";

function OwnerDashboard({ navigation, jwtToken }) {
  const [searchText, changeSearchText] = useState("");

  const { loading, error, data, refetch } = useQuery(getOwnerProperties, {
    context: {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  let properties = [];

  if (searchText)
    properties = data.getProperties.filter((property) => {
      return property.address1.toLowerCase().includes(searchText.toLowerCase());
    });
  else properties = data?.getProperties;

  return loading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={[styles.container, ownerStyles.ownerDashboard]}>
      <View style={ownerStyles.ownerDashboardHeader}>
        <Text style={styles.textH2}>Your Properties</Text>
        <View style={[styles.separator, styles.separatorBlue]} />
      </View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require("../../assets/search.png")}
          resizeMode={"center"}
        />
        <TextInput
          onChangeText={changeSearchText}
          style={styles.searchTextInput}
          placeholder='Search property...'
          value={searchText}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: "center", padding: 10}}
        style={[ownerStyles.ownerDashboardProperties]}
      >
        {properties?.map((property, index) => (
          <PropertyCard key={index} navigation={navigation} propertyId={property.propertyCode} property={property} />
        ))}
        <View style={{ flex: 1, height: 150 }} />
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate("AddProperty", {
            title: "Add new property",
            jwtToken,
          });
        }}
        style={[styles.button, styles.buttonBig, ownerStyles.addNewPropertyButton]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>
          Add new property
        </Text>
      </Pressable>
    </View>
  );
}

export default OwnerDashboard;
