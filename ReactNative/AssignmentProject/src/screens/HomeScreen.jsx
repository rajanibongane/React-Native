//imports
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyMealEmployee } from "../redux/slices/EmployeeSlice";
import { getMenus } from "../redux/slices/MenuSlice";
import { useFocusEffect } from "@react-navigation/native";
import SessionService from "../shared/SessionService";
import CustomDropdown from "./CustomDropdown";
import { globalStyles } from "../shared/GlobalStyle";
import { PATHS } from "../shared/Constants";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menus.getWeeklyMenu);

  const employees = useSelector((state) => state.employee.mealEmployee);
  const lunchCount = employees.meal?.lunchCount;
  const breakFastCount = employees.meal?.breakfastCount;
  const totalCost = employees.meal?.totalCost;

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber - 1];
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const [selectedOption, setSelectedOption] = useState("Select Month");
  const options = [getMonthName(currentMonth - 1), getMonthName(currentMonth)];

  const onSelectOption = async (option) => {
    let newCurrentMonth = currentMonth;
    let newCurrentYear = currentYear;

    if (option === getMonthName(currentMonth - 1)) {
      newCurrentYear = currentYear;
      newCurrentMonth = currentMonth - 1;
    } else if (option === getMonthName(currentMonth)) {
      newCurrentYear = currentYear;
      newCurrentMonth = currentMonth;
    }

    try {
      const userData = await SessionService.getUser();
      const empId = userData.empId;
      await dispatch(
        getMonthlyMealEmployee({
          empId,
          currentMonth: newCurrentMonth,
          currentYear: newCurrentYear,
        })
      );
      setSelectedOption(option);
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const getUserData = async () => {
        try {
          const userData = await SessionService.getUser();
          if (userData) {
            const empId = userData.empId;
            dispatch(
              getMonthlyMealEmployee({ empId, currentMonth, currentYear })
            );
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      dispatch(getMenus());
      getUserData();
    }, [])
  );

  return (
    <View style={globalStyles.container}>
      <View>
        <Header
          title={PATHS.HOME}
          leftIcon={require("../shared/assets/images/menu.png")}
          rightIcon={require("../shared/assets/images/calendar.png")}
          onClickLeftIcon={() => {
            navigation.openDrawer();
          }}
          onClickRightIcon={() => {
            navigation.navigate(PATHS.CALENDAR);
          }}
        />
      </View>

      {/*Monthly filter dropdown*/}
      <View style={styles.dropdownContainer}>
        <CustomDropdown
          options={options}
          selectedOption={selectedOption}
          onSelect={onSelectOption}
          dropdownStyle={styles.dropdown}
        />
      </View>

      {/*Coupons Details*/}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Breakfast</Text>
          <Text style={styles.infoValue}>
            {breakFastCount ? breakFastCount : 0}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Lunch</Text>
          <Text style={styles.infoValue}>{lunchCount ? lunchCount : 0}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Total Cost</Text>
          <Text style={styles.infoValue}>{totalCost ? totalCost : 0}</Text>
        </View>
      </View>

      {/*Calendar view button*/}
      <View style={styles.home}>
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            navigation.navigate(PATHS.CALENDAR);
          }}
        >
          <Text style={globalStyles.buttonText}>Coupons View</Text>
        </Pressable>
      </View>

      {/*Weekly menu*/}
      <View style={styles.mealBox}>
        <Text style={styles.infoLabel}>Weekly Menu</Text>
        <FlatList
          data={menus}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.mealBoxItem}>
              <Text style={styles.infoLabel}>{item.day}</Text>
              <View>
                <Text style={styles.infoText}>
                  Breakfast:{item.dishName?.Breakfast}
                </Text>
                <Text style={styles.infoText}>
                  Lunch:{item.dishName?.Lunch}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/*Instruction details*/}
      <View>
        <Text style={styles.infoLabel}>Instruction :</Text>
        <Text style={styles.infoText}>
          - The breakfast costs 20 rupees per day, and if you have it twice, the
          price doubles.
        </Text>
        <Text style={styles.infoText}>
          - The Lunch costs 60 rupees per day.
        </Text>
        <Text style={styles.infoText}>
          - Please select your coupons before 11AM.
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  home: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  dropdownContainer: {
    marginBottom: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "50%",
    backgroundColor: "white",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItem: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  infoValue: {
    fontSize: 24,
    marginLeft: 5,
  },
  mealBox: {
    paddingBottom: 30,
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  mealBoxItem: {
    backgroundColor: "#EFEFEF",
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 5,
  },
});
