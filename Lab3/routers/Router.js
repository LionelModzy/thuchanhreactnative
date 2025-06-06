import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Admin from "../screens/Admin";
import Customer from "../screens/Customer";
import CustomerTab from "../screens/CustomerTab";
import ForgotPassword from "../screens/ForgotPassword";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="CustomerTab" component={CustomerTab} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default Router;
