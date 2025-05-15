import { createStackNavigator } from "@react-navigation/stack";
import Transactions from "../screens/Transactions";

const Stack = createStackNavigator();

const RouterTransaction = () => {
  return (
    <Stack.Navigator
      initialRouteName="Transactions"
      screenOptions={{
        headerStyle: { backgroundColor: "#2196F3" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{
          title: "Transactions",
          headerTitleAlign: "left",
        }}
      />
    </Stack.Navigator>
  );
};

export default RouterTransaction;
