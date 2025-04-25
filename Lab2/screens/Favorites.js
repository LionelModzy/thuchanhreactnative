import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ContactThumbnail from '../components/ContactThumbnail';
import { fetchContacts } from '../utils/api';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../store';

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state);

  useEffect(() => {
    if (!contacts.length) {
      dispatch(fetchContactsLoading());
      fetchContacts()
        .then(data => dispatch(fetchContactsSuccess(data)))
        .catch(() => dispatch(fetchContactsError()));
    }
  }, []);

  const favorites = contacts.filter(contact => contact.favorite);

  const renderItem = ({ item }) => (
    <ContactThumbnail
      avatar={item.avatar}
      name={item.name}
      phone={item.phone}
      onPress={() => navigation.navigate('Profile', { contact: item })}
    />
  );

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <Text style={styles.center}>Error loading favorites...</Text>;

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.phone}
      renderItem={renderItem}
      numColumns={3}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    alignItems: 'center',
  },
});

export default Favorites;
