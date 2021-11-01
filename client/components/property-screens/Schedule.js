import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";

import NavigationHeader from "../small/NavigationHeader";
import { FormPicker } from "../small/Picker";
import EditSchedule from "./EditSchedule";

import propertyStyles from "../../styles/PropertyScreens.styles";
import styles from "../../styles/App.styles";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function generateResponsibilityList(residents) {
  let responsibilityOrder = [];
  while (responsibilityOrder.length < 5) {
    responsibilityOrder = responsibilityOrder.concat(residents);
  }

  return responsibilityOrder;
}

function generateScheduleColumns(events, responsibilityOrder, residents) {
  let scheduleColumns = [];

  const currentResponsibleIndex =
    residents.findIndex((resident) => resident.id === responsibilityOrder[0].id) + 1;

  for (let i = 1; i < 8; i++) {
    scheduleColumns.push(
      <View
        key={i}
        style={[
          propertyStyles.scheduleDayColumn,
          i == 7 ? { borderRightWidth: 0 } : {},
        ]}
      >
        {events
          .filter((event) => event.toBeCompleted.getDayMondayFirst() === i)
          .map((event, index) => {
            return (
              <View
                key={index}
                style={[
                  propertyStyles["residentColor" + currentResponsibleIndex],
                  propertyStyles.scheduleEvent,
                  {
                    top: ((event.toBeCompleted.getHours() + 0.6) / 24) * 100 + "%",
                    zIndex: index * 10,
                  },
                ]}
              >
                <View
                  style={[
                    styles.container,
                    { borderRadius: 7, position: "relative" },
                  ]}
                >
                  <View
                    style={[
                      propertyStyles["residentColor" + currentResponsibleIndex],
                      propertyStyles.scheduleEventBackground,
                    ]}
                  ></View>
                  <Text
                    style={[
                      propertyStyles["residentColor" + currentResponsibleIndex],
                      propertyStyles.scheduleEventText,
                    ]}
                  >
                    {event.name}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    );
  }
  return scheduleColumns;
}

function PopupRequestChange({ property, userData, jwtToken, setOpen }) {
  const [toWho, setToWho] = useState(
    property.residents[0].id === userData.id
      ? {
          label:
            property.residents[1].firstName + " " + property.residents[0].lastName,
          value: property.residents[1],
        }
      : {
          label:
            property.residents[0].firstName + " " + property.residents[0].lastName,
          value: property.residents[0],
        }
  );
  const [comment, changeComment] = useState("");

  const pickerValues = property.residents.map((resident) => ({
    label: resident.firstName + " " + resident.lastName,
    value: resident,
  }));

  return (
    <Pressable onPress={() => setOpen(false)} style={styles.popUp}>
      <View style={styles.popUpCard}>
        <Text style={[styles.textH3]}>Request Change</Text>
        <View style={[styles.separator, styles.separatorBlue]} />
        <View style={[{ paddingHorizontal: 10 }]}>
          <Text style={[styles.textH4, {paddingVertical: 10}]}>
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
            placeholder='Leave a small comment...'
            value={comment}
            multiline={true}
          />
        </View>
        <View style={[styles.flexRow, { padding: 5 }]}>
          <Pressable style={[styles.button, styles.buttonBlue, { width: "45%" }]}>
            <Text style={[styles.buttonText]}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: "45%" }]}>
            <Text style={[styles.buttonText]}>Request</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

export function Schedule({ navigation, property, userData, jwtToken }) {
  const [openRequestChange, setOpenRequestChange] = useState();

  const dates = [new Date(), new Date(), new Date()];
  dates[1].setHours(12);
  dates[2].setDate(dates[2].getDate() + 2);
  const events = [
    {
      name: "Garbage",
      description: "Throw Garbage Away",
      toBeCompleted: dates[0],
    },
    {
      name: "Garbage",
      description: "Throw Garbage Away",
      toBeCompleted: dates[1],
    },
    {
      name: "Garbage",
      description: "Throw Garbage Away",
      toBeCompleted: dates[2],
    },
  ];

  let responsibilityOrder = generateResponsibilityList(property.residents);

  return (
    <View style={[styles.container]}>
      <View style={{ paddingHorizontal: 30, paddingTop: 30 }}>
        <NavigationHeader
          goBack={() => navigation.navigate("Home")}
          title='Schedule'
        />
      </View>
      <ScrollView>
        <View style={[propertyStyles.responsibilityOrder]}>
          {responsibilityOrder.map((resident, index) => {
            const residentIndex =
              property.residents.findIndex((r) => resident.id == r.id) + 1;
            return (
              <Text
                key={index}
                style={[
                  propertyStyles.responsibilityName,
                  propertyStyles["residentColor" + residentIndex],
                ]}
              >
                {resident.firstName} {resident.lastName}
              </Text>
            );
          })}
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={[propertyStyles.scheduleWrapper]}
        >
          <View style={[propertyStyles.schedule]}>
            <View style={[propertyStyles.scheduleHeader]}>
              <View style={propertyStyles.scheduleDayOfWeek}>
                <Text style={propertyStyles.scheduleDayOfWeekName}>Monday</Text>
              </View>
              <View style={propertyStyles.scheduleDayOfWeek}>
                <Text style={propertyStyles.scheduleDayOfWeekName}>Tuesday</Text>
              </View>
              <View style={propertyStyles.scheduleDayOfWeek}>
                <Text style={propertyStyles.scheduleDayOfWeekName}>Wednesday</Text>
              </View>
              <View style={propertyStyles.scheduleDayOfWeek}>
                <Text style={propertyStyles.scheduleDayOfWeekName}>Thursday</Text>
              </View>
              <View style={propertyStyles.scheduleDayOfWeek}>
                <Text style={propertyStyles.scheduleDayOfWeekName}>Friday</Text>
              </View>
              <View style={propertyStyles.scheduleDayOfWeek}>
                <Text style={propertyStyles.scheduleDayOfWeekName}>Saturday</Text>
              </View>
              <View
                style={[propertyStyles.scheduleDayOfWeek, { borderRightWidth: 0 }]}
              >
                <Text style={propertyStyles.scheduleDayOfWeekName}>Sunday</Text>
              </View>
            </View>
            <View style={[propertyStyles.scheduleDayColumns]}>
              <View style={[propertyStyles.scheduleBackground]}>
                <View style={[propertyStyles.scheduleBackgroundRow]}>
                  <Text style={[propertyStyles.scheduleBackgroundTime]}>
                    12:00 am
                  </Text>
                </View>
                <View style={[propertyStyles.scheduleBackgroundRow]}>
                  <Text style={[propertyStyles.scheduleBackgroundTime]}>
                    6:00 am
                  </Text>
                </View>
                <View style={[propertyStyles.scheduleBackgroundRow]}>
                  <Text style={[propertyStyles.scheduleBackgroundTime]}>
                    12:00 pm
                  </Text>
                </View>
                <View style={[propertyStyles.scheduleBackgroundRow]}>
                  <Text style={[propertyStyles.scheduleBackgroundTime]}>
                    6:00 pm
                  </Text>
                </View>
              </View>
              {generateScheduleColumns(
                events,
                responsibilityOrder,
                property.residents
              )}
            </View>
          </View>
          <View style={{ width: 50 }} />
        </ScrollView>
        <View style={[styles.separator, styles.separatorBlue]} />
        <ScrollView contentContainerStyle={[propertyStyles.duesTodaySchedule]}>
          <Text style={[styles.textH3, { textAlign: "left", padding: 10 }]}>
            Due Today:
          </Text>
          {events
            .filter((event) => event.toBeCompleted.getDay() === new Date().getDay())
            .map((event, index) => {
              return (
                <View key={index} style={[styles.card]}>
                  <View>
                    <Text style={styles.textH4}>{event.description}</Text>
                  </View>
                  <View style={[styles.separator, styles.separatorBlue]} />
                  <View style={[styles.flexRow]}>
                    <Text style={{ padding: 3 }}>
                      By: {responsibilityOrder[0].firstName}{" "}
                      {responsibilityOrder[0].lastName}
                    </Text>
                    <View
                      style={[
                        styles.separator,
                        styles.separatorBlue,
                        styles.separatorVertical,
                      ]}
                    />
                    <View style={[styles.button, styles.buttonBlue, { height: 27 }]}>
                      <Text style={[styles.buttonText]}>Pending</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          <View style={{ height: 100 }} />
        </ScrollView>
      </ScrollView>
      {userData.isOwner ? (
        <View style={[styles.flexRow, propertyStyles.scheduleButtons]}>
          <Pressable onPress={() => navigation.navigate("Edit Schedule")} style={[styles.button, styles.buttonBig, { width: "100%" }]}>
            <Text style={[styles.buttonText, styles.buttonTextBig]}>
              Edit Schedule
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.flexRow, propertyStyles.scheduleButtons]}>
          {property.residents.length > 1 && (
            <Pressable
              style={[
                styles.button,
                styles.buttonBig,
                styles.buttonOff,
                { flex: 1, borderRadius: 5 },
              ]}
              onPress={() => setOpenRequestChange(true)}
            >
              <Text style={[styles.buttonText, styles.buttonOffText]}>
                Request Change
              </Text>
            </Pressable>
          )}
          <View style={{ width: 5 }} />
          <Pressable
            style={[styles.button, styles.buttonBig, { flex: 1, borderRadius: 5 }]}
          >
            <Text style={[styles.buttonText]}>Report Completion</Text>
          </Pressable>
        </View>
      )}
      {openRequestChange && (
        <PopupRequestChange
          property={property}
          userData={userData}
          jwtToken={jwtToken}
          setOpen={setOpenRequestChange}
        />
      )}
    </View>
  );
}

export default function ScheduleScreen({ property, userData, jwtToken }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name='View Schedule'>
        {(props) => <Schedule {...props} property={property} userData={userData} jwtToken={jwtToken}/>}
      </Stack.Screen>
      <Stack.Screen name='Edit Schedule'>
        {(props) => <EditSchedule {...props} property={property} userData={userData} jwtToken={jwtToken}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}