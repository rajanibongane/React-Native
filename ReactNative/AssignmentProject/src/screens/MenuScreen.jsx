//imports
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { getMenus, postMenu } from "../redux/slices/MenuSlice";
import MealFormScreen from "./MealFormScreen";
import SessionService from "../shared/SessionService";
import { globalStyles } from "../shared/GlobalStyle";
import { COLOR, PATHS } from "../shared/Constants";

const MenuScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menus.getWeeklyMenu);

  const [show, setShow] = useState(false);
  const [role, setRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);

  const initialValues = {
    rows: [
      { date: "", breakfast: "", lunch: "", day: "" },
      { date: "", breakfast: "", lunch: "", day: "" },
      { date: "", breakfast: "", lunch: "", day: "" },
      { date: "", breakfast: "", lunch: "", day: "" },
      { date: "", breakfast: "", lunch: "", day: "" },
    ],
  };

  const addMenu = async (values) => {
    const data = convertData(values.rows);
    await dispatch(postMenu(data));
    formik.resetForm();
  };

  function convertData(originalData) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return originalData.map((item) => {
      const { date, breakfast, lunch } = item;

      const formattedDate = new Date(date);
      const dayOfWeek = daysOfWeek[formattedDate.getDay()];

      return {
        day: dayOfWeek,
        dishName: {
          Breakfast: breakfast,
          Lunch: lunch,
        },
        date: date,
      };
    });
  }

  const onSubmit = (values) => {
    addMenu(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleInputChange = (rowIndex, fieldName, value) => {
    if (fieldName === "date") {
      const selectedDate = new Date(value);
      const dayOfWeek = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      formik.setFieldValue(`rows[${rowIndex}].day`, dayOfWeek);
      formik.setFieldValue(`rows[${rowIndex}].${fieldName}`, value);
    } else if (fieldName === "breakfast" || fieldName === "lunch") {
      formik.setFieldValue(`rows[${rowIndex}].${fieldName}`, value);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateInputPress = (index) => {
    setShowDatePicker(true);
    setSelectedDateIndex(index);
  };

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
    dispatch(getMenus());
  }, []);

  return (
    <View style={globalStyles.container}>
      <Header
        title={PATHS.MENU}
        leftIcon={require("../shared/assets/images/menu.png")}
        rightIcon={require("../shared/assets/images/calendar.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        onClickRightIcon={() => {
          navigation.navigate(PATHS.CALENDAR);
        }}
      />
      <View>
        <View>
          <View style={styles.home}>
            <Text style={styles.text}>
              <View>
                {role === "Admin" ? (
                  <TouchableOpacity
                    onPress={() => {
                      setShow(!show);
                    }}
                  >
                    <Image
                      source={require("../shared/assets/images/food.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={require("../shared/assets/images/food.png")}
                    style={styles.icon}
                  />
                )}
              </View>
            </Text>
            <Text style={styles.text}>BreakFast</Text>
            <Text style={styles.text}>Lunch</Text>
          </View>

          {/*Add menu input fields */}
          <View>
            {!show ? (
              <MealFormScreen menus={menus} />
            ) : (
              <View>
                {formik.values.rows.map((row, index) => (
                  <View style={styles.home} key={index}>
                    <Pressable onPress={() => handleDateInputPress(index)}>
                      <TextInput
                        placeholder="Date"
                        value={row.date}
                        style={styles.input}
                        onChangeText={(value) =>
                          handleInputChange(index, "date", value)
                        }
                      />
                    </Pressable>

                    <TextInput
                      placeholder="Breakfast"
                      value={row.breakfast}
                      style={styles.input}
                      onChangeText={(value) =>
                        handleInputChange(index, "breakfast", value)
                      }
                    />

                    <TextInput
                      placeholder="Lunch"
                      value={row.lunch}
                      style={styles.input}
                      onChangeText={(value) =>
                        handleInputChange(index, "lunch", value)
                      }
                    />
                  </View>
                ))}

                {/*Add menu button*/}
                <View style={styles.home}>
                  <Pressable
                    style={globalStyles.button}
                    onPress={formik.handleSubmit}
                  >
                    <Text style={globalStyles.buttonText}>Add Menu</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

      {/*Date picker calendar*/}
      {showDatePicker && selectedDateIndex !== null && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);

            if (date) {
              handleDateChange(date);

              const dateStr = date.toISOString().split("T")[0];
              handleInputChange(selectedDateIndex, "date", dateStr);
            }
          }}
        />
      )}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
  },
  home: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 20,
    marginTop: 40,
  },
  Checkbox: {
    marginTop: 27,
    marginRight: 20,
  },
  input: {
    backgroundColor: COLOR.white,
    width: 120,
    height: 40,
    borderColor: COLOR.black,
    marginTop: 35,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
