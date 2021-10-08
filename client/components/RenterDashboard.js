// renter dashboard .js

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "../styles/RenterDashboard.styles";


export const Home = props => { 
    return (
        <View style = {styles.homecontainer}>
            <Text style = {styles.hometext}> Home </Text>
        </View>
    );
}

export const payRent = props => {
    return (
        <View style = {styles.payRentContainer}>
            <TextInput style = {styles.payRentText}> </TextInput>
            <Button title = 'Pay rent' />
        </View>
    );
}

export const reportIssue = props => {
    return (
        <View style = {styles.reportIssueContainer}>
            <TextInput style = {styles.reportIssueText}> </TextInput>
            <Button title = 'Report issue' />
        </View>
    );
}

export const dueToday = props => {
    return (
        <View style = {styles.dueTodayContainer}>
            <Text style = {styles.dueTodayText}> Due Today </Text>
        </View>
    );
}
