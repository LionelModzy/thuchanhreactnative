import { createStackNavigator } from "@react-navigation/stack";
import Customers from "../screens/Customers";

const Stack = createStackNavigator();

const RouterCustomer = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Customers" 
        component={Customers}
        options={{
          title: 'Customer Management',
        }}
      />
    </Stack.Navigator>
  );
};

export default RouterCustomer; 