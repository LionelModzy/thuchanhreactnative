import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

// Import các màn hình của bạn
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';
import colors from './utils/colors';
import CustomDrawerContent from './CustomDrawerContent'; 
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const getIcon = (name) => ({ color }) => (
  <MaterialIcons name={name} size={24} color={color} />
);

// Stack cho Contacts
const ContactsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Contacts" 
      component={Contacts} 
      options={{ 
        title: 'Contacts',
        headerStyle: { backgroundColor: 'tomato' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen 
      name="Profile" 
      component={Profile} 
      options={({ route }) => ({
        title: route.params.contact.name.split(' ')[0],
        headerStyle: { backgroundColor: colors.blue },
        headerTintColor: 'white',
      })}
    />
  </Stack.Navigator>
);

// Stack cho Favorites
const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

// Stack cho User
const UserStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="User"
      component={User}
      options={({ navigation }) => ({
        title: 'Me',
        headerStyle: { backgroundColor: colors.blue },
        headerTintColor: 'white',
        headerRight: () => (
          <MaterialIcons
            name="settings"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate('Options')}
          />
        ),
      })}
    />
    <Stack.Screen name="Options" component={Options} />
  </Stack.Navigator>
);

// Tạo Tab Navigator
const TabNavigator = ({ route }) => {
  const initialTab = route?.params?.screen ?? 'ContactsTab';

  return (
    <Tab.Navigator
      initialRouteName={initialTab}
      barStyle={{ backgroundColor: colors.blue }}
      activeColor={colors.grayLight}
      inactiveColor={colors.grayDark}
    >
      <Tab.Screen
        name="ContactsTab"
        component={ContactsStack}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: getIcon('list'),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: getIcon('star'),
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserStack}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: getIcon('person'),
        }}
      />
    </Tab.Navigator>
  );
};

// Tạo Drawer Navigator với custom content để đồng bộ với Tab
const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
  drawerContent={(props) => <CustomDrawerContent {...props} />}
  screenOptions={{
    drawerStyle: {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: '#f2f2f2',
      width: 260,
    },
  }}
>
<Drawer.Screen
  name="ContactsDrawer"
  component={TabNavigator}
  initialParams={{ screen: 'ContactsTab' }}
  options={{
    drawerIcon: getIcon('list'),
    drawerLabel: 'Contacts',
  }}
/>
<Drawer.Screen
  name="FavoritesDrawer"
  component={TabNavigator}
  initialParams={{ screen: 'FavoritesTab' }}
  options={{
    drawerIcon: getIcon('star'),
    drawerLabel: 'Favorites',
  }}
/>
<Drawer.Screen
  name="UserDrawer"
  component={TabNavigator}
  initialParams={{ screen: 'UserTab' }}
  options={{
    drawerIcon: getIcon('person'),
    drawerLabel: 'Me',
  }}
/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;