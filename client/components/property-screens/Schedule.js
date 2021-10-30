import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, EventEmitter } from "react-native";
import propertyStyles from "../../styles/PropertyScreens.styles";
import NavigationHeader from "../small/NavigationHeader";
import styles from "../../styles/App.styles";

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
    let dayOfWeek = i === 7 ? 0 : i;
    scheduleColumns.push(
      <View
        key={i}
        style={[
          propertyStyles.scheduleDayColumn,
          i == 7 ? { borderRightWidth: 0 } : {},
        ]}
      >
        {events
          .filter((event) => event.toBeCompleted.getDay() === dayOfWeek)
          .map((event, index) => {
            console.log((event.toBeCompleted.getHours() / 24) * 100 + "%");
            return (
              <View
                key={index}
                style={[
                  propertyStyles["residentColor" + currentResponsibleIndex],
                  propertyStyles.scheduleEvent,
                  {
                    top: (event.toBeCompleted.getHours() / 24) * 100 + "%",
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

export function ScheduleScreen({ navigation, property, userData, jwtToken }) {
  const dates = [new Date(), new Date(), new Date()];
  dates[1].setHours(dates[1].getHours() + 1);
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

  console.log(events);

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
          <Pressable style={[styles.button, styles.buttonBig, { width: "100%" }]}>
            <Text style={[styles.buttonText, styles.buttonTextBig]}>
              Edit Schedule
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.flexRow, propertyStyles.scheduleButtons]}></View>
      )}
    </View>
  );
}
