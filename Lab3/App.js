// Lab3/Lab3App.js
import React, { useEffect } from 'react';
import { MyContextControllerProvider } from "./store";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import Router from './routers/Router';
import { LogBox } from 'react-native';

// Bỏ qua cảnh báo về timer
LogBox.ignoreLogs(['Setting a timer']);

const App = () => {
  const USERS = firestore().collection("USERS");
  const admin = {
    fullName: "thanh",
    email: "abc@gmail.com",
    password: "220703",
    phone: "0391111113",
    address: "Binh duong",
    role: "admin",
  };
  useEffect(() => {
    const checkAndCreateAdmin = async () => {
      try {
        const adminDoc = await USERS.doc(admin.email).get();
        const exists = typeof adminDoc.exists === "function" ? adminDoc.exists() : adminDoc.exists;
        if (!exists) {
          try {
            await auth().createUserWithEmailAndPassword(admin.email, admin.password);
            await USERS.doc(admin.email).set(admin);
          } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
              await USERS.doc(admin.email).set(admin);
            }
          }
        }
      } catch (err) {
        // Có thể log lỗi nếu muốn
      }
    };
    checkAndCreateAdmin();
  }, []);

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};

export default App;
