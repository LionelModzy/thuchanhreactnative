import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import { fetchUserContact } from '../utils/api';
import colors from '../utils/colors';

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUserContact()
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error || !user) return <Text style={styles.center}>Error loading user...</Text>;

  return (
    <View style={styles.container}>
      <ContactThumbnail avatar={user.avatar} name={user.name} phone={user.phone} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default User;
