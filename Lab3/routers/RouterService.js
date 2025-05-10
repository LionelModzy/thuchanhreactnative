import { createStackNavigator } from "@react-navigation/stack";
import Services from "../screens/Services";
import AddNewService from "../screens/AddNewService";
import ServiceDetail from "../screens/ServiceDetail";
import EditService from "../screens/EditService";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

const RouterService = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  return (
    <Stack.Navigator
      initialRouteName="Services"
      screenOptions={{
        headerStyle: { backgroundColor: "#f06277" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen 
        name="Services" 
        component={Services}
        options={{
          title: userLogin?.fullName?.toUpperCase() || "",
          headerTitleAlign: "left",
          headerRight: () => <IconButton icon="account" color="#fff" />,
        }}
      />
      <Stack.Screen 
        name="AddNewService" 
        component={AddNewService}
        options={{ 
          title: "Add New Service",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen 
        name="ServiceDetail" 
        component={ServiceDetail}
        options={{ 
          title: "Service Detail",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen 
        name="EditService" 
        component={EditService}
        options={{ 
          title: "Edit Service",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default RouterService;