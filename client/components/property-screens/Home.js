import {
  Text,
  View,
  Pressable,
} from "react-native";
import React from "react";

import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";

export const Home = (props) => {
  return (
    <View style={[styles.container, propertyStyles.homeContainer]}>
      <View style={propertyStyles.renterHomeHeader}>
        <Text style={styles.textH2}> Home </Text>
        <View style={propertyStyles.renterHomeHeaderButtons}>
          <Pressable style={[styles.button, propertyStyles.payRentButton]}>
            <Text style = {[styles.buttonText]}>Pay Rent</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.buttonOff]}>
            <Text style={[styles.buttonText, styles.buttonOffText]}>Report Issue</Text>
          </Pressable>
          
          <View style = {propertyStyles.renterDueToday}>
            <Text style = {styles.textH2}> Due Today </Text>
          </View>
          <Pressable style = {[styles.button, propertyStyles.reportCompletionButton]}>
            <Text style = {[styles.buttonText]}>Report Completion</Text>
          </Pressable>

        </View>
      </View>
    </View>  
  );
};

export default Home;