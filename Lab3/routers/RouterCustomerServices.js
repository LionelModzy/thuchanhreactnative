import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerServices from '../screens/CustomerServices';
import CustomerServiceDetail from '../screens/CustomerServiceDetail';

// Bạn có thể tạo ServiceDetail.js, Appointment.js cho customer nếu cần

const Stack = createStackNavigator();

const RouterCustomerServices = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#2196F3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="CustomerServices" component={CustomerServices} options={{ title: 'Services' }} />
      <Stack.Screen name="CustomerServiceDetail" component={CustomerServiceDetail} options={{ title: 'Service Detail' }} />
      
    </Stack.Navigator>
  );
};

export default RouterCustomerServices; 