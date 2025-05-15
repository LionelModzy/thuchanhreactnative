import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../routers/RouterService";
import RouterTransaction from "../routers/RouterTransaction";
import RouterCustomer from "../routers/RouterCustomer";
import RouterSetting from "../routers/RouterSetting";

const Tab = createMaterialBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterService"
        component={RouterService}
        options={{ 
          title: "Services",
          tabBarIcon: "home" 
        }}
      />
      <Tab.Screen
        name="RouterTransaction"
        component={RouterTransaction}
        options={{ 
          title: "Transactions",
          tabBarIcon: "cash" 
        }}
      />
      <Tab.Screen
        name="RouterCustomer"
        component={RouterCustomer}
        options={{ 
          title: "Customers",
          tabBarIcon: "account" 
        }}
      />
      <Tab.Screen
        name="RouterSetting"
        component={RouterSetting}
        options={{ 
          title: "Profile",
          tabBarIcon: "cog" 
        }}
      />
    </Tab.Navigator>
  );
};

export default Admin;
