//imports
import { Modal, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { COLOR } from "../shared/Constants";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    isLoading && (
      <View>
        <Modal transparent={true} animationType="slide" visible={isLoading}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color={COLOR.black} />
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
