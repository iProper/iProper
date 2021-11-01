import { Text, View, Pressable, TextInput, ScrollView, Image } from "react-native";
import styles from "../../styles/App.styles";
import ownerStyles from "../../styles/OwnerScreens.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";
import React, { useState, useRef, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";

import { useMutation } from "@apollo/client";
import { updateProperty } from "../../queries/queries";

import NavigationHeader from "../small/NavigationHeader";

const RenterCard = ({ firstName, lastName, dueDate, isPaid, isResponsible }) => {
  return (
    <View style={styles.card}>
      <Text>
        {firstName} {lastName}
      </Text>
      <View style={[styles.separator, styles.separatorBlue]} />
      <View style={[styles.flexRow, { position: "relative" }]}>
        <Text>Payment Status:</Text>
        <View
          style={[
            styles.button,
            styles.buttonBlue,
            styles.buttonRound,
            { position: "absolute", right: 0, top: 0, width: "35%", height: "200%" },
          ]}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 17 }}>
            {isPaid ? "Paid" : "Pending"}
          </Text>
        </View>
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

  return note === "" && !edit ? (
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
      <Text style={[styles.textH3, { color: "#000" }]}>Add note</Text>
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

const AddNewTenantPopUp = ({ setPopUpOpen, propertyCode }) => {
  return (
    <Pressable onPress={() => setPopUpOpen(false)} style={styles.popUp}>
      <View style={[styles.popUpCard, {paddingBottom: 30}]}>
        <Text style={styles.textH2}>Add new tenant</Text>
        <View style={[styles.separator, styles.separatorBlue]} />
        <View style={[styles.flexRow, { padding: 10 }]}>
          <Text style={styles.textH3}>Property code:</Text>
          <Text style={[styles.alarmText, styles.textH3]}>{propertyCode}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            width: "100%",
          }}
        >
          <View style={[styles.separator, styles.separatorBlue]} />
          <Text
            style={[
              styles.textH3,
              { position: "absolute", backgroundColor: "#fff", padding: 5 },
            ]}
          >
            Or scan QR code
          </Text>
        </View>
        <QRCode value={propertyCode} size={150}/>
      </View>
    </Pressable>
  );
};

export function PropertyHome({ navigation, jwtToken, property }) {
  const [QRCodeOpen, setQRCodeOpen] = useState(false);

  const [note, setNote] = useState(property.note);

  const [submitUpdatedProperty] = useMutation(updateProperty);

  useEffect(() => {
    submitUpdatedProperty({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        id: property.id,
        note,
      },
    })
      .then(() => {})
      .catch((err) => console.log(err));
  }, [note]);

  let renters = property.residents || [];

  return (
    <View style={[styles.container, { position: "relative" }]}>
      <View style={[styles.container, propertyStyles.homeScreenOwner]}>
        <NavigationHeader
          goBack={() => navigation.navigate("Main Stack")}
          title='Home'
        />
        <View style={[propertyStyles.tenantsListArea, { position: "relative" }]}>
          <Note
            note={note}
            setNote={setNote}
            deleteNote={() => {
              setNote("");
            }}
          />
          <Text style={propertyStyles.tenantText}>Tenants</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center", padding: 10 }}
            style={propertyStyles.tenantsList}
          >
            {renters.length ? renters.map((renter, index) => (
              <RenterCard
                firstName={renter.firstName}
                lastName={renter.lastName}
                dueDate={renter.dueDate}
                isPaid={renter.isPaid}
                isResponsible={renter.isResponsible}
                key={index}
              />
            )) : <Text style={{color: "#555"}}>Oops... No tenants found.</Text>}
            <View style={{ flex: 1, height: 150 }} />
          </ScrollView>
          <Pressable
            onPress={() => {
              setQRCodeOpen(true);
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
        </View>
      </View>
      {QRCodeOpen && (
        <AddNewTenantPopUp
          propertyCode={property.propertyCode}
          setPopUpOpen={setQRCodeOpen}
        />
      )}
    </View>
  );
}

export default PropertyHome;
