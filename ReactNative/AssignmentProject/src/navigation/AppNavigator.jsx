//imports
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import SignInScreen from "../screens/SignInScreen";
import { PATHS } from "../shared/Constants";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={PATHS.SIGNIN}
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PATHS.DRAWER}
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
