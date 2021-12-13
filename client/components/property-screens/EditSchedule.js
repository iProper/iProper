import { Pressable, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import NavigationHeader from "../small/NavigationHeader";
import { useMutation } from "@apollo/client";

import { FormPicker } from "../small/Picker";
import Checkbox from "../small/Checkbox";

import { addEvent, editEvent } from "../../queries/queries";

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

function AddEventPopUp({
  property,
  jwtToken,
  setOpen,
  dayNum,
  refetchProperty,
  event = null,
}) {
  const [day, setDay] = useState({ label: weekdays[dayNum], value: dayNum });
  const [name, setName] = useState(event?.name || "");
  const [desc, setDesc] = useState(event?.description || "");
  const [isRepeatable, setIsRepeatable] = useState(event?.isRepeatable || true);

  const [postEvent] = useMutation(addEvent);
  const [updateEvent] = useMutation(editEvent);

  const daysPickerValues = weekdays.map((weekday, index) => ({
    value: index,
    label: weekday,
  }));

  const timePickerValues = [];
  for (let i = 0; i < 24; i++) {
    let label = i % 12 === 0 ? 12 : i % 12;
    if (i > 0 && i < 12) label += " am";
    else label += " pm";

    timePickerValues.push({
      value: i,
      label: label,
    });
  }

  const [time, setTime] = useState(
    event
      ? timePickerValues.find(
          (time) => time.value == new Date(event.toBeCompleted).getHours()
        )
      : timePickerValues[12]
  );

  let assignedPickerValues = !event
    ? [
        {
          value: null,
          label: "Automatically",
        },
      ]
    : [];
  assignedPickerValues = assignedPickerValues.concat(
    property.residents.map((resident) => ({
      value: resident.id,
      label: `${resident.firstName} ${resident.lastName}`,
    }))
  );

  const assignedToResident = property.residents.find(
    (resident) => resident.id == event?.assignedTo
  );
  const [assignedTo, setAssignedTo] = useState(
    assignedToResident
      ? assignedPickerValues.find((option) => option.value === assignedToResident.id)
      : assignedPickerValues[0]
  );

  const onPressAddEvent = () => {
    let toBeCompleted = new Date();
    toBeCompleted.setHours(Number.parseInt(time.value));
    toBeCompleted.setMinutes(0);
    toBeCompleted.setSeconds(0);
    let offset = (day.value + 1 - toBeCompleted.getDayMondayFirst() + 7) % 7;
    toBeCompleted.setDate(toBeCompleted.getDate() + offset);

    if (event?.id) {
      updateEvent({
        context: {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        },
        variables: {
          id: event.id,
          name,
          description: desc,
          isRepeatable,
          toBeCompleted,
          propertyId: property.id,
          assignedTo: assignedTo.value,
        },
      })
        .then((result) => {
          refetchProperty();
          setOpen(false);
        })
        .catch((err) => console.log(JSON.stringify(err)));
    } else {
      postEvent({
        context: {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        },
        variables: {
          name,
          description: desc,
          isRepeatable,
          toBeCompleted,
          propertyId: property.id,
          assignedTo: assignedTo.value,
        },
      })
        .then((result) => {
          refetchProperty();
          setOpen(false);
        })
        .catch((err) => console.log(JSON.stringify(err)));
    }
  };

  return (
    <Pressable onPress={() => setOpen(false)} style={styles.popUp}>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.popUpCard, { padding: 15 }]}
      >
        <Text style={[styles.textH3]}>{event ? "Edit event" : "Add event"}</Text>
        <View style={[styles.separator, styles.separatorBlue]} />
        <View style={{ padding: 10, width: "100%" }}>
          <FormPicker
            pickerValues={daysPickerValues}
            selected={day}
            setSelected={setDay}
            pickerStyles={{
              backgroundColor: "#fff",
              borderColor: "#97CAEF",
              borderWidth: 2,
            }}
          />

          <View style={styles.flexRow}>
            <Text style={[styles.textH4, styles.formLabel]}>Time</Text>
            <FormPicker
              pickerValues={timePickerValues}
              selected={time}
              setSelected={setTime}
              pickerStyles={{
                backgroundColor: "#fff",
                borderColor: "#97CAEF",
                borderWidth: 2,
                width: 100,
              }}
            />
          </View>

          <View style={styles.formRowContainer}>
            <View style={[styles.formBox, styles.formBoxSize1]}>
              <Text style={[styles.textH4, styles.formLabel]}>Name</Text>
              <TextInput
                onChangeText={setName}
                style={[
                  styles.formInput,
                  {
                    fontSize: 15,
                    height: 30,
                    borderColor: "#97CAEF",
                    borderWidth: 2,
                  },
                ]}
                value={name}
                maxLength={30}
              />
            </View>
          </View>

          <Text style={[styles.textH4, styles.formLabel, { marginVertical: 5 }]}>
            Description
          </Text>
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
              onChangeText={setDesc}
              style={styles.textInputBig}
              placeholder='Enter event description...'
              value={desc}
              multiline={true}
              maxLength={250}
            />
          </View>

          <Text style={[styles.textH4, styles.formLabel, { marginTop: 5 }]}>
            Assigned To
          </Text>
          <FormPicker
            pickerValues={assignedPickerValues}
            selected={assignedTo}
            setSelected={setAssignedTo}
            pickerStyles={{
              backgroundColor: "#fff",
              borderColor: "#97CAEF",
              borderWidth: 2,
            }}
          />

          <View
            style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}
          >
            <Checkbox checked={isRepeatable} setChecked={setIsRepeatable} />
            <Pressable onPress={() => setIsRepeatable(!isRepeatable)}>
              <Text style={[styles.textH4, { marginLeft: 10 }]}>
                Repeat every week.
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={onPressAddEvent}
            style={[styles.button, { width: "100%", marginTop: 15 }]}
          >
            <Text style={[styles.buttonText]}>
              {!event ? "Add event" : "Save changes"}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Pressable>
  );
}

export default function EditSchedule({
  route,
  navigation,
  property,
  jwtToken,
  refetchProperty,
}) {
  const [eventToEdit, setEventToEdit] = useState(null);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [day, setDay] = useState(route.params?.day || 1);

  const dayBefore = () => {
    if (day > 1) setDay(day - 1);
  };

  const dayAfter = () => {
    if (day < 7) setDay(day + 1);
  };

  useEffect(() => {
    if (!openAddEvent) {
      setEventToEdit(null);
    }
  }, [openAddEvent]);

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
              (event) => new Date(event.toBeCompleted).getDayMondayFirst() === day
            )
            .map((event, index) => {
              return (
                <View key={index} style={[styles.card, { alignItems: "center" }]}>
                  <Text style={styles.textH3}>{event.name}</Text>
                  <View style={[styles.separator, styles.separatorBlue]} />
                  <View style={{ width: "100%" }}>
                    <Text style={styles.highlightText}>Description:</Text>
                    <Text style={styles.textH4}>{event.description}</Text>
                    <Text style={styles.highlightText}>Time:</Text>
                    <Text style={styles.textH4}>
                      {new Date(event.toBeCompleted).getHours12()}
                    </Text>
                    <Text style={styles.highlightText}>Repeatable:</Text>
                    <Text style={styles.textH4}>
                      {event.isRepeatable ? "Yes" : "No"}
                    </Text>
                  </View>
                  <View style={[styles.separator, styles.separatorBlue]} />
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonRound,
                      { width: "100%", padding: 5 },
                    ]}
                    onPress={() => {
                      setEventToEdit(event);
                      setOpenAddEvent(true);
                    }}
                  >
                    <Text style={[styles.buttonText, { fontSize: 18 }]}>Edit</Text>
                  </Pressable>
                </View>
              );
            })}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      <View style={[propertyStyles.addEventButton]}>
        <Pressable
          onPress={() => setOpenAddEvent(true)}
          style={[styles.button, styles.buttonBig, { width: "100%" }]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Add event</Text>
        </Pressable>
      </View>
      {openAddEvent && (
        <AddEventPopUp
          setOpen={setOpenAddEvent}
          jwtToken={jwtToken}
          dayNum={day - 1}
          property={property}
          refetchProperty={refetchProperty}
          event={eventToEdit}
        />
      )}
    </View>
  );
}
