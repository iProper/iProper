import { Text, View, Pressable, ScrollView, Image } from "react-native";
import React from "react";

import Loading from "../small/Loading";

import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";

export const Home = ({ userData, jwtToken, property, navigation }) => {
  if (property == null) {
    return <Loading text={"Loading..."} style={{ flex: 1 }} />;
  }

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
          {(() => {
            const todayDues = property.events.filter(
              (event) =>
                new Date(event.toBeCompleted).getDay() === new Date().getDay() &&
                event.assignedTo === userData.id
            );
            return todayDues.length &&
              (userData.id === property.residents[0].id || userData.isOwner) ? (
              todayDues.map((event, index) => {
                return (
                  <View key={index} style={[styles.card]}>
                    <View>
                      <Text style={styles.textH4}>{event.description}</Text>
                    </View>
                    <View style={[styles.separator, styles.separatorBlue]} />

                    <Pressable
                      onPress={() => {
                        if (!event.isCompleted)
                          navigation.navigate("Schedule", { eventId: event.id });
                      }}
                      style={[
                        styles.button,
                        styles.buttonRound,
                        event.isCompleted ? styles.buttonBlue : {},
                        {
                          width: "70%",
                          alignSelf: "flex-end",
                          marginHorizontal: 5,
                          marginTop: 5,
                        },
                      ]}
                    >
                      <Text style={[styles.buttonText]}>
                        {event.isCompleted ? "Completed" : "Report Completion"}
                      </Text>
                    </Pressable>
                  </View>
                );
              })
            ) : (
              <Text style={{ alignSelf: "center" }}>
                Nothing is due today, you can relax.
              </Text>
            );
          })()}
        </View>
      </ScrollView>

      {property.note.length !== 0 && (
        <View style={propertyStyles.renterHomeNote}>
          <Image
            style={[styles.iconS, { marginHorizontal: 5 }]}
            source={require("../../assets/pin.png")}
          />
          <View
            style={[
              styles.separator,
              styles.separatorBlue,
              styles.separatorVertical,
            ]}
          />
          <Text style={[styles.textH3, { marginHorizontal: 15 }]}>
            {property.note}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;
