import React from 'react';
import { View, Button, Alert } from 'react-native';

export default function Project2() {
  return (
    <View style={{ padding: 50 }}>
      <Button title="Press me" onPress={() => Alert.alert('Hello')} />
    </View>
  );
}
