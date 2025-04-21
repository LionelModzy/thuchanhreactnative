import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Định nghĩa các style cho container và square
const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#fff',
    flexGrow: 1,
    padding: 20
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10, // Tùy chọn thêm một chút góc bo
  },
});

// Component Square, có thể nhận props `text` và `bgColor`
const Square = ({ text, bgColor = '#7ce0f9' }) => (
  <View style={[styles.box, { backgroundColor: bgColor }]}>
    <Text>{text}</Text>
  </View>
);

const data = Array.from({ length: 15 }, (_, i) => i + 1); // Tạo mảng số từ 1 đến 15

// Component Project6
export default function Project6() {
  return (
    <ScrollView style={styles.container}>
      {data.map((item) => (
        <Square key={item} text={`Square ${item}`} />
      ))}
    </ScrollView>
  );
}
