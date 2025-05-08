import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";

const EditService = ({ navigation, route }) => {
  const { service } = route.params;
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price.toString());

  const handleUpdate = () => {
    // TODO: Cập nhật dịch vụ
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service name *</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.title}>Price *</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" style={styles.button} onPress={handleUpdate}>
        Update
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

export default EditService; 