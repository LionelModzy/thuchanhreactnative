import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';
import { useNavigation, useRoute } from '@react-navigation/native';

const CustomerServiceDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { service } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  const handleConfirm = async () => {
    if (!date.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập ngày hẹn!');
      return;
    }
    setLoading(true);
    try {
      await firestore().collection('APPOINTMENTS').add({
        service: service.name,
        serviceId: service.id,
        customerEmail: userLogin.email,
        customerName: userLogin.fullName,
        date,
        notes,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setShowModal(false);
      setDate('');
      setNotes('');
      Alert.alert('Thành công', 'Đặt lịch thành công!');
      navigation.navigate('RouterCustomerAppointments');
    } catch (e) {
      Alert.alert('Lỗi', e.message);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>{service.name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Giá: {service.price?.toLocaleString()} đ</Text>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>Người tạo: {service.creator}</Text>
      {/* Thêm các thông tin khác nếu cần */}
      <TouchableOpacity
        style={{ backgroundColor: '#2196F3', borderRadius: 6, padding: 12, alignItems: 'center', marginTop: 20 }}
        onPress={() => setShowModal(true)}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đặt lịch</Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 320 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Đặt lịch: {service.name}</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Ngày hẹn (VD: 2024-06-01 14:00)"
              value={date}
              onChangeText={setDate}
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginBottom: 10 }}
              placeholder="Ghi chú (tuỳ chọn)"
              value={notes}
              onChangeText={setNotes}
            />
            <TouchableOpacity
              style={{ backgroundColor: '#2196F3', borderRadius: 6, padding: 10, alignItems: 'center', marginBottom: 8 }}
              onPress={handleConfirm}
              disabled={loading}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{loading ? 'Đang lưu...' : 'Xác nhận'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: '#f44336', borderRadius: 6, padding: 10, alignItems: 'center' }}
              onPress={() => setShowModal(false)}
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

export default CustomerServiceDetail; 