import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import NavigationHeader from "../small/NavigationHeader";
import EditSchedule from "./EditSchedule";
import ReportCompletion from "./ReportCompletion";
import RequestChange from "./RequestChange";

import propertyStyles from "../../styles/PropertyScreens.styles";
import styles from "../../styles/App.styles";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function generateResponsibilityList(residents) {
  let responsibilityOrder = [];
  while (responsibilityOrder.length < 5 && residents.length > 0) {
    responsibilityOrder = responsibilityOrder.concat(residents);
  }

  return responsibilityOrder;
}

function generateScheduleColumns(events, residents) {
  let scheduleColumns = [];

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
          .filter((event) => new Date(event.toBeCompleted).getDayMondayFirst() === i)
          .map((event, index) => {
            return (
              <View
                key={index}
                style={[
                  propertyStyles[
                    "residentColor" +
                      (residents.findIndex(
                        (resident) => resident.id == event.assignedTo
                      ) +
                        1)
                  ],
                  propertyStyles.scheduleEvent,
                  {
                    top:
                      ((new Date(event.toBeCompleted).getHours() + 0.6) / 24) * 100 +
                      "%",
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
                      propertyStyles[
                        "residentColor" +
                          (residents.findIndex(
                            (resident) => resident.id == event.assignedTo
                          ) +
                            1)
                      ],
                      propertyStyles.scheduleEventBackground,
                    ]}
                  ></View>
                  <Text
                    style={[
                      propertyStyles[
                        "residentColor" +
                          (residents.findIndex(
                            (resident) => resident.id == event.assignedTo
                          ) +
                            1)
                      ],
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

function Schedule({ navigation, property, userData, jwtToken, eventId = null }) {
  let responsibilityOrder = generateResponsibilityList(property.residents);

  useEffect(() => {
    if (eventId) navigation.navigate("Report Completion", { eventId: eventId });
  }, [eventId]);

  return (
    <View style={[styles.container]}>
      <View style={{ paddingHorizontal: 30, paddingTop: 30, paddingBottom: 5 }}>
        <NavigationHeader
          goBack={() => navigation.navigate("Home")}
          title='Schedule'
        />
      </View>
      <ScrollView>
        <View style={[propertyStyles.responsibilityOrder]}>
          {responsibilityOrder.length > 0 ? (
            responsibilityOrder.map((resident, index) => {
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
            })
          ) : (
            <Text>No residents found...</Text>
          )}
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
                property.events,
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
          {(() => {
            const todayDues = property.events.filter(
              (event) =>
                new Date(event.toBeCompleted).getDay() === new Date().getDay() &&
                (userData.id === event.assignedTo || userData.isOwner)
            );
            return todayDues.length ? (
              todayDues.map((event, index) => {
                return (
                  <View key={index} style={[styles.card]}>
                    <View>
                      <Text style={styles.textH4}>{event.description}</Text>
                    </View>
                    <View style={[styles.separator, styles.separatorBlue]} />
                    <View style={[styles.flexRow]}>
                      <Text style={{ padding: 3, flex: 1 }}>
                        By: {responsibilityOrder[0].firstName}{" "}
                        {responsibilityOrder[0].lastName}
                      </Text>
                      <Pressable
                        onPress={() => {
                          if (!userData.isOwner)
                            navigation.navigate("Report Completion", {
                              eventId: event.id,
                            });
                        }}
                        style={[
                          styles.button,
                          event.isCompleted || userData.isOwner
                            ? styles.buttonBlue
                            : {},
                          { flex: 1, height: 27 },
                        ]}
                      >
                        {userData.isOwner ? (
                          <Text style={[styles.buttonText]}>
                            {event.isCompleted ? "Completed" : "Pending"}
                          </Text>
                        ) : (
                          <Text style={[styles.buttonText]}>
                            {event.isCompleted ? "Completed" : "Report Completion"}
                          </Text>
                        )}
                      </Pressable>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={{ alignSelf: "center" }}>
                Nothing is due today, you can relax.
              </Text>
            );
          })()}
          <View style={{ height: 100 }} />
        </ScrollView>
      </ScrollView>
      {userData.isOwner ? (
        <View style={[styles.flexRow, propertyStyles.scheduleButtons]}>
          <Pressable
            onPress={() =>
              navigation.navigate("Edit Schedule", {
                day: new Date().getDayMondayFirst(),
              })
            }
            style={[styles.button, styles.buttonBig, { width: "100%" }]}
          >
            <Text style={[styles.buttonText, styles.buttonTextBig]}>
              Edit Schedule
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.flexRow, propertyStyles.scheduleButtons]}>
          {property.residents.length > 1 && (
            <Pressable
              onPress={() =>
                navigation.navigate("Change Responsibility", {
                  day: new Date().getDayMondayFirst(),
                })
              }
              style={[
                styles.button,
                styles.buttonBig,
                styles.buttonOff,
                { flex: 1, borderRadius: 5, marginRight: 5 },
              ]}
            >
              <Text style={[styles.buttonText, styles.buttonOffText]}>
                Request Change
              </Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => navigation.navigate("Report Completion")}
            style={[styles.button, styles.buttonBig, { flex: 1, borderRadius: 5 }]}
          >
            <Text style={[styles.buttonText]}>Report Completion</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default function ScheduleScreen({
  route,
  property,
  userData,
  jwtToken,
  refetchProperty,
}) {
  const eventId = route.params?.eventId || null;
  const setEventIdNull = () => {
    if (route.params) route.params.eventId = null;
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name='View Schedule'>
        {(props) => (
          <Schedule
            {...props}
            property={property}
            userData={userData}
            jwtToken={jwtToken}
            eventId={eventId}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name='Change Responsibility'>
        {(props) => (
          <RequestChange
            {...props}
            property={property}
            userData={userData}
            jwtToken={jwtToken}
            eventId={eventId}
            refetchProperty={refetchProperty}
          />
        )}
      </Stack.Screen>
      {userData.isOwner ? (
        <Stack.Screen name='Edit Schedule'>
          {(props) => (
            <EditSchedule
              {...props}
              property={property}
              userData={userData}
              jwtToken={jwtToken}
              refetchProperty={refetchProperty}
            />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name='Report Completion'>
          {(props) => (
            <ReportCompletion
              {...props}
              property={property}
              userData={userData}
              jwtToken={jwtToken}
              refetchProperty={refetchProperty}
              setEventIdNull={setEventIdNull}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
