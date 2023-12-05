//imports
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../redux/slices/EmployeeSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SessionService from "../shared/SessionService";
import Header from "../components/Header";
import { globalStyles } from "../shared/GlobalStyle";
import { COLOR, PATHS } from "../shared/Constants";

const ProfileScreen = () => {
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
    <>
      <View style={globalStyles.container}>
        <Header
          title={PATHS.PROFILE}
          leftIcon={require("../shared/assets/images/menu.png")}
          onClickLeftIcon={() => {
            navigation.openDrawer();
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{employee.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email ID:</Text>
          <Text style={styles.text}>{employee.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Employee ID:</Text>
          <Text style={styles.text}>{employee.empId}</Text>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  infoContainer: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    color: COLOR.gray,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: COLOR.black,
  },
});
