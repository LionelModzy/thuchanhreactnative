import { createStackNavigator } from "@react-navigation/stack";
import Transactions from "../screens/Transactions";
import AddNewTransaction from "../screens/AddNewTransaction";
import TransactionDetail from "../screens/TransactionDetail";
import EditTransaction from "../screens/EditTransaction";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

const RouterTransaction = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  return (
    <Stack.Navigator
      initialRouteName="Transactions"
      screenOptions={{
        headerStyle: { backgroundColor: "#f06277" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{
          title: userLogin?.fullName?.toUpperCase() || "",
          headerTitleAlign: "left",
          headerRight: () => <IconButton icon="account" color="#fff" />,
        }}
      />
      <Stack.Screen
        name="AddNewTransaction"
        component={AddNewTransaction}
        options={{
          title: "Add New Transaction",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{
          title: "Transaction Detail",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EditTransaction"
        component={EditTransaction}
        options={{
          title: "Edit Transaction",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default RouterTransaction;
