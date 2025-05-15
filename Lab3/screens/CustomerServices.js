import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CustomerServices = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('SERVICES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, []);

  const filtered = services.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>Services</Text>
      <TextInput
        placeholder="Find service by name..."
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, marginBottom: 16 }}
      />
      <ScrollView>
        {filtered.map(service => (
          <TouchableOpacity
            key={service.id}
            style={{ backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, padding: 12, elevation: 2 }}
            onPress={() => navigation.navigate('CustomerServiceDetail', { service })}
          >
            <Text style={{ fontWeight: 'bold' }}>{service.name}</Text>
            <Text>{service.price?.toLocaleString()} đ</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomerServices; 