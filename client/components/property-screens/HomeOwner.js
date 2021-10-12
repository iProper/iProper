import { Text, View, Pressable, TextInput, ScrollView, Image } from "react-native";
import styles from "../../styles/App.styles";
import ownerStyles from "../../styles/OwnerScreens.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";
import React, { useState, useRef, useEffect } from "react";

import NavigationHeader from "../small/NavigationHeader";

const RenterCard = ({ firstName, lastName, dueDate, isPaid, isResponsible }) => {
  return (
    <View style={styles.card}>
      <Text>
        {firstName} {lastName}
      </Text>
      <View style={[styles.separator, styles.separatorBlue]} />
      <View style={styles.flexRow}>
        <Text>Payment Status:</Text>
        <Text> </Text>
        {isPaid ? <Text>Paid</Text> : <Text>Pending</Text>}
      </View>
      <Text>Due Date: {dueDate}</Text>
      <View style={[styles.separator, styles.separatorBlue]} />
      <View style={styles.flexRow}>
        <Text>{isResponsible ? "Responsible" : "Not Responsible"}</Text>
        <Image source={require("../../assets/chat-red.png")} style={styles.iconM} />
      </View>
    </View>
  );
};

const Note = ({ note, setNote, deleteNote }) => {
  const [edit, setEdit] = useState(false);
  const [inputText, changeInputText] = useState(note);

  const textInputRef = useRef();

  useEffect(() => {
    if (edit) {
      textInputRef.current.focus();
    }
  }, [edit]);

  return note === null ? (
    <Pressable
      onPress={() => {
        setNote("");
        setEdit(true);
      }}
      style={[
        styles.button,
        styles.buttonBlue,
        styles.buttonOff,
        styles.buttonRound,
        propertyStyles.addNoteButton,
      ]}
    >
      <Text style={[styles.buttonText, styles.buttonTextBlue]}>Add note</Text>
    </Pressable>
  ) : (
    <View style={[propertyStyles.note]}>
      {edit ? (
        <TextInput
          ref={textInputRef}
          style={propertyStyles.pinnedNoteTextInput}
          onChangeText={changeInputText}
          value={inputText}
          placeholder='Enter note...'
          onBlur={() => {
            if (edit) setNote(inputText);
            setEdit(false);
          }}
        />
      ) : (
        <Text style={propertyStyles.noteText}>{note}</Text>
      )}
      <View style={[propertyStyles.noteButtons]}>
        <Pressable
          style={[styles.iconS, { marginHorizontal: 7 }]}
          onPress={() => {
            if (edit) setNote(inputText);
            setEdit(!edit);
          }}
        >
          {edit ? (
            <Image
              style={styles.iconS}
              source={require("../../assets/tick-red.png")}
              resizeMode={"center"}
            />
          ) : (
            <Image
              style={styles.iconS}
              source={require("../../assets/pen-red.png")}
              resizeMode={"center"}
            />
          )}
        </Pressable>
        <Pressable onPress={() => deleteNote()}>
          <Image
            style={styles.iconS}
            resizeMode={"center"}
            source={require("../../assets/garbage-can-red.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

export function PropertyHome({ navigation, jwtToken }) {
  const [note, setNote] = useState("Some note");

  let renters = [
    {
      firstName: "Andrei",
      lastName: "Fedchenko",
      dueDate: "29th October",
      isPaid: false,
      isResponsible: false,
    },
    {
      firstName: "Nekeisha",
      lastName: "Pope",
      dueDate: "2nd November",
      isPaid: true,
      isResponsible: true,
    },
    {
      firstName: "Antonio",
      lastName: "Morris",
      dueDate: "19th November",
      isPaid: true,
      isResponsible: true,
    },
  ];

  return (
    <View style={[styles.container, propertyStyles.homeContainer]}>
      <NavigationHeader goBack={() => navigation.navigate("Main Stack")} title='Home' />

      <Note
        note={note}
        setNote={setNote}
        deleteNote={() => {
          setNote(null);
        }}
      />
      <Text style={propertyStyles.tenantText}>Tenants</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={propertyStyles.tenantsList}
      >
        {renters.map((renter, index) => (
          <RenterCard
            firstName={renter.firstName}
            lastName={renter.lastName}
            dueDate={renter.dueDate}
            isPaid={renter.isPaid}
            isResponsible={renter.isResponsible}
            key={index}
          />
        ))}
        <View style={{ flex: 1, height: 150 }} />
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate("QRScreen", {
            title: "Property Home",
          });
        }}
        style={[styles.button, styles.buttonBig, ownerStyles.addNewPropertyButton]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>Add new renter</Text>
      </Pressable>
      <View></View>
    </View>
  );
}

export default PropertyHome;
