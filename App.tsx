import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

// Import Project Components
import Project1 from './Lab1/Project1';
import Project2 from './Lab1/Project2';
import Project3 from './Lab1/Project3';
import Project4 from './Lab1/Project4';
import Project5 from './Lab1/Project5';
import Project6 from './Lab1/Project6';
import Project7 from './Lab1/Project7';
import Project8 from './Lab1/Project8';
import Calculator from './Lab1/Calculator';
export default function App() {
  const [currentProject, setCurrentProject] = useState<number | null>(null);

  const renderProject = () => {
    switch (currentProject) {
      case 1: return <Project1 />;
      case 2: return <Project2 />;
      case 3: return <Project3 />;
      case 4: return <Project4 />;
      case 5: return <Project5 />;
      case 6: return <Project6 />;
      case 7: return <Project7 />;
      case 8: return <Project8 />;
      case 9: return <Calculator />;
      default:
  return (
    <ScrollView contentContainerStyle={styles.menu}>
      <Text style={styles.title}>Lab 1 - React Native</Text>
      {Array.from({ length: 8 }, (_, i) => (
        <View key={i + 1} style={styles.buttonContainer}>
          <Button
            title={`Project ${i + 1}`}
            onPress={() => setCurrentProject(i + 1)}
          />
        </View>
      ))}
      
      {/* Thêm nút Calculator ở đây */}
      <View style={styles.buttonContainer}>
        <Button
          title="Calculator"
          onPress={() => setCurrentProject(9)}
        />
      </View>
    </ScrollView>
  );

    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ADD8E6' }}>  {/* Màu nền xanh dương nhạt */}

      {renderProject()}
      {currentProject && (
        <View style={styles.backButton}>
          <Button title="← Back to Menu" onPress={() => setCurrentProject(null)} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  backButton: {
    padding: 10,
  },
});
