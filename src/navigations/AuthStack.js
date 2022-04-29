import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens'


const Stack = createStackNavigator();

const AuthStack = () => {
  // const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        // cardStyle: { backgroundColor: theme.background },
        // headerTintColor: theme.headerTintColor,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
