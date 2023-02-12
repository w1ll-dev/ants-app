import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../../types';
import { Home } from '../screens';

type ColorScheme = {
  colorScheme: ColorSchemeName;
};

export default function Navigation({ colorScheme }: ColorScheme) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ presentation: 'modal', title: '' }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
