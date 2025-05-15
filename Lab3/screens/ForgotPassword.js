import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendReset = async () => {
    if (!email.includes('@')) {
      Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ!');
      return;
    }
    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Thành công', 'Đã gửi email đặt lại mật khẩu!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Lỗi', e.message);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>Forgot Password</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: 300, marginBottom: 16 }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button mode="contained" onPress={handleSendReset} loading={loading} style={{ width: 300, marginBottom: 16 }}>
        Gửi email đặt lại mật khẩu
      </Button>
      <Button onPress={() => navigation.goBack()} style={{ width: 300 }}>
        Quay lại đăng nhập
      </Button>
    </View>
  );
};

export default ForgotPassword; 