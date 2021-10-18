import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./registration-login/LoginScreen";
import AccountTypeScreen from "./registration-login/AccountTypeScreen";
import RegistrationFormScreen from "./registration-login/RegistrationFormScreen";
import ConfirmPhoneNumberScreen from "./registration-login/ConfirmPhoneNumberScreen";
import UploadOwnerDocumentsScreen from "./registration-login/UploadOwnerDocumentsScreen";

const Stack = createNativeStackNavigator();

export default function NotLoggedInStack ({ setJwtToken }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name='Login' option={{ title: "Login" }}>
        {(props) => <LoginScreen {...props} setJwtToken={setJwtToken} />}
      </Stack.Screen>
      <Stack.Screen
        name='Registration'
        option={{ title: "Account Type" }}
        component={AccountTypeScreen}
      />
      <Stack.Screen
        name='Registration Form'
        option={{ title: "Registration Form" }}
        component={RegistrationFormScreen}
      />
      <Stack.Screen
        name='Confirm Phone Number'
        option={{ title: "Confirm Phone Number" }}
        component={ConfirmPhoneNumberScreen}
      />
      <Stack.Screen
        name='Upload Documents'
        option={{ title: "Upload Documents" }}
        component={UploadOwnerDocumentsScreen}
      />
    </Stack.Navigator>
  );
};
