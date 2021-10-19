import {
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { updateProperty, updateUser } from "../../queries/queries";
import { useMutation } from "@apollo/client";

import { BarCodeScanner } from "expo-barcode-scanner";

import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";

const NoPropertyHome = ({ jwtToken, refetchUser }) => {
  const [propertyCode, changePropertyCode] = useState("");
  const [err, setErr] = useState("");

  const [addUser] = useMutation(updateProperty);
  const [changeUser] = useMutation(updateUser);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const addUserToProperty = () => {
    addUser({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        id: propertyCode,
      },
    })
      .then(() =>
        changeUser({
          context: {
            headers: {
              Authorization: "Bearer " + jwtToken,
            },
          },
          variables: {
            propertyCode: propertyCode,
          },
        })
      )
      .then(() => {
        refetchUser();
      })
      .catch((err) => {
        console.log(err);
        setErr("Wrong code");
      });
  };

  const onQRCodeScan = ({ type, data }) => {
    setScanned(true);
    console.log(data);
  };

  return (
    <View style={[styles.container, propertyStyles.homeScreen]}>
      <View style={propertyStyles.renterHomeHeader}>
        <Text style={styles.textH2}> Home </Text>
      </View>
      <View style={[styles.separator, styles.separatorBlue]} />

      <View style={[styles.container, propertyStyles.noPropertyHome]}>
        <View style={[styles.card, propertyStyles.noPropertyCard]}>
          <Text style={[styles.textH3, styles.textCenter]}>
            You have not been added yet to your new homes
          </Text>

          <Text style={[styles.textH4, { padding: 5, marginTop: 5 }]}>
            Enter property code to be added to the property(ask property owner)
          </Text>

          <View
            style={[styles.separator, styles.separator60, styles.separatorBlue]}
          />

          <View style={{ width: "100%" }}>
            <View style={[styles.formBox]}>
              <Text style={[styles.textH4, styles.formLabel]}>Code</Text>
              <TextInput
                onChangeText={(text) => {
                  setErr("");
                  changePropertyCode(text);
                }}
                value={propertyCode}
                style={styles.formInput}
              />
              <Text style={styles.alarmText}>{err}</Text>
            </View>

            <View style={propertyStyles.enterPropertyButtons}>
              <Pressable
                onPress={() => addUserToProperty()}
                style={[styles.button, { marginVertical: 5 }]}
              >
                <Text style={[styles.buttonText]}>Add me to the property</Text>
              </Pressable>

              <View
                style={{
                  position: "relative",
                  marginVertical: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={[styles.separator, styles.separatorBlue]} />

                <View
                  style={{
                    backgroundColor: "#fff",
                    position: "absolute",
                    padding: 5,
                  }}
                >
                  <Text>Or</Text>
                </View>
              </View>

              <Pressable style={[styles.button, { marginVertical: 5 }]}>
                <Text style={[styles.buttonText]}>Scan QR code</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {!scanned && hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : onQRCodeScan}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
};

export const Home = ({ userData, jwtToken, refetchUser, property }) => {
  return userData.propertyCode ? (
    <View style={[styles.container, propertyStyles.homeScreen]}>
      <View style={propertyStyles.renterHomeHeader}>
        <Text style={[styles.textH2, { margin: 15 }]}>Home</Text>
        <View style={propertyStyles.renterHomeHeaderButtons}>
          <Pressable style={[styles.button, { flex: 1, borderWidth: 3 }]}>
            <Text style={[styles.buttonText]}>Pay rent</Text>
          </Pressable>
          <View style={{ width: 10 }} />
          <Pressable
            style={[styles.button, styles.buttonOff, { flex: 1, borderWidth: 3 }]}
          >
            <Text style={[styles.buttonText, styles.buttonOffText]}>
              Report issue
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.separator, styles.separatorBlue]}></View>

      <ScrollView style={propertyStyles.duesTodayArea}>
        <View style={propertyStyles.dueTodayHeader}>
          <Text style={styles.textH2}>Due Today</Text>
        </View>

        <View style={propertyStyles.duesToday}>
          <View style={styles.card}>
            <Text style={[styles.textH4, { padding: 5 }]}>
              Do This and also that and those stuff
            </Text>

            <View style={[styles.separator, styles.separatorBlue]}></View>

            <Pressable
              style={[
                styles.button,
                styles.buttonRound,
                {
                  width: "70%",
                  alignSelf: "flex-end",
                  marginHorizontal: 5,
                  marginTop: 5,
                },
              ]}
            >
              <Text style={[styles.buttonText]}>Report Completion</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={propertyStyles.renterHomeNote}>
        <Image
          style={[styles.iconS, { marginHorizontal: 5 }]}
          source={require("../../assets/pin.png")}
        />
        <View
          style={[styles.separator, styles.separatorBlue, styles.separatorVertical]}
        />
        <Text style={[styles.textH3, { marginHorizontal: 15 }]}>
          {property.note}
        </Text>
      </View>
    </View>
  ) : (
    <NoPropertyHome
      refetchUser={refetchUser}
      jwtToken={jwtToken}
      userData={userData}
    />
  );
};

export default Home;
