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
    email: "thanh@gmail.com",
    password: "220703",
    phone: "0391111113",
    address: "Binh duong",
    role: "admin",
  };

  useEffect(() => {
    const checkAndCreateAdmin = async () => {
      try {
        console.log("🔍 Checking admin account...");
        
        // Kiểm tra trong Firestore
        const adminDoc = await USERS.doc(admin.email).get();
        console.log("📄 Firestore check result:", adminDoc.exists ? "exists" : "not exists");
        
        if (!adminDoc.exists) {
          try {
            // Tạo user trong Authentication
            console.log("👤 Creating admin in Auth...");
            const userCredential = await auth().createUserWithEmailAndPassword(admin.email, admin.password);
            console.log("✅ Admin account created in Auth:", userCredential.user.uid);
            
            // Tạo document trong Firestore
            console.log("📝 Saving admin data to Firestore...");
            await USERS.doc(admin.email).set({
              ...admin,
              uid: userCredential.user.uid,
              createdAt: firestore.FieldValue.serverTimestamp()
            });
            console.log("✅ Admin data saved to Firestore");
          } catch (e) {
            console.error("❌ Error creating admin:", e.code, e.message);
            if (e.code === 'auth/email-already-in-use') {
              console.log("⚠️ Admin already exists in Auth");
              // Nếu user đã tồn tại trong Auth nhưng chưa có trong Firestore
              try {
                await USERS.doc(admin.email).set({
                  ...admin,
                  createdAt: firestore.FieldValue.serverTimestamp()
                });
                console.log("✅ Admin data saved to Firestore");
              } catch (firestoreError) {
                console.error("❌ Error saving to Firestore:", firestoreError);
              }
            }
          }
        } else {
          console.log("ℹ️ Admin document already exists in Firestore");
        }
      } catch (err) {
        console.error("❌ Firestore error:", err.code, err.message);
      }
    };

    checkAndCreateAdmin();
  }, []);

  // ✅ PHẢI CÓ RETURN DƯỚI ĐÂY
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};


export default App;