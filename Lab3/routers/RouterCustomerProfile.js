import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerProfile from '../screens/CustomerProfile';

const Stack = createStackNavigator();

const RouterCustomerProfile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#2196F3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="CustomerProfile" component={CustomerProfile} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
};

export default RouterCustomerProfile; 