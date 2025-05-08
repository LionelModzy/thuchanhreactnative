// Lab2/CustomDrawerContent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from './utils/colors'; // điều chỉnh đường dẫn nếu cần

const DrawerSectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const DrawerItem = ({ label, icon, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.drawerItem, isActive && styles.activeItem]}
  >
    <MaterialIcons name={icon} size={22} color={isActive ? 'white' : 'black'} />
    <Text style={[styles.drawerLabel, isActive && styles.activeLabel]}>{label}</Text>
  </TouchableOpacity>
);

export default function CustomDrawerContent({ state, navigation }) {
  const currentRoute = state.routes[state.index].name;

  return (
    <View style={styles.container}>
      <DrawerSectionTitle title="Main" />
      <DrawerItem
        label="Contacts"
        icon="list"
        isActive={currentRoute === 'ContactsDrawer'}
        onPress={() => navigation.navigate('ContactsDrawer')}
      />
      <DrawerItem
        label="Favorites"
        icon="star"
        isActive={currentRoute === 'FavoritesDrawer'}
        onPress={() => navigation.navigate('FavoritesDrawer')}
      />

      <DrawerSectionTitle title="Account" />
      <DrawerItem
        label="Me"
        icon="person"
        isActive={currentRoute === 'UserDrawer'}
        onPress={() => navigation.navigate('UserDrawer')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginVertical: 12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  drawerLabel: {
    marginLeft: 12,
    fontSize: 16,
  },
  activeItem: {
    backgroundColor: colors.blue,
  },
  activeLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});
