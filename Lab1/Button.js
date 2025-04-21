// Lab1/Button.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Component Button tái sử dụng
const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: '#ff673c',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 6,
        ...props.buttonStyle, // Có thể tùy chỉnh thêm style khi cần
      }}
    >
      <Text style={{ color: '#000' }}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button; // Xuất component Button
