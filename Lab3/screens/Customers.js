import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("USERS")
      .where("role", "==", "customer")
      .onSnapshot(snapshot => {
        setCustomers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView>
      {customers.map(cus => (
        <TouchableOpacity key={cus.id} style={{ margin: 10, padding: 10, backgroundColor: "#fff", borderRadius: 8 }}>
          <Text>{cus.fullName}</Text>
          <Text>{cus.email}</Text>
          {/* Thêm nút Update nếu muốn */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Customers; 