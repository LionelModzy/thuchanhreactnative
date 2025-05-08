import { View, StyleSheet, Alert } from "react-native";
import { Text, Button } from "react-native-paper";

const ServiceDetail = ({ navigation, route }) => {
  // TODO: Lấy dữ liệu dịch vụ từ route.params hoặc store
  const service = route?.params?.service || {
    name: "Chăm sóc da mặt và dưỡng ẩm tự nhiên",
    price: 250000,
    creator: "Hung",
    time: "12/03/2023 22:56:59",
    update: "12/03/2023 22:56:59",
  };

  const handleDelete = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to remove this service? This operation cannot be returned",
      [
        { text: "CANCEL", style: "cancel" },
        { text: "DELETE", style: "destructive", onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service name: <Text style={styles.value}>{service.name}</Text></Text>
      <Text style={styles.label}>Price: <Text style={styles.value}>{service.price.toLocaleString()} đ</Text></Text>
      <Text style={styles.label}>Creator: <Text style={styles.value}>{service.creator}</Text></Text>
      <Text style={styles.label}>Time: <Text style={styles.value}>{service.time}</Text></Text>
      <Text style={styles.label}>Final update: <Text style={styles.value}>{service.update}</Text></Text>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("EditService", { service })}>
        Edit
      </Button>
      <Button mode="outlined" style={styles.button} onPress={handleDelete}>
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { fontWeight: "normal" },
  button: { marginTop: 20 },
});

export default ServiceDetail;
