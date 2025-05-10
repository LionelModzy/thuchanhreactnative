import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const ServiceDetail = ({ navigation, route }) => {
  const { service } = route.params;
  const [detail, setDetail] = useState(service);

  useEffect(() => {
    if (service.id) {
      const unsubscribe = firestore()
        .collection("SERVICES")
        .doc(service.id)
        .onSnapshot(doc => {
          if (doc.exists) setDetail({ id: doc.id, ...doc.data() });
        });
      return () => unsubscribe();
    }
  }, [service.id]);

  const handleDelete = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to remove this service? This operation cannot be returned",
      [
        { text: "CANCEL", style: "cancel" },
        {
          text: "DELETE",
          style: "destructive",
          onPress: async () => {
            await firestore().collection("SERVICES").doc(detail.id).delete();
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service name: <Text style={styles.value}>{detail.name}</Text></Text>
      <Text style={styles.label}>Price: <Text style={styles.value}>{detail.price?.toLocaleString()} đ</Text></Text>
      <Text style={styles.label}>Creator: <Text style={styles.value}>{detail.creator}</Text></Text>
      <Text style={styles.label}>Time: <Text style={styles.value}>{detail.createdAt ? new Date(detail.createdAt.seconds * 1000).toLocaleString() : ""}</Text></Text>
      <Text style={styles.label}>Final update: <Text style={styles.value}>{detail.update ? new Date(detail.update.seconds * 1000).toLocaleString() : ""}</Text></Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("EditService", { service: detail })}
          style={styles.editButton}
        >
          Edit
        </Button>
        <Button
          mode="contained"
          onPress={handleDelete}
          style={styles.deleteButton}
        >
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { fontWeight: "normal" },
  buttonContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  editButton: {
    backgroundColor: "#4caf50", // xanh lá
    width: 120
  },
  deleteButton: {
    backgroundColor: "#f44336", // đỏ
    width: 120
  }
});

export default ServiceDetail;
