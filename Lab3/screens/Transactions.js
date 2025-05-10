import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const Transactions = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("TRANSACTIONS")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Danh sách cuộc hẹn</Text>
        <IconButton
          icon="plus-circle"
          iconColor="red"
          size={32}
          onPress={() => navigation.navigate("AddNewTransaction")}
        />
      </View>
      {transactions.map(tx => (
        <TouchableOpacity
          key={tx.id}
          style={{ backgroundColor: "#fff", padding: 12, marginVertical: 6, borderRadius: 8 }}
          onPress={() => navigation.navigate("TransactionDetail", { transaction: tx })}
        >
          <Text style={{ fontWeight: "bold" }}>{tx.customerName}</Text>
          <Text>Service: {tx.service}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Transactions;
