import {
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import styles from "../styles/App.styles";
import ownerStyles from "../styles/OwnerScreens.styles";
import propertyStyles from "../styles/PropertyScreens.styles";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { currentUser, getOwnerProperties } from "../queries/queries";

const RenterCard = ({
  firstName,
  lastName,
  dueDate,
  isPaid,
  isResponsible,
}) => {
  return (
    <View style={styles.card}>
      <Text>
        {firstName} {lastName}{" "}
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
        <Image
          source={require("../assets/chat-red.png")}
          style={styles.iconM}
        />
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

  return (
    <View style={[ownerStyles.rule]}>
      {edit ? (
        <TextInput
          ref={textInputRef}
          style={ownerStyles.ruleTextInput}
          onChangeText={changeInputText}
          value={inputText}
          placeholder="Enter note..."
          onBlur={() => {
            if (edit) setNote(inputText);
            setEdit(false);
          }}
        />
      ) : (
        <Text style={ownerStyles.ruleText}>{note}</Text>
      )}
      <View style={ownerStyles.ruleButtons}>
        <Text>Pinned note</Text>
        <Pressable
          style={ownerStyles.ruleEditBtn}
          onPress={() => {
            if (edit) setNote(inputText);
            setEdit(!edit);
          }}
        >
          {edit ? (
            <Image
              style={ownerStyles.ruleSaveIcon}
              source={require("../assets/tick-red.png")}
              resizeMode={"center"}
            />
          ) : (
            <Image
              style={ownerStyles.ruleEditIcon}
              source={require("../assets/pen-red.png")}
              resizeMode={"center"}
            />
          )}
        </Pressable>
        <Pressable
          style={ownerStyles.ruleDeleteBtn}
          onPress={() => deleteNote()}
        >
          <Image
            style={ownerStyles.ruleDeleteIcon}
            resizeMode={"center"}
            source={require("../assets/garbage-can-red.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

export function QRScreen({ navigation, jwtToken, props }) {
  const { loading, error, data } = useQuery(currentUser, {
    context: {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
  });
  //console.log(data.firstName);
  console.log(data.currentUser.firstName, data.currentUser.lastName);
  let Usernames = [];

  const [note, setNote] = useState("");

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
    <View style={[styles.container, propertyStyles.propertyAboutScreen]}>
      <View style={styles.navigationHeader}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.navigationHeaderArrow}>{"< "}Home</Text>
        </Pressable>
      </View>
      <View style={[styles.separator, styles.separatorBlue]} />

      <Note
        note={note}
        setNote={setNote}
        deleteNote={() => {
          setNote(null);
        }}
      />

      <View>
        <Text style={propertyStyles.tenantText}>Tenants</Text>

        <View style={styles.card}>
          <Text>Add new tenant</Text>
          <View style={[styles.separator60, styles.separatorBlue]} />
          <Text>Property code:</Text>
          <Text>
            <View style={[styles.separator20, styles.separatorBlue]} />
            <Text> Or scan QR code</Text>
            <View style={[styles.separator20, styles.separatorBlue]} />
          </Text>
          <Image
            source={require("../assets/qr-code.png")}
            resizeMode={"center"}
            style={propertyStyles.QRcode}
          />
        </View>
      </View>
      <View>
        {renters.map((renter) => (
          <>
            <RenterCard
              firstName={renter.firstName}
              lastName={renter.lastName}
              dueDate={renter.dueDate}
              isPaid={renter.isPaid}
              isResponsible={renter.isResponsible}
            />
          </>
        ))}
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("AddProperty", {
            title: "Add new property",
            jwtToken,
          });
        }}
        style={[
          styles.button,
          styles.buttonBig,
          ownerStyles.addNewPropertyButton,
        ]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>
          Add new renter
        </Text>
      </Pressable>
      <View></View>
    </View>
  );
}
export default QRScreen;
