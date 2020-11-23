import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import PlantData from '../screens/PlantData';
import SearchScreen from '../screens/SearchScreen';
import {
  BottomTabParamList,
  TabOneParamList,
  PlantDataParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Search"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-search" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="PlantData"
        component={PlantDataNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false, // change this to `false`
        }}
      />
    </TabOneStack.Navigator>
  );
}

const PlantDataStack = createStackNavigator<PlantDataParamList>();

function PlantDataNavigator() {
  return (
    <PlantDataStack.Navigator>
      <PlantDataStack.Screen
        name="PlantData"
        component={PlantData}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </PlantDataStack.Navigator>
  );
}
