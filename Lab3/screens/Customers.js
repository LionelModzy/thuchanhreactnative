import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    const subscriber = firestore()
      .collection('USERS')
      .where('role', '==', 'customer')
      .onSnapshot(querySnapshot => {
        const customers = [];
        querySnapshot.forEach(doc => {
          customers.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setCustomers(customers);
      });

    return () => subscriber();
  }, []);

  const handleUpdate = async () => {
    if (!editedCustomer) return;

    try {
      await firestore()
        .collection('USERS')
        .doc(editedCustomer.id)
        .update({
          fullName: editedCustomer.fullName,
          phone: editedCustomer.phone,
          address: editedCustomer.address,
          updatedBy: userLogin.email,
          updatedAt: firestore.FieldValue.serverTimestamp()
        });
      
      setSelectedCustomer(null);
      setEditedCustomer(null);
      Alert.alert('Success', 'Customer updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditedCustomer({ ...customer });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Management</Text>
      
      <ScrollView style={styles.customersList}>
        {customers.map(customer => (
          <View key={customer.id} style={styles.customerCard}>
            <Text style={styles.customerName}>{customer.fullName}</Text>
            <Text style={styles.customerInfo}>Email: {customer.email}</Text>
            <Text style={styles.customerInfo}>Phone: {customer.phone}</Text>
            <Text style={styles.customerInfo}>Address: {customer.address}</Text>
            
            <TouchableOpacity 
              style={[styles.button, styles.updateButton]}
              onPress={() => handleEdit(customer)}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {selectedCustomer && editedCustomer && (
        <View style={styles.updateModal}>
          <Text style={styles.modalTitle}>Update Customer</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={editedCustomer.fullName}
            onChangeText={(text) => setEditedCustomer({ ...editedCustomer, fullName: text })}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={editedCustomer.phone}
            onChangeText={(text) => setEditedCustomer({ ...editedCustomer, phone: text })}
            keyboardType="phone-pad"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={editedCustomer.address}
            onChangeText={(text) => setEditedCustomer({ ...editedCustomer, address: text })}
          />
          
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setSelectedCustomer(null);
                setEditedCustomer(null);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  customersList: {
    flex: 1,
  },
  customerCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  customerInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  updateModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
});

export default Customers; 