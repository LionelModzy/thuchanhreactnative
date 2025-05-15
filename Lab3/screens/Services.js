import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useMyContextController } from "../store";
import { Image, View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { launchImageLibrary } from 'react-native-image-picker';

const Services = ({ navigation, showProfileModal, setShowProfileModal }) => {
  const [services, setServices] = useState([]);
  const [controller, setController] = useMyContextController();
  const { userLogin } = controller;
  const [editProfile, setEditProfile] = useState({
    fullName: userLogin?.fullName || '',
    phone: userLogin?.phone || '',
    avatar: userLogin?.avatar || '',
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("SERVICES")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showProfileModal) {
      setEditProfile({
        fullName: userLogin?.fullName || '',
        phone: userLogin?.phone || '',
        avatar: userLogin?.avatar || '',
      });
    }
  }, [showProfileModal]);

  const handlePickAvatar = async () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      (response) => {
        if (response.didCancel) return;
        if (response.assets && response.assets[0].uri) {
          setEditProfile({ ...editProfile, avatar: response.assets[0].uri });
        }
      }
    );
  };

  const handleUpdateProfile = async () => {
    setUploading(true);
    try {
      await firestore()
        .collection('USERS')
        .doc(userLogin.email)
        .update({
          fullName: editProfile.fullName,
          phone: editProfile.phone,
          avatar: editProfile.avatar,
        });
      setController({
        ...controller,
        userLogin: {
          ...userLogin,
          ...editProfile,
        },
      });
      setShowProfileModal(false);
      Alert.alert('Success', 'Profile updated!');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
    setUploading(false);
  };

  return (
    <ScrollView>
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
      <Modal
        visible={showProfileModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProfileModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 320 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>User Info</Text>
            <TouchableOpacity onPress={handlePickAvatar} style={{ alignSelf: 'center' }}>
              {editProfile.avatar ? (
                <Image source={{ uri: editProfile.avatar }} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 12 }} />
              ) : (
                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#eee', marginBottom: 12, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Pick
Avatar</Text>
                </View>
              )}
            </TouchableOpacity>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Full Name"
              value={editProfile.fullName}
              onChangeText={text => setEditProfile({ ...editProfile, fullName: text })}
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Phone"
              value={editProfile.phone}
              onChangeText={text => setEditProfile({ ...editProfile, phone: text })}
              keyboardType="phone-pad"
            />
            <Button mode="contained" onPress={handleUpdateProfile} loading={uploading} style={{ marginBottom: 8 }}>
              Save
            </Button>
            <Button mode="outlined" onPress={() => setShowProfileModal(false)}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Services;
