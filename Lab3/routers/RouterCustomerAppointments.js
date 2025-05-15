import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerAppointments from '../screens/CustomerAppointments';
// import AppointmentDetail from '../screens/AppointmentDetail';
// import AppointmentEdit from '../screens/AppointmentEdit';

const Stack = createStackNavigator();

const RouterCustomerAppointments = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#2196F3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="CustomerAppointments" component={CustomerAppointments} options={{ title: 'Appointments' }} />
      {/* <Stack.Screen name="AppointmentDetail" component={AppointmentDetail} options={{ title: 'Appointment Detail' }} /> */}
      {/* <Stack.Screen name="AppointmentEdit" component={AppointmentEdit} options={{ title: 'Edit Appointment' }} /> */}
    </Stack.Navigator>
  );
};

export default RouterCustomerAppointments; 