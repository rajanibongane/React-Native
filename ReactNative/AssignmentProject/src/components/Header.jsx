//imports
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React from "react";
import { COLOR } from "../shared/Constants";
import { globalStyles } from "../shared/GlobalStyle";

const { width } = Dimensions.get("window");
const Header = (props) => {
  const { title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon } =
    props;

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          onClickLeftIcon && onClickLeftIcon();
        }}
      >
        <Image source={leftIcon} style={globalStyles.icon} />
      </TouchableOpacity>
      <Text style={globalStyles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          onClickRightIcon && onClickRightIcon();
        }}
      >
        <Image source={rightIcon} style={globalStyles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 80,
    borderBottomColor: COLOR.gray,
    borderBottomWidth: 1,
    backgroundColor: COLOR.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 30,
  },
});
