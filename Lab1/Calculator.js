import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const screen = Dimensions.get('window');
const buttonSize = (screen.width - 40) / 4;

export default function Calculator() {
  const [history, setHistory] = useState('');
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Mặc định là light theme (false)

  const handlePress = (val) => {
    if (val === 'C') {
      setHistory('');
      setResult('');
    } else if (val === 'DEL') {
      setResult(result.slice(0, -1));
    } else if (val === '=') {
      try {
        setHistory(result + '=');
        setResult(eval(result).toString());
      } catch {
        setResult('Error');
      }
    } else {
      setResult(result + val);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const renderButton = (val, flex = 1, isInRightColumn = false) => {
    const isOperator = ['/', '*', '-', '+', '='].includes(val);
    const baseStyle = [
      styles.button,
      {
        backgroundColor: isOperator ? '#00BCD4' : darkMode ? '#333' : '#ddd',
        flex: isInRightColumn ? 1 : flex,
      },
    ];
    return (
      <TouchableOpacity
        key={val}
        style={baseStyle}
        onPress={() => handlePress(val)}
      >
        <Text style={[styles.buttonText, { color: darkMode ? '#fff' : '#000' }]}>
          {val}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#1e1e1e' : '#f2f2f2' },
      ]}
    >
      {/* Theme Toggle Button */}
      <TouchableOpacity 
        style={styles.themeToggle} 
        onPress={toggleTheme}
      >
        <MaterialCommunityIcons
          name={darkMode ? "weather-night" : "weather-sunny"}
          size={27}
          color={darkMode ? '#fff' : '#000'}
        />
      </TouchableOpacity>

      {/* Result Display */}
      <View style={styles.resultContainer}>
        <Text style={[styles.historyText, { color: darkMode ? '#aaa' : '#666' }]}>
          {history}
        </Text>
        <Text style={[styles.resultText, { color: darkMode ? '#0ff' : '#2c3e50' }]}>
          {result}
        </Text>
      </View>

      {/* Button Area */}
      <View style={styles.buttonArea}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Row C + DEL */}
          <View style={styles.row}>
            {renderButton('C', 1)}
            {renderButton('DEL', 1)}
          </View>
          {/* 7 8 9 */}
          <View style={styles.row}>
            {renderButton('7')}
            {renderButton('8')}
            {renderButton('9')}
          </View>
          {/* 4 5 6 */}
          <View style={styles.row}>
            {renderButton('4')}
            {renderButton('5')}
            {renderButton('6')}
          </View>
          {/* 1 2 3 */}
          <View style={styles.row}>
            {renderButton('1')}
            {renderButton('2')}
            {renderButton('3')}
          </View>
          {/* 0 . */}
          <View style={styles.row}>
            {renderButton('0', 1)}
            {renderButton('.', 1)}
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {['/', '*', '-', '+', '='].map((val) => renderButton(val))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    left: 20, // từ right -> left để icon nằm bên trái
    zIndex: 1,
    padding: 10,
    backgroundColor: '#ccc', // hoặc màu bạn muốn
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#999',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  resultContainer: {
    flex: 3.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  historyText: {
    fontSize: 18,
  },
  resultText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  buttonArea: {
    flex: 6.5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  leftColumn: {
    flex: 3,
  },
  rightColumn: {
    width: buttonSize,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 4,
  },
  buttonText: {
    fontSize: 24,
  },
});