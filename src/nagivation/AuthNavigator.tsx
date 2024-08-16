import React from 'react';
import LoginScreen from '../screens/login/LoginScreen';
import {RootStackParamList} from '../models/types/param-list';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
