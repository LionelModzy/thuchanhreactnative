import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const CustomerAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userLogin?.email) return;
    const unsubscribe = firestore()
      .collection('APPOINTMENTS')
      .where('customerEmail', '==', userLogin.email)
      .onSnapshot(snapshot => {
        setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, [userLogin?.email]);

  const handleDelete = (id) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa cuộc hẹn này?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xóa', style: 'destructive', onPress: async () => {
        await firestore().collection('APPOINTMENTS').doc(id).delete();
      }}
    ]);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditDate(item.date);
    setEditNotes(item.notes || '');
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editDate.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập ngày hẹn!');
      return;
    }
    setLoading(true);
    try {
      await firestore().collection('APPOINTMENTS').doc(editItem.id).update({
        date: editDate,
        notes: editNotes,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      setEditModal(false);
      setEditItem(null);
      setEditDate('');
      setEditNotes('');
      Alert.alert('Thành công', 'Cập nhật thành công!');
    } catch (e) {
      Alert.alert('Lỗi', e.message);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>Appointments</Text>
      <ScrollView>
        {appointments.map(app => (
          <View key={app.id} style={{ backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, padding: 12, elevation: 2 }}>
            <Text style={{ fontWeight: 'bold' }}>{app.serviceName || app.service}</Text>
            <Text>Ngày: {app.date}</Text>
            <Text>Ghi chú: {app.notes}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity style={{ backgroundColor: '#f44336', borderRadius: 6, padding: 6, marginRight: 8 }} onPress={() => handleDelete(app.id)}>
                <Text style={{ color: '#fff' }}>Xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#2196F3', borderRadius: 6, padding: 6 }} onPress={() => handleEdit(app)}>
                <Text style={{ color: '#fff' }}>Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={editModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 320 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Sửa cuộc hẹn</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Ngày hẹn (VD: 2024-06-01 14:00)"
              value={editDate}
              onChangeText={setEditDate}
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Ghi chú (tuỳ chọn)"
              value={editNotes}
              onChangeText={setEditNotes}
            />
            <TouchableOpacity
              style={{ backgroundColor: '#2196F3', borderRadius: 6, padding: 10, alignItems: 'center', marginBottom: 8 }}
              onPress={handleSaveEdit}
              disabled={loading}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{loading ? 'Đang lưu...' : 'Lưu'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: '#f44336', borderRadius: 6, padding: 10, alignItems: 'center' }}
              onPress={() => setEditModal(false)}
              disabled={loading}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomerAppointments; 