import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function Project4() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ padding: 20 }}>
      <Text>You clicked {count} times</Text>
      <Button title="Click me" onPress={() => setCount(count + 1)} />
    </View>
  );
}
