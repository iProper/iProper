import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useMutation } from "@apollo/client";

import { processPayment } from "../../queries/queries";

import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";

function PayRent({ navigation, jwtToken, property }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

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
        amount: 50
      },
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });

    const { paymentIntent, ephemeralKey, customer } = JSON.parse(data.processPayment);

    console.log(paymentIntent, ephemeralKey, customer);

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error.code === "Canceled") {
      Alert.alert(`Cancelled`, 'Payment cancelled.');
    } else if (error.code) {
      Alert.alert(`Error`, 'Error during payment ocurred.');
    } else {
      Alert.alert("Success", "Your payment was successful!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        variant='primary'
        disabled={!loading}
        title='Checkout'
        onPress={openPaymentSheet}
      />
    </View>
  );
}

export default PayRent;
