import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EnvironmentScreen } from '../screens/Family/EnvironmentScreen';
import { TimelineScreen } from '../screens/Family/TimelineScreen';
import { AlertsScreen } from '../screens/Family/AlertsScreen';
import { ActionsScreen } from '../screens/Family/ActionsScreen';

export type DashboardTabParamList = {
  Environment: undefined;
  Timeline: undefined;
  Alerts: undefined;
  Actions: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();

export const DashboardNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarLabelStyle: { fontSize: 14, paddingBottom: 5 },
        tabBarStyle: { height: 60 }
      }}
    >
      <Tab.Screen name="Environment" component={EnvironmentScreen} options={{ title: 'Environment' }} />
      <Tab.Screen name="Timeline" component={TimelineScreen} options={{ title: 'Timeline' }} />
      <Tab.Screen name="Alerts" component={AlertsScreen} options={{ title: 'Alerts' }} />
      <Tab.Screen name="Actions" component={ActionsScreen} options={{ title: 'Actions' }} />
    </Tab.Navigator>
  );
};
