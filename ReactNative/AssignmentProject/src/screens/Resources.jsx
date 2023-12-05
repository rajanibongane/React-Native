//imports
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../redux/slices/EmployeeSlice";
import { COLOR, PATHS } from "../shared/Constants";
import { globalStyles } from "../shared/GlobalStyle";

const Resources = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employee.allEmployees);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  const flatListData = employees
    ? employees.map((employee) => ({
        key: employee.empId,
        name: employee.name,
        breakfast: employee.meal ? employee.meal.breakfastCount : 0,
        lunch: employee.meal ? employee.meal.lunchCount : 0,
        total: employee.meal ? employee.meal.totalCost : 0,
      }))
    : [];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate(PATHS.CALENDAR, { empId: item.key });
      }}
    >
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.breakfast}</Text>
      <Text style={styles.text}>{item.lunch}</Text>
      <Text style={styles.text}>{item.total}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <Header
        title={PATHS.RESOURCES}
        leftIcon={require("../shared/assets/images/menu.png")}
        rightIcon={require("../shared/assets/images/plus.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        // onClickRightIcon={() => {
        //   navigation.navigate("Add");
        // }}
      />

      {/*All employees details*/}
      <View style={styles.table}>
        <FlatList
          data={flatListData}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.head}>
              <Text style={styles.text}>Name</Text>
              <Text style={styles.text}>Breakfast</Text>
              <Text style={styles.text}>Lunch</Text>
              <Text style={styles.text}>Total</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({
  table: {
    padding: 5,
  },
  head: {
    height: 50,
    backgroundColor: COLOR.lightOrange,
    borderColor: COLOR.orange,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    margin: 6,
    fontSize: 18,
  },
  row: {
    height: 45,
    flexDirection: "row",
    borderColor: COLOR.orange,
    backgroundColor: COLOR.white,
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
});
