import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";

const EditService = ({ navigation, route }) => {
  const { service } = route.params;
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price.toString());
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !price) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const updatedService = {
        name,
        price: parseInt(price),
        update: firestore.FieldValue.serverTimestamp(),
      };
      await firestore().collection("SERVICES").doc(service.id).update(updatedService);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update service");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service name *</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <Text style={styles.title}>Price *</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />
      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={handleUpdate}
        loading={loading}
        disabled={loading}
      >
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 16, marginTop: 20, marginBottom: 5 },
  input: { marginBottom: 10, backgroundColor: 'white' },
  button: { marginTop: 30, backgroundColor: "#f06277" },
});

export default EditService;