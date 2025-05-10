import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const AddNewTransaction = ({ navigation }) => {
  const [customerName, setCustomerName] = useState("");
  const [service, setService] = useState("");

  const handleAdd = async () => {
    if (!customerName || !service) return;
    await firestore().collection("TRANSACTIONS").add({
      customerName,
      service,
      createdAt: new Date(),
      update: new Date(),
    });
    navigation.navigate("Transactions");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Name *</Text>
      <TextInput value={customerName} onChangeText={setCustomerName} style={styles.input} />
      <Text style={styles.title}>Service *</Text>
      <TextInput value={service} onChangeText={setService} style={styles.input} />
      <Button mode="contained" onPress={handleAdd} style={styles.button}>Add</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginTop: 20, marginBottom: 5 },
  input: { marginBottom: 10 },
  button: { marginTop: 30, backgroundColor: "#f06277" },
});

export default AddNewTransaction;
