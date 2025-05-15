import { createStackNavigator } from "@react-navigation/stack";
import Setting from "../screens/Setting";

const Stack = createStackNavigator();

const RouterSetting = () => {
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
        name="Setting" 
        component={Setting}
        options={{
          title: 'Profile Management',
        }}
      />
    </Stack.Navigator>
  );
};

export default RouterSetting; 