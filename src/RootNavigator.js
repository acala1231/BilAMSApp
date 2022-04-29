import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import * as Navigations from './navigations';


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