import { createStackNavigator } from "@react-navigation/stack";
import Services from "../screens/Services";
import AddNewService from "../screens/AddNewService";
import ServiceDetail from "../screens/ServiceDetail";
import EditService from "../screens/EditService";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import React, { useState } from "react";

const Stack = createStackNavigator();

const RouterService = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName="Services"
      screenOptions={{
        headerStyle: { backgroundColor: "#2196F3" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen 
        name="Services" 
        children={props => (
          <Services {...props} showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal} />
        )}
        options={{
          title: userLogin?.fullName?.toUpperCase() || "",
          headerTitleAlign: "left",
          headerRight: () => (
            <IconButton 
              icon="account" 
              color="#fff" 
              onPress={() => setShowProfileModal(true)}
            />
          ),
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