import { StatusBar } from "expo-status-bar";
import React from "react";
import { LoginScreen } from "./components/LoginScreen";
import { AccountTypeScreen } from "./components/RegistrationScreens";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RegistrationScreen = AccountTypeScreen;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          option={{ title: "Login" }}
        ></Stack.Screen>
        <Stack.Screen
          name='Registration'
          component={AccountTypeScreen}
          option={{ title: "Registration" }}
        ></Stack.Screen>
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
