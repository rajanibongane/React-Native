//imports
import { Alert } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { userLogout } from "../redux/slices/LoginSlice";
import { ALERT_MESSAGE, PATHS } from "../shared/Constants";

const LogoutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    try {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "No",
            style: "cancel",
            onPress: () => {
              navigation.navigate(PATHS.HOME);
            },
          },
          {
            text: "Yes",
            onPress: async () => {
              const response = dispatch(userLogout());
              if (response) {
                navigation.navigate(PATHS.SIGNIN);
              } else {
                Alert.alert(ALERT_MESSAGE.logoutFailed);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(ALERT_MESSAGE.logoutFailed);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default LogoutScreen;
