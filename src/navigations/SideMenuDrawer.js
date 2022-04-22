import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AttendenceReg, ProjectMng, SideMenu } from 'screens'


const Drawer = createDrawerNavigator();

const SideMenuDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="출퇴근기록"
      drawerContent={({ navigation }) => <SideMenu navigation={navigation} />}
    >
      <Drawer.Screen name="출퇴근기록" component={AttendenceReg} />
      <Drawer.Screen name="프로젝트관리" component={ProjectMng} />
    </Drawer.Navigator>
  );
};

export default SideMenuDrawer;