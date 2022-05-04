import React from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { CommuteMng, WrkPlcMng, SideMenu, PasswordMng } from '../screens'


const Drawer = createDrawerNavigator();

const SideMenuDrawer = () => {
  const isInitPw = useSelector(state => state.emp.empInfo.isInitPw);

  return (
    <Drawer.Navigator
      initialRouteName={isInitPw == 'true' ? '비밀번호변경' : '출퇴근기록'}
      drawerContent={({ navigation }) => <SideMenu navigation={navigation} />}
    >
      <Drawer.Screen name='출퇴근기록' component={CommuteMng} options={{ unmountOnBlur: true }} />
      <Drawer.Screen name='근무지관리' component={WrkPlcMng} options={{ unmountOnBlur: true }} />
      <Drawer.Screen name='비밀번호변경' component={PasswordMng} options={{ unmountOnBlur: true }} />
    </Drawer.Navigator>
  );
};

export default SideMenuDrawer;

