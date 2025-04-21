import React from 'react';
import { Alert, View } from 'react-native';
import Button from './Button'; // Nhập component Button tái sử dụng

export default function Project3() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button text="Say hello" onPress={() => Alert.alert('Hello!')} />
      <Button
        text="Say goodbye"
        onPress={() => Alert.alert('Goodbye!')}
        buttonStyle={{ backgroundColor: '#4dc2c2' }} // Kiểu tùy chỉnh cho nút thứ hai
      />
    </View>
  );
}
