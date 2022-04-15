import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from 'contexts'
import { SideMenuDrawer, AuthStack } from 'navigations';

const RootNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {user?.uid && user?.email ?
        <SideMenuDrawer />
        :
        <AuthStack />
      }
    </NavigationContainer>
  );
};

export default RootNavigator;