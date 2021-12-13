import { Pressable, Text, View, TextInput, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import NavigationHeader from "../small/NavigationHeader";

import { useMutation } from "@apollo/client";

import { editEvent } from "../../queries/queries";

import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ReportCompletion({
  route,
  navigation,
  jwtToken,
  userData,
  property,
  refetchProperty,
  setEventIdNull
}) {
  const eventId = route.params?.eventId || null;
  if (eventId) setEventIdNull();

  const [reportCompletion, setReportCompletion] = useState(null);
  const [day, setDay] = useState(new Date().getDayMondayFirst());

  useEffect(() => {
    setReportCompletion(eventId);
  }, [eventId]);

  const [report, changeReport] = useState("");

  const dayBefore = () => {
    if (day > 1) setDay(day - 1);
  };

  const dayAfter = () => {
    if (day < 7) setDay(day + 1);
  };

  const [updateEvent] = useMutation(editEvent);

  const reportEventCompletion = (id) => {
      updateEvent({
        context: {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        },
        variables: {
          id: id,
          isCompleted: true,
          propertyId: property.id,
          report: report
        },
      })
        .then((result) => {
          refetchProperty();
          setReportCompletion(null);
        })
        .catch((err) => console.log(JSON.stringify(err)));
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.container, propertyStyles.editScheduleScreen]}>
        <NavigationHeader
          goBack={() => navigation.navigate("View Schedule")}
          title={"Schedule Events"}
        />
        <View style={[styles.flexRow, propertyStyles.chooseDay, {marginTop: 10}]}>
          <Pressable style={{ width: 50, alignItems: "center" }} onPress={dayBefore}>
            {day > 1 && <Text style={styles.navigationHeaderArrow}>{"<"}</Text>}
          </Pressable>
          <Text style={styles.navigationHeaderText}>{weekdays[day - 1]}</Text>
          <Pressable style={{ width: 50, alignItems: "center" }} onPress={dayAfter}>
            {day < 7 && <Text style={styles.navigationHeaderArrow}>{">"}</Text>}
          </Pressable>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            padding: 10,
          }}
          style={{ height: "100%" }}
        >
          {property.events
            .filter(
              (event) => new Date(event.toBeCompleted).getDayMondayFirst() === day
            )
            .map((event, index) => {
              return (
                <View key={index} style={[styles.card, { alignItems: "center" }]}>
                  <Text style={styles.textH3}>{event.name}</Text>
                  <View style={[styles.separator, styles.separatorBlue]} />
                  <View>
                    <Text style={styles.highlightText}>Description:</Text>
                    <Text style={styles.textH4}>{event.description}</Text>
                    <Text style={styles.highlightText}>Time:</Text>
                    <Text style={styles.textH4}>
                      {new Date(event.toBeCompleted).getHours12()}
                    </Text>
                  </View>
                  <View style={[styles.separator, styles.separatorBlue]} />
                  {reportCompletion == event.id ? (
                    <View
                      style={{
                        alignItems: "center",
                        width: "100%",
                        paddingVertical: 5,
                      }}
                    >
                      <View
                        style={[
                          styles.textInputArea,
                          {
                            marginBottom: 2,
                            width: "100%",
                            backgroundColor: "#fff",
                            borderColor: "#97CAEF",
                            borderWidth: 2,
                          },
                        ]}
                      >
                        <TextInput
                          onChangeText={changeReport}
                          style={[styles.textInputBig]}
                          placeholder='Leave a small comment...'
                          value={report}
                          multiline={true}
                        />
                      </View>
                      <View
                        style={[
                          styles.flexRow,
                          { justifyContent: "space-around", paddingTop: 10 },
                        ]}
                      >
                        <Pressable
                          onPress={() => {
                            changeReport("");
                            setReportCompletion(null);
                          }}
                        >
                          <Image
                            style={propertyStyles.aboutEditIcon}
                            source={require("../../assets/cross-red.png")}
                            resizeMode={"center"}
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            reportEventCompletion(event.id);
                          }}
                        >
                          <Image
                            style={propertyStyles.aboutEditIcon}
                            source={require("../../assets/tick-red.png")}
                            resizeMode={"center"}
                          />
                        </Pressable>
                      </View>
                    </View>
                  ) : (
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonRound,
                        event.isCompleted ? styles.buttonBlue : {},
                        { width: "100%", padding: 5 },
                      ]}
                      onPress={() => {
                        if (!event.isCompleted) setReportCompletion(event.id);
                      }}
                    >
                      <Text style={[styles.buttonText, { fontSize: 18 }]}>
                        {event.isCompleted ? "Completed" : "Report Completion"}
                      </Text>
                    </Pressable>
                  )}
                </View>
              );
            })}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </View>
  );
}
