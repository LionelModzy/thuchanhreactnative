import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useMyContextController } from "../store";
import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const Services = ({ navigation }) => {
  const [services, setServices] = useState([]);
  // const [controller] = useMyContextController();
  // const { userLogin } = controller;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("SERVICES")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView>
      {/* Đã xóa dòng hiển thị tên user màu hồng ở đây */}
      <View style={{ flex: 1 }}>
        <Image
          source={require("../asset/logo.jpg")}
          style={{ alignSelf: "center", marginVertical: 50 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            Danh sách dịch vụ
          </Text>
          <IconButton
            icon="plus-circle"
            iconColor="red"
            size={40}
            onPress={() => navigation.navigate("AddNewService")}
          />
        </View>
        {services.map(service => (
          <TouchableOpacity
            key={service.id}
            style={{ backgroundColor: "#fff", margin: 8, borderRadius: 10, padding: 12, elevation: 2 }}
            onPress={() => navigation.navigate("ServiceDetail", { service })}
          >
            <Text style={{ fontWeight: "bold" }}>{service.name}</Text>
            <Text>{service.price.toLocaleString()} đ</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Services;
