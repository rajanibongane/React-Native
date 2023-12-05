import { StyleSheet } from "react-native";
import { COLOR } from "./Constants";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLOR.white ,
      },
    button: {
        backgroundColor: COLOR.lightOrange,
        width: "justifyContent",
        height: 50,
        borderColor:COLOR.orange,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 50,
        padding:10,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      },
      buttonText: {
        fontSize: 20,
        color: COLOR.white,
      },
      title: {
        color: "#030303",
        fontSize: 20,
        marginTop: 10,
      },
      icon: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        marginTop:5
      },
    
})