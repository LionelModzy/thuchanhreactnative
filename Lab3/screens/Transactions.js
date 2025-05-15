import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

const Transactions = () => {
  const [appointments, setAppointments] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editDate, setEditDate] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('APPOINTMENTS')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, []);

  const handleAccept = async (item) => {
    await firestore().collection('APPOINTMENTS').doc(item.id).update({
      status: 'accepted'
    });
    Alert.alert('Thành công', 'Đã duyệt lịch hẹn!');
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditStatus(item.status || '');
    setEditNotes(item.notes || '');
    setEditDate(item.date || '');
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    await firestore().collection('APPOINTMENTS').doc(editItem.id).update({
      status: editStatus,
      notes: editNotes,
      date: editDate
    });
    setEditModal(false);
    setEditItem(null);
    Alert.alert('Thành công', 'Cập nhật thành công!');
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 12 }}>Danh sách lịch hẹn</Text>
      {appointments.map(app => (
        <View
          key={app.id}
          style={{ backgroundColor: "#fff", padding: 12, marginVertical: 6, borderRadius: 8 }}
        >
          <Text style={{ fontWeight: "bold" }}>{app.customerName} ({app.customerEmail})</Text>
          <Text>Dịch vụ: {app.service}</Text>
          <Text>Ngày: {app.date}</Text>
          <Text>Ghi chú: {app.notes}</Text>
          <Text>Trạng thái: {app.status}</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <TouchableOpacity
              style={{ backgroundColor: "#4CAF50", borderRadius: 6, padding: 6, marginRight: 8 }}
              onPress={() => handleAccept(app)}
            >
              <Text style={{ color: "#fff" }}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#2196F3", borderRadius: 6, padding: 6 }}
              onPress={() => handleEdit(app)}
            >
              <Text style={{ color: "#fff" }}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Modal
        visible={editModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 320 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Cập nhật lịch hẹn</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Trạng thái"
              value={editStatus}
              onChangeText={setEditStatus}
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Ngày hẹn"
              value={editDate}
              onChangeText={setEditDate}
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Ghi chú"
              value={editNotes}
              onChangeText={setEditNotes}
            />
            <TouchableOpacity
              style={{ backgroundColor: '#2196F3', borderRadius: 6, padding: 10, alignItems: 'center', marginBottom: 8 }}
              onPress={handleSaveEdit}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: '#f44336', borderRadius: 6, padding: 10, alignItems: 'center' }}
              onPress={() => setEditModal(false)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Transactions;
