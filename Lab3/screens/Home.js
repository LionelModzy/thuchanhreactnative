import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Customer from './Customer';
import Admin from './Admin';
import Setting from './Setting';

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <PaperProvider>
      <Tab.Navigator
        initialRouteName="Customer"
        activeColor="#6200ee"
        barStyle={{ backgroundColor: '#fff' }}
      >
        <Tab.Screen
          name="Customer"
          component={Customer}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
          }}
        />
        <Tab.Screen
          name="Admin"
          component={Admin}
          options={{
            tabBarLabel: 'Admin',
            tabBarIcon: ({ color }) => <Icon name="account-cog" color={color} size={26} />,
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => <Icon name="cog" color={color} size={26} />,
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
}