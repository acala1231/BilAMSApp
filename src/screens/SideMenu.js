import React from 'react';
import { View, Image } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Title, Caption } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { drawerStyles } from 'styles/styles';
import * as constants from 'constants';


const SideMenu = (props) => {
  const action = useDispatch();
  const empInfo = useSelector(state => state.emp.empInfo);

  return (
    <DrawerContentScrollView {...props}>
      <View style={drawerStyles.drawerContent} >
        <View style={drawerStyles.userInfoSection}>
          {/* <Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          /> */}
          <Image
            style={drawerStyles.logo}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
        <View style={drawerStyles.userInfoSection}>
          <Title style={drawerStyles.title}>{empInfo.empNm}</Title>
          <Caption style={drawerStyles.caption}>{empInfo.empNo}</Caption>
        </View>
        <Drawer.Section style={drawerStyles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="출퇴근기록"
            onPress={() => { props.navigation.navigate('출퇴근기록') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="tune"
                color={color}
                size={size} />
            )}
            label="프로젝트관리"
            onPress={() => { props.navigation.navigate('프로젝트관리') }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="logout"
                color={color}
                size={size} />
            )}
            label="로그아웃"
            onPress={() => { action(constants.LOGOUT) }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

export default SideMenu;