//imports
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { CheckBox } from "react-native-elements";
import { postEmployeeMenu } from "../redux/slices/MenuSlice";
import { getMenus } from "../redux/slices/MenuSlice";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal";
import { globalStyles } from "../shared/GlobalStyle";
import { COLOR } from "../shared/Constants";

const MealFormScreen = ({ menus }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const dispatch = useDispatch();

  const initialValues = {
    breakfast: menus && menus.map((menu) => menu.dishName.Breakfast === ""),
    lunch: menus && menus.map((menu) => menu.dishName.Lunch === ""),
  };

  const timeLimit = () => {
    const currentHours = currentTime.getHours();
    return currentHours < 11;
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(date) < yesterday;
  };

  const addEmployeeMenu = async (values) => {
    const resp = await dispatch(postEmployeeMenu(values));
    if (resp.payload.success) {
      Alert.alert(resp.payload.message);
    } else {
      Alert.alert("Error while adding menu.");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const selectedDates = {
        breakfast: [],
        lunch: [],
      };

      menus.forEach((menu, index) => {
        if (values.breakfast[index]) {
          selectedDates.breakfast.push(menu.date.slice(0, 10));
        }
        if (values.lunch[index]) {
          selectedDates.lunch.push(menu.date.slice(0, 10));
        }
      });
      addEmployeeMenu(selectedDates);
    },
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getMenus());
  }, []);

  return (
    <View>
      <View>
        {menus &&
          menus.map((menu, index) => (
            <View style={styles.home} key={menu._id}>
              <View>
                <Text style={styles.text}>
                  {menu.day}
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal(!showModal);
                        setSelectedMenuItem(menu);
                      }}
                    >
                      <Image
                        source={require("../shared/assets/images/danger.png")}
                        style={styles.info}
                      />
                    </TouchableOpacity>
                  </View>
                </Text>
                <Text>{new Date(menu.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.Checkbox}>
                <CheckBox
                  checked={formik.values.breakfast[index]}
                  disabled={!timeLimit() || isYesterday(menu.date)}
                  onPress={() =>
                    formik.setFieldValue(
                      `breakfast[${index}]`,
                      !formik.values.breakfast[index]
                    )
                  }
                />
              </View>
              <View style={styles.Checkbox}>
                <CheckBox
                  checked={formik.values.lunch[index]}
                  disabled={!timeLimit() || isYesterday(menu.date)}
                  onPress={() =>
                    formik.setFieldValue(
                      `lunch[${index}]`,
                      !formik.values.lunch[index]
                    )
                  }
                />
              </View>
            </View>
          ))}
        <View style={styles.home}>
          <Pressable style={globalStyles.button} onPress={formik.handleSubmit}>
            <Text style={globalStyles.buttonText}>Book Meal</Text>
          </Pressable>
        </View>
      </View>

      {showModal && selectedMenuItem && (
        <Modal isVisible={showModal} transparent={true} animationType="slide">
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={toggleModal}
          >
            <TouchableOpacity
              style={styles.modalContent}
              activeOpacity={1}
              onPress={toggleModal}
            >
              <Text style={styles.breakfastLunchText}>
                Breakfast: {selectedMenuItem.dishName?.Breakfast}
              </Text>
              <Text style={styles.breakfastLunchText}>
                Lunch: {selectedMenuItem.dishName?.Lunch}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default MealFormScreen;

const styles = StyleSheet.create({
  info: {
    height: 15,
    width: 15,
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
    marginTop: 30,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLOR.white,
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignSelf: "center",
  },
  breakfastLunchText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});
