import {
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { useMutation } from "@apollo/client";

import { processPayment } from "../../queries/queries";

import Loading from "../small/Loading";

import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";

const SetAmountPopUp = ({ amount, setAmount, openPaymentSheet, setPopUpOpen }) => {
  /* const [value, setValue] = useState("" + 0);

  useEffect(() => {
    let result = value.slice(0, -3) + value.slice(-2);
    if (result.length < 3) {
      let offset = result.length == 1 ? 0 : 1;
      result = ("00" + result).slice(offset);
    }
    result = result.slice(0, -2) + "." + result.slice(-2);
    setValue(result);
  }, [amount]);

  const changeAmount = () => {
    let number = value.slice(0, -3) + value.slice(-2);
    if (/^\d*$/.test(number)) {
      console.log(number);
      setAmount(parseInt(number));
    }
  }; */

  return (
    <Pressable onPress={() => setPopUpOpen(false)} style={styles.popUp}>
      <View style={[styles.popUpCard]}>
        <View style={{ width: "100%" }}>
          <View style={[styles.formBox]}>
            <Text style={[styles.textH4, styles.formLabel]}>Amount</Text>
            <TextInput
              onChangeText={setAmount}
              style={[
                styles.formInput,
                {
                  fontSize: 15,
                  height: 30,
                  borderColor: "#97CAEF",
                  borderWidth: 2,
                },
              ]}
              value={amount || "0"}
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonRound, { margin: 5 }]}
            onPress={() => openPaymentSheet()}
          >
            <Text style={[styles.buttonText]}>Pay</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export const Home = ({ userData, jwtToken, property, navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(50);
  const [openPayment, setOpenPayment] = useState(false);

  const [sendPayment] = useMutation(processPayment);

  const initializePaymentSheet = async () => {
    const { data } = await sendPayment({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        propertyId: property.id,
        amount: 50,
      },
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });

    const { paymentIntent, ephemeralKey, customer } = JSON.parse(
      data.processPayment
    );

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error.code === "Canceled") {
      Alert.alert(`Cancelled`, "Payment cancelled.");
    } else if (error.code) {
      Alert.alert(`Error`, "Error during payment ocurred.");
    } else {
      Alert.alert("Success", "Your payment was successful!");
    }
  };

  useEffect(() => {
    if (property) {
      initializePaymentSheet();
    }
  }, [property]);

  if (property == null) {
    return <Loading text={"Loading..."} style={{ flex: 1 }} />;
  }

  return (
    <View style={[styles.container, propertyStyles.homeScreen]}>
      <View style={propertyStyles.renterHomeHeader}>
        <Text style={[styles.textH2, { margin: 15 }]}>Home</Text>
        <View style={propertyStyles.renterHomeHeaderButtons}>
          <Pressable
            onPress={loading ? () => {} : () => setOpenPayment(true)}
            style={[
              styles.button,
              {
                flex: 1,
                borderWidth: 3,
                backgroundColor: loading ? "#ccc" : "#FC4445",
                borderColor: loading ? "#ccc" : "#FC4445",
              },
            ]}
          >
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
          {(() => {
            const todayDues = property.events.filter(
              (event) =>
                new Date(event.toBeCompleted).getDay() === new Date().getDay() &&
                event.assignedTo === userData.id
            );
            return todayDues.length &&
              (userData.id === property.residents[0].id || userData.isOwner) ? (
              todayDues.map((event, index) => {
                return (
                  <View key={index} style={[styles.card]}>
                    <View>
                      <Text style={styles.textH4}>{event.description}</Text>
                    </View>
                    <View style={[styles.separator, styles.separatorBlue]} />

                    <Pressable
                      onPress={() => {
                        if (!event.isCompleted)
                          navigation.navigate("Schedule", { eventId: event.id });
                      }}
                      style={[
                        styles.button,
                        styles.buttonRound,
                        event.isCompleted ? styles.buttonBlue : {},
                        {
                          width: "70%",
                          alignSelf: "flex-end",
                          marginHorizontal: 5,
                          marginTop: 5,
                        },
                      ]}
                    >
                      <Text style={[styles.buttonText]}>
                        {event.isCompleted ? "Completed" : "Report Completion"}
                      </Text>
                    </Pressable>
                  </View>
                );
              })
            ) : (
              <Text style={{ alignSelf: "center" }}>
                Nothing is due today, you can relax.
              </Text>
            );
          })()}
        </View>
      </ScrollView>

      {property.note.length !== 0 && (
        <View style={propertyStyles.renterHomeNote}>
          <Image
            style={[styles.iconS, { marginHorizontal: 5 }]}
            source={require("../../assets/pin.png")}
          />
          <View
            style={[
              styles.separator,
              styles.separatorBlue,
              styles.separatorVertical,
            ]}
          />
          <Text style={[styles.textH3, { marginHorizontal: 15 }]}>
            {property.note}
          </Text>
        </View>
      )}
      {openPayment && (
        <SetAmountPopUp
          amount={amount}
          setAmount={setAmount}
          openPaymentSheet={openPaymentSheet}
          setPopUpOpen={setOpenPayment}
        />
      )}
    </View>
  );
};

export default Home;
