//imports
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import user from "../shared/assets/images/user.png";
import { loginAccount } from "../redux/slices/LoginSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { globalStyles } from "../shared/GlobalStyle";
import { ALERT_MESSAGE, COLOR, ERROR_STATUS, PATHS } from "../shared/Constants";

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(ERROR_STATUS.password),
    password: Yup.string().required(ERROR_STATUS.password),
  });

  const handleSignIn = async (values) => {
    try {
      const response = await dispatch(
        loginAccount({
          email: values.username,
          password: values.password,
        })
      );
      if (response.payload.success) {
        navigation.navigate(PATHS.DRAWER);
      } else {
        Alert.alert(ALERT_MESSAGE.loginInvalid);
      }
    } catch (error) {
      Alert.alert(ALERT_MESSAGE.loginFailed);
    }
  };
  const onSubmit = (values) => {
    handleSignIn(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <Image source={user} style={styles.logo} resizeMode="contain" />
      <View>
        {/*Username input field*/}
        <TextInput
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          style={styles.input}
          placeholder="Enter username"
        />
        {formik.touched.username && formik.errors.username ? (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        ) : null}

        {/*Password input field*/}
        <TextInput
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
        />
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        ) : null}
      </View>

      {/*Signin button*/}
      <View>
        <Pressable onPress={formik.handleSubmit} style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 150,
  },
  logo: {
    width: "70%",
    maxWidth: 100,
    maxHeight: 100,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 35,
    marginBottom: 40,
  },
  errorText: {
    fontSize: 14,
    color: COLOR.red,
    marginTop: 0,
  },
  input: {
    backgroundColor: COLOR.white,
    width: 250,
    height: 40,
    borderColor: COLOR.black,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
