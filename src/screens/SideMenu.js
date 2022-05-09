import React from 'react';
import { View, Image, Alert } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Title, Caption } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { drawerStyles } from '../styles/styles';
import { cmsApi } from '../actions';


const SideMenu = (props) => {
  const action = useDispatch();
  const empInfo = useSelector(state => state.emp.empInfo); // 회원정보

  // 페이지이동
  const navigate = (screenNm) => {
    props.navigation.navigate(screenNm);
  }

  // 로그아웃
  const logout = () => {
    Alert.alert(
      '',
      '로그아웃 하시겠습니까?',
      [
        {
          text: "취소",
          style: "cancel"
        },
        { text: "확인", onPress: () => { action(cmsApi.logoutRequest()) } }

      ]
    );
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={drawerStyles.drawerContent} >
        <View style={drawerStyles.userInfoSection}>
          <Image
            style={drawerStyles.logo}
            source={require('../../assets/bil_300.png')}
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
                name="rename-box"
                color={color}
                size={size}
              />
            )}
            label="출퇴근기록"
            onPress={() => { navigate('출퇴근기록') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="office-building"
                color={color}
                size={size} />
            )}
            label="근무지관리"
            onPress={() => { navigate('근무지관리') }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-cog"
                color={color}
                size={size} />
            )}
            label="설정"
            onPress={() => { navigate('설정') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="logout"
                color={color}
                size={size} />
            )}
            label="로그아웃"
            onPress={() => { logout() }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

export default SideMenu;