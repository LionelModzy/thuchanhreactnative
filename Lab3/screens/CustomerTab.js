import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import RouterCustomerServices from '../routers/RouterCustomerServices';
import RouterCustomerAppointments from '../routers/RouterCustomerAppointments';
import RouterCustomerProfile from '../routers/RouterCustomerProfile';

const Tab = createMaterialBottomTabNavigator();

const CustomerTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterCustomerServices"
        component={RouterCustomerServices}
        options={{
          title: 'Services',
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen
        name="RouterCustomerAppointments"
        component={RouterCustomerAppointments}
        options={{
          title: 'Appointments',
          tabBarIcon: 'calendar',
        }}
      />
      <Tab.Screen
        name="RouterCustomerProfile"
        component={RouterCustomerProfile}
        options={{
          title: 'Profile',
          tabBarIcon: 'account',
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerTab; 