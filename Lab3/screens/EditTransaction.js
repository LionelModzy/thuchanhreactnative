import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const EditTransaction = ({ navigation, route }) => {
  const { transaction } = route.params;
  const [customerName, setCustomerName] = useState(transaction.customerName);
  const [service, setService] = useState(transaction.service);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!customerName || !service) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await firestore().collection("TRANSACTIONS").doc(transaction.id).update({
        customerName,
        service,
        update: firestore.FieldValue.serverTimestamp(),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Name</Text>
      <TextInput value={customerName} onChangeText={setCustomerName} style={styles.input} />
      <Text style={styles.title}>Service</Text>
      <TextInput value={service} onChangeText={setService} style={styles.input} />
      <Button mode="contained" onPress={handleUpdate} style={styles.button} loading={loading} disabled={loading}>
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginTop: 20 },
  input: { backgroundColor: "white", marginBottom: 10 },
  button: { marginTop: 30, backgroundColor: "#f06277" },
});

export default EditTransaction;
