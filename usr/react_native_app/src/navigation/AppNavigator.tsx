import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from '../store/useStore';
import { RoleSelectionScreen } from '../screens/RoleSelectionScreen';
import { CompanionScreen } from '../screens/Elderly/CompanionScreen';
import { DashboardNavigator } from './DashboardNavigator';

export type RootStackParamList = {
  RoleSelection: undefined;
  ElderlyCompanion: undefined;
  FamilyDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const userType = useStore((state) => state.userType);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userType === null ? (
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      ) : userType === 'elderly' ? (
        <Stack.Screen name="ElderlyCompanion" component={CompanionScreen} />
      ) : (
        <Stack.Screen name="FamilyDashboard" component={DashboardNavigator} />
      )}
    </Stack.Navigator>
  );
};
