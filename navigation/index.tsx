import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Auth from '@aws-amplify/auth';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [user, onChangeUser] = React.useState('');
  useEffect(() => {
    let isMounted = true;
    Auth.currentAuthenticatedUser().then((res) => {
      console.log('res auth', res.getUsername());
      onChangeUser(res.getUsername());
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = (id: string) => {
    console.log('id', id);
    onChangeUser(id);
  };

  const signUp = (id: string) => {
    onChangeUser(id);
  };

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {user ? (
        <RootNavigator />
      ) : (
        <AuthNavigator signIn={(id: string) => signIn(id)} />
      )}
    </NavigationContainer>
  );
}

const AuthStack = createStackNavigator();
function AuthNavigator({ signIn }: any) {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <AuthStack.Screen name="SignIn">
        {({ navigation }) => (
          <SignInScreen
            signIn={(id: string) => signIn(id)}
            navigation={navigation}
          />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
