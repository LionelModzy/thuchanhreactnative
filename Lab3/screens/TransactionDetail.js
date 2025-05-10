import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const TransactionDetail = ({ navigation, route }) => {
  const { transaction } = route.params;
  const [detail, setDetail] = useState(transaction);

  useEffect(() => {
    if (!transaction?.id) return;
  
    const unsubscribe = firestore()
      .collection("TRANSACTIONS") // Gọi đúng như hàm
      .doc(transaction.id) // Gọi đúng như hàm
      .onSnapshot(doc => {
        if (doc.exists) {
          setDetail({ id: doc.id, ...doc.data() });
        } else {
          // Đảm bảo Alert được gọi sau khi UI đã cập nhật
          setTimeout(() => {
            Alert.alert("Warning", "This transaction no longer exists.");
            navigation.goBack();
          }, 0);
        }
      });
  
    return () => unsubscribe();
  }, [transaction?.id]);
  
  

  const handleDelete = () => {
    Alert.alert("Warning", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
            try {
              await firestore().collection("TRANSACTIONS").doc(detail.id).delete();
              setTimeout(() => {
                navigation.goBack();
              }, 200); // chờ 200ms để tránh crash Alert
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          }
          
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer: <Text style={styles.value}>{detail.customerName}</Text></Text>
      <Text style={styles.label}>Service: <Text style={styles.value}>{detail.service}</Text></Text>
      <Text style={styles.label}>Created At: <Text style={styles.value}>{detail.createdAt?.toDate().toLocaleString()}</Text></Text>
      <Text style={styles.label}>Last Updated: <Text style={styles.value}>{detail.update?.toDate().toLocaleString()}</Text></Text>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate("EditTransaction", { transaction: detail })} style={styles.editButton}>
          Edit
        </Button>
        <Button onPress={handleDelete} style={styles.deleteButton}>Delete</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { fontWeight: "normal" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around", marginTop: 40 },
  editButton: { backgroundColor: "#4caf50", width: 120 },
  deleteButton: { backgroundColor: "#f44336", width: 120 },
});

export default TransactionDetail;
