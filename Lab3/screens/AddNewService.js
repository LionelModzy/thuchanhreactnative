import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useMyContextController } from "../store";

const AddNewService = ({ navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  const handleAdd = async () => {
    if (!name || !price) return;
    await firestore().collection("SERVICES").add({
      name,
      price: Number(price),
      creator: userLogin?.fullName || "",
      createdAt: new Date(),
      update: new Date(),
    });
    navigation.navigate("Services");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service name *</Text>
      <TextInput
        placeholder="Input a service name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.title}>Price *</Text>
      <TextInput
        placeholder="0"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" style={styles.button} onPress={handleAdd}>
        Add
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 16, marginTop: 20, marginBottom: 5 },
  input: { marginBottom: 10 },
  button: { marginTop: 30, backgroundColor: "#f06277" },
});

export default AddNewService;
