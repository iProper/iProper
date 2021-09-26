import { StatusBar } from "expo-status-bar";
import React from "react";
import { LoginScreen } from "./components/LoginScreen";
import { AccountTypeScreen } from "./components/RegistrationScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import styles from "./styles/App.styles";

const Stack = createNativeStackNavigator();

const RegistrationScreen = AccountTypeScreen;

export default function App() {
  return (
    <View style={[styles.App]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            option={{ title: "Login" }}
          ></Stack.Screen>
          <Stack.Screen
            name='Registration'
            component={RegistrationScreen}
            option={{ title: "Registration" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style='auto' />
    </View>
  );
}
