import { Pressable, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import NavigationHeader from "../small/NavigationHeader";
import { useMutation } from "@apollo/client";

import { FormPicker } from "../small/Picker";
import Checkbox from "../small/Checkbox";

import { addEvent } from "../../queries/queries";

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

function AddEventPopUp({ property, jwtToken, setOpen, dayNum, refetchProperty }) {
  const [day, setDay] = useState({ label: weekdays[dayNum], value: dayNum });
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isRepeatable, setIsRepeatable] = useState(true);
  const [time, setTime] = useState({ value: 12, label: "12 pm" });

  const [postEvent] = useMutation(addEvent);

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

  const addTask = () => {
    let toBeCompleted = new Date();
    toBeCompleted.setHours(Number.parseInt(time.value));
    toBeCompleted.setMinutes(0);
    toBeCompleted.setSeconds(0);
    let offset = (day.value + 1 - toBeCompleted.getDayMondayFirst() + 7) % 7;
    toBeCompleted.setDate(toBeCompleted.getDate() + offset);

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
      },
    })
      .then((result) => {
        refetchProperty();
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Pressable onPress={() => setOpen(false)} style={styles.popUp}>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.popUpCard, { padding: 15 }]}
      >
        <Text style={[styles.textH3]}>Add event</Text>
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
              placeholder='Enter task description...'
              value={desc}
              multiline={true}
              maxLength={250}
            />
          </View>
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
            onPress={addTask}
            style={[styles.button, { width: "100%", marginTop: 15 }]}
          >
            <Text style={[styles.buttonText]}>Add Task</Text>
          </Pressable>
        </View>
      </Pressable>
    </Pressable>
  );
}

export default function EditSchedule({
  navigation,
  property,
  jwtToken,
  refetchProperty,
}) {
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [day, setDay] = useState(1);

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
        <View style={[styles.flexRow, propertyStyles.chooseDay]}>
          <Pressable style={{ width: 50, alignItems: "center" }} onPress={dayBefore}>
            {day > 1 && <Text style={styles.navigationHeaderArrow}>{"<"}</Text>}
          </Pressable>
          <Text style={styles.navigationHeaderText}>{weekdays[day - 1]}</Text>
          <Pressable style={{ width: 50, alignItems: "center" }} onPress={dayAfter}>
            {day < 7 && <Text style={styles.navigationHeaderArrow}>{">"}</Text>}
          </Pressable>
        </View>
      </View>

      <View style={[propertyStyles.addEventButton]}>
        <Pressable
          onPress={() => setOpenAddEvent(true)}
          style={[styles.button, styles.buttonBig, { width: "100%" }]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>Add Task</Text>
        </Pressable>
      </View>
      {openAddEvent && (
        <AddEventPopUp
          setOpen={setOpenAddEvent}
          jwtToken={jwtToken}
          dayNum={day - 1}
          property={property}
          refetchProperty={refetchProperty}
        />
      )}
    </View>
  );
}
