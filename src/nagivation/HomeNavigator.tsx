import React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import {RootStackParamList} from '../models/types/param-list';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Hometack = createNativeStackNavigator<RootStackParamList>();

export default function HomeNav() {
  return (
    <Hometack.Navigator>
      <Hometack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Hometack.Navigator>
  );
}
