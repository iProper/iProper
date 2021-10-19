import { Text, View, Pressable, TextInput, PlatformColor } from "react-native";
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
  const [scan, setScan] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const addUserToProperty = (code = null) => {
    addUser({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        id: code || propertyCode,
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
            propertyCode: code || propertyCode,
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

  const openQRScanner = () => {
    setScan(true);
  };

  const onQRCodeScan = ({ type, data }) => {
    if (type !== "cancel") {
      setScan(false);
      addUserToProperty(data);
    }
  };

  return scan && hasPermission ? (
    <View style={[styles.container, propertyStyles.QRCodeScanner]}>
      <View style={[propertyStyles.QRCodeScannerHeader]}>
        <Pressable
          style={propertyStyles.QRCodeScannerHeaderBackButton}
          onPress={() => setScan(false)}
        >
          <Text style={propertyStyles.QRCodeBackArrow}>{"< "}</Text>
          <Text style={[styles.textH2, { color: "#fff" }]}>
            Scan property QR Code
          </Text>
        </Pressable>
      </View>
      <BarCodeScanner
        onBarCodeScanned={onQRCodeScan}
        style={{ height: "100%", width: "100%", flex: 1 }}
      />
      <View style={[propertyStyles.QRCodeScannerMessage]}>
        <Text style={[styles.textH3, { color: "#fff", textAlign: "center" }]}>
          Ask Owner to provide you QR Code with property code.
        </Text>
      </View>
    </View>
  ) : (
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

              <Pressable
                onPress={openQRScanner}
                style={[styles.button, { marginVertical: 5 }]}
              >
                <Text style={[styles.buttonText]}>Scan QR code</Text>
              </Pressable>
              <Text style={styles.alarmText}>
                {!hasPermission && scan && "Need Permission to use Camera"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NoPropertyHome;
