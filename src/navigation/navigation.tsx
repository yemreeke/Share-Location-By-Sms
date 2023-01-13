import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import LocationScreen from '../screens/LocationScreen';
const Stack = createNativeStackNavigator();
export const SCREENS = {
  HomeScreen: "HomeScreen",
  LocationScreen: "LocationScreen",
  ContactScreen: "ContactScreen",
}
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Ana Sayfa' }}
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{ title: 'Konum Ekranı' }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{ title: 'Kişi Seçme Ekranı' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;