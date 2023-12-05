import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { COLOR, PATHS } from "../shared/Constants";
import ProfileScreen from "../screens/ProfileScreen";
import LogoutScreen from "../screens/LogoutScreen";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SessionService from "../shared/SessionService";
import { getEmployee } from "../redux/slices/EmployeeSlice";
import { useDispatch, useSelector } from "react-redux";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.emp);

  useFocusEffect(
    React.useCallback(() => {
      const getUserData = async () => {
        try {
          const userData = await SessionService.getUser();
          if (userData) {
            await dispatch(getEmployee(userData));
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      getUserData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground style={styles.imageBackground}>
          <Image
            source={require("../shared/assets/images/user.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{employee.name}</Text>
          <View>
            <Text style={styles.profileInfo}>{employee.empId}</Text>
          </View>
          <View>
            <Text style={styles.profileInfo}>{employee.email}</Text>
          </View>
        </ImageBackground>
        <View style={styles.drawerItems}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(PATHS.PROFILE);
          }}
        >
          <View style={styles.bottomTabs}>
            <Text style={styles.tabText}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(PATHS.LOGOUT)}>
          <View style={styles.bottomTabs}>
            <Text style={styles.tabText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  imageBackground: {
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: COLOR.black,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginLeft: 10,
  },
  profileName: {
    marginLeft: 20,
    color: COLOR.black,
    fontSize: 18,
    marginBottom: 5,
  },
  profileInfo: {
    marginLeft: 20,
    marginBottom: 5,
    color: COLOR.black,
    marginRight: 5,
  },
  drawerItems: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingTop: 10,
    minHeight: 550,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.black,
  },
  bottomTabs: {
    marginBottom: 30,
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
});
