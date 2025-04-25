import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Lab1Screen from './Lab1/Lab1Screen'; // Tách logic Lab1 vào file riêng
import Lab2App from './Lab2/App';           // App.js từ Lab2

export default function App() {
  const [lab, setLab] = useState<null | 'Lab1' | 'Lab2'>(null);

  const renderLab = () => {
    switch (lab) {
      case 'Lab1':
        return <Lab1Screen goBack={() => setLab(null)} />;
      case 'Lab2':
        return <Lab2App />;
      default:
        return (
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select Lab</Text>
            <View style={styles.button}>
              <Button title="Lab 1" onPress={() => setLab('Lab1')} />
            </View>
            <View style={styles.button}>
              <Button title="Lab 2" onPress={() => setLab('Lab2')} />
            </View>
          </SafeAreaView>
        );
    }
  };

  return renderLab();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: '60%',
  },
});
