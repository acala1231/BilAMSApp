import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from 'contexts'
import * as Navigations from 'navigations';

const RootNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {user?.uid && user?.email ?
        <Navigations.SideMenuDrawer />
        :
        <Navigations.AuthStack />
      }
    </NavigationContainer>
  );
};

export default RootNavigator;