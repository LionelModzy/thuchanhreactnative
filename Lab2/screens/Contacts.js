import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../store';
import { fetchContacts } from '../utils/api';

const Contacts = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then(data => dispatch(fetchContactsSuccess(data)))
      .catch(() => dispatch(fetchContactsError()));
  }, []);

  const sortedContacts = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));

  const renderItem = ({ item }) => (
    <ContactListItem
      name={item.name}
      avatar={item.avatar}
      phone={item.phone}
      onPress={() => navigation.navigate('Profile', { contact: item })}
    />
  );

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <Text style={styles.center}>Error loading contacts...</Text>;

  return (
    <FlatList
      data={sortedContacts}
      keyExtractor={(item) => item.phone}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Contacts;
