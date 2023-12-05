//imports
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOR, PATHS } from "../shared/Constants";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../redux/slices/EmployeeSlice";
import { globalStyles } from "../shared/GlobalStyle";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const empId = route.params?.empId;
  const employees = useSelector((state) => state.employee.emp);

  const lunchDates = employees.meal?.lunch || [];
  const breakfastDates = employees.meal?.breakfast || [];
  const items = {};

  lunchDates.forEach((date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    items[formattedDate] = [{ text: "Lunch" }];
  });

  breakfastDates.forEach((date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    if (items[formattedDate]) {
      items[formattedDate].push({ text: "Breakfast" });
    } else {
      items[formattedDate] = [{ text: "Breakfast" }];
    }
  });

  useEffect(() => {
    if (empId) {
      dispatch(getEmployee({ empId }));
    }
  }, [empId, dispatch]);

  return (
    <View style={globalStyles.container}>
      <Header
        title={PATHS.CALENDAR}
        leftIcon={require("../shared/assets/images/menu.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <Agenda
        items={items}
        renderItem={(item) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
          </View>
        )}
        renderEmptyData={() => (
          <View style={styles.item}>
            <Text>Coupons Not Taken</Text>
          </View>
        )}
        theme={{
          selectedDateBa: COLOR.white,
          selectedDayTextColor: COLOR.white,
          selectedDayBackgroundColor: COLOR.lightOrange,
        }}
      />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLOR.white,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
