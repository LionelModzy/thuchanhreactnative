import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ContactThumbnail = ({ avatar, name, phone }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      {phone && <Text style={styles.phone}>{phone}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: '600',
  },
  phone: {
    color: '#888',
    marginTop: 4,
  },
});

export default ContactThumbnail;
