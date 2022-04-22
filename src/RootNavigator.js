import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Navigations from 'navigations';

import { useSelector } from 'react-redux';

const RootNavigator = () => {
  const isLogin = useSelector(state => state.emp.isLogin);

  return (
    <NavigationContainer>
      {isLogin ?
        <Navigations.SideMenuDrawer />
        :
        <Navigations.AuthStack />
      }
    </NavigationContainer>
  );
};

export default RootNavigator;