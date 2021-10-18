import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerDashboard from "./owner-screens/OwnerDashboard";
import AddProperty from "./owner-screens/AddProperty";

const Stack = createNativeStackNavigator();

const OwnerStack = ({ currentUser, jwtToken }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="Home" option={{ title: "Home" }}>
        {(props) => (
          <OwnerDashboard
            {...props}
            userData={currentUser}
            jwtToken={jwtToken}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AddProperty"
        option={{ title: "AddProperty" }}
        component={AddProperty}
      />
    </Stack.Navigator>
  );
};

export default OwnerStack;