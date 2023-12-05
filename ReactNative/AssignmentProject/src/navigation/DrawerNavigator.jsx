//imports
import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";
import CalendarScreen from "../screens/CalendarScreen";
import Resources from "../screens/Resources";
import { COLOR, PATHS } from "../shared/Constants";
import LogoutScreen from "../screens/LogoutScreen";
import { useEffect } from "react";
import SessionService from "../shared/SessionService";
import ProfileScreen from "../screens/ProfileScreen";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userData = await SessionService.getUser();
        if (userData) {
          const role = userData.role;
          setRole(role);
        }
      } catch {
        console.log("Error");
      }
    };
    getUserRole();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: "false",
        drawerActiveBackgroundColor: COLOR.lightOrange,
        drawerActiveTintColor: COLOR.white,
      }}
    >
      <Drawer.Screen
        name={PATHS.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={PATHS.MENU}
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={PATHS.CALENDAR}
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      {role === "Admin" && (
        <Drawer.Screen
          name={PATHS.RESOURCES}
          component={Resources}
          options={{ headerShown: false }}
        />
      )}
      <Drawer.Screen
        name={PATHS.PROFILE}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={PATHS.LOGOUT}
        component={LogoutScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
