import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Project1() {
  return (
    <View style={styles.container}>
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>Hello, world!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 10,
  },
  messageBox: {
    backgroundColor: 'skyblue',
    width: 100,         
    height: 100,        
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
  },
});