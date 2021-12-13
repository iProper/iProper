import { Pressable, Text, View, TextInput, ScrollView, Image } from "react-native";
import { FormPicker } from "../small/Picker";
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

function PopupRequestChange({
  property,
  userData,
  jwtToken,
  setOpen,
  requestChangeId,
  refetchProperty,
}) {
  const pickerValues = property.residents
    .filter((res) => res.id !== userData.id)
    .map((resident) => ({
      label: resident.firstName + " " + resident.lastName,
      value: resident,
    }));

  const [toWho, setToWho] = useState(pickerValues[0]);

  const [comment, changeComment] = useState("");

  const [updateEvent] = useMutation(editEvent);

  const requestEventChange = () => {
    updateEvent({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        id: requestChangeId,
        propertyId: property.id,
        assignedTo: toWho.value.id,
      },
    })
      .then((result) => {
        refetchProperty();
        setOpen(null);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  };

  return (
    <Pressable onPress={() => setOpen(false)} style={styles.popUp}>
      <View style={styles.popUpCard}>
        <Text style={[styles.textH3]}>Request Change</Text>
        <View style={[styles.separator, styles.separatorBlue]} />
        <View style={[{ paddingHorizontal: 10 }]}>
          <Text style={[styles.textH4, { paddingVertical: 10 }]}>
            Your responsibility going to be transferred this week to:
          </Text>
          <FormPicker
            selected={toWho}
            setSelected={setToWho}
            pickerValues={pickerValues}
          />
        </View>
        <View style={[styles.textInputArea, { marginVertical: 15 }]}>
          <TextInput
            onChangeText={changeComment}
            style={styles.textInputBig}
            placeholder='Leave a small explanation...'
            value={comment}
            multiline={true}
          />
        </View>
        <View style={[styles.flexRow, { padding: 5 }]}>
          <Pressable style={[styles.button, styles.buttonBlue, { width: "45%" }]}>
            <Text style={[styles.buttonText]}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { width: "45%" }]}
            onPress={() => requestEventChange()}
          >
            <Text style={[styles.buttonText]}>Request</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

export default function RequestChange({
  route,
  navigation,
  jwtToken,
  userData,
  property,
  refetchProperty,
  setEventIdNull,
}) {
  const eventId = route.params?.eventId || null;
  if (eventId) setEventIdNull();

  const [requestChange, setRequestChange] = useState(null);
  const [day, setDay] = useState(new Date().getDayMondayFirst());

  useEffect(() => {
    setRequestChange(eventId);
  }, [eventId]);

  const dayBefore = () => {
    if (day > 1) setDay(day - 1);
  };

  const dayAfter = () => {
    if (day < 7) setDay(day + 1);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.container, propertyStyles.editScheduleScreen]}>
        <NavigationHeader
          goBack={() => navigation.navigate("View Schedule")}
          title={"Edit Schedule"}
        />
        <View style={[styles.flexRow, propertyStyles.chooseDay, { marginTop: 10 }]}>
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
              (event) =>
                new Date(event.toBeCompleted).getDayMondayFirst() === day &&
                event.assignedTo === userData.id
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
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonRound,
                      event.isCompleted ? styles.buttonBlue : {},
                      { width: "100%", padding: 5 },
                    ]}
                    onPress={() => {
                      setRequestChange(event.id);
                    }}
                  >
                    <Text style={[styles.buttonText, { fontSize: 18 }]}>
                      Request Change
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      {requestChange && (
        <PopupRequestChange
          property={property}
          userData={userData}
          jwtToken={jwtToken}
          setOpen={setRequestChange}
          requestChangeId={requestChange}
          refetchProperty={refetchProperty}
        />
      )}
    </View>
  );
}
