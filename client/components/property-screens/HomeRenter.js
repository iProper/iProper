import { Text, View, Pressable, ScrollView, Image } from "react-native";
import React from "react";

import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";

export const Home = ({ userData, jwtToken, property }) => {
  return (
    <View style={[styles.container, propertyStyles.homeScreen]}>
      <View style={propertyStyles.renterHomeHeader}>
        <Text style={[styles.textH2, { margin: 15 }]}>Home</Text>
        <View style={propertyStyles.renterHomeHeaderButtons}>
          <Pressable style={[styles.button, { flex: 1, borderWidth: 3 }]}>
            <Text style={[styles.buttonText]}>Pay rent</Text>
          </Pressable>
          <View style={{ width: 10 }} />
          <Pressable
            style={[styles.button, styles.buttonOff, { flex: 1, borderWidth: 3 }]}
          >
            <Text style={[styles.buttonText, styles.buttonOffText]}>
              Report issue
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.separator, styles.separatorBlue]}></View>

      <ScrollView style={propertyStyles.duesTodayArea}>
        <View style={propertyStyles.dueTodayHeader}>
          <Text style={styles.textH2}>Due Today</Text>
        </View>

        <View style={propertyStyles.duesToday}>
          <View style={styles.card}>
            <Text style={[styles.textH4, { padding: 5 }]}>
              Do This and also that and those stuff
            </Text>

            <View style={[styles.separator, styles.separatorBlue]}></View>

            <Pressable
              style={[
                styles.button,
                styles.buttonRound,
                {
                  width: "70%",
                  alignSelf: "flex-end",
                  marginHorizontal: 5,
                  marginTop: 5,
                },
              ]}
            >
              <Text style={[styles.buttonText]}>Report Completion</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={propertyStyles.renterHomeNote}>
        <Image
          style={[styles.iconS, { marginHorizontal: 5 }]}
          source={require("../../assets/pin.png")}
        />
        <View
          style={[styles.separator, styles.separatorBlue, styles.separatorVertical]}
        />
        <Text style={[styles.textH3, { marginHorizontal: 15 }]}>
          {property.note}
        </Text>
      </View>
    </View>
  );
};

export default Home;
