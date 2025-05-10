import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../routers/RouterService";
import Transaction from "./Transactions";
import Customer from "./Customer";
import Setting from "./Setting";
import Customers from "./Customers";
import RouterTransaction from "../routers/RouterTransaction";

const Tab = createMaterialBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterService"
        component={RouterService}
        options={{ title: "Home", tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="RouterTransaction"
        component={RouterTransaction}
        
        options={{ title: "Transactionss",tabBarIcon: "cash" }}
      />
      <Tab.Screen
        name="Customers"
        component={Customers}
        options={{ tabBarIcon: "account" }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{ tabBarIcon: "cog" }}
      />
    </Tab.Navigator>
  );
};

export default Admin;
