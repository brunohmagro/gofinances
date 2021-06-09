import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => (
  <Navigator>
    <Screen name="Listagem" component={Dashboard} />
    <Screen name="Cadastrar" component={Register} />
  </Navigator>
);
