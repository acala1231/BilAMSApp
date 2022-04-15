import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Title, Caption } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext, LoaderContext } from 'contexts';

const SideMenu = (props) => {
  const { user, dispatch } = useContext(UserContext);
  const { loader } = useContext(LoaderContext);

  const _testLogout = async () => {
    try {
      loader.start();
      dispatch({});
    } catch (e) {
      Alert.alert('Logout Error', e.message);
    } finally {
      loader.stop();
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent} >
        <View style={styles.userInfoSection}>
          {/* <Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          /> */}
          <Image
            style={styles.logo}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
        <View style={styles.userInfoSection}>
          <Title style={styles.title}>{user.uid}</Title>
          <Caption style={styles.caption}>{user.email}</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
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
            onPress={() => { _testLogout() }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 15,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default SideMenu;