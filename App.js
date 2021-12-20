import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home'
import Proposal from './screens/Proposal';
import CheckProposal from './screens/CheckProposal';
import Settings from './screens/Settings'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerRoutes(){
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HVAC Proposals" component={DrawerRoutes} />
        <Stack.Screen name="New Proposal" component={Proposal} />
        <Stack.Screen name="Check Proposal" component={CheckProposal} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
