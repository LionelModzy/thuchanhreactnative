import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'; // Sửa đổi tại đây

export default function Calculator() {
  const [historyText, setHistoryText] = useState('');
  const [resultText, setResultText] = useState('');

  const buttons = [
    ['C', 'DEL', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const handlePress = (value) => {
    if (value === 'C') {
      setHistoryText('');
      setResultText('');
      return;
    }

    if (value === 'DEL') {
      setResultText(resultText.slice(0, -1));
      return;
    }

    if (value === '=') {
      setHistoryText(resultText + ' =');
      try {
        setResultText(eval(resultText).toString());
      } catch (e) {
        setResultText('Error');
      }
      return;
    }

    setResultText(resultText + value);
  };

  return (
    <View style={styles.container}>
      {/* Kết quả */}
      <View style={styles.resultContainer}>
        <Text style={styles.history}>{historyText}</Text>
        <Text style={styles.result}>{resultText}</Text>
      </View>

      {/* Các nút */}
      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((buttonValue, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handlePress(buttonValue)}
              >
                {buttonValue === 'DEL' ? (
                  <Icon name="back" size={24} color="white" />
                ) : (
                  <Text style={styles.buttonText}>{buttonValue}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#3e3e3e',
  },
  history: {
    fontSize: 24,
    color: '#aaaaaa',
    textAlign: 'right',
  },
  result: {
    fontSize: 40,
    color: 'white',
    textAlign: 'right',
  },
  buttonContainer: {
    flex: 5,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    flex: 1,
    backgroundColor: '#4e4e4e',
    margin: 5,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});
