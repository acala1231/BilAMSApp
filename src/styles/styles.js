import { StyleSheet, Dimensions } from 'react-native';


export const commonStlye = StyleSheet.create({
  defalutView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const loaderStlye = StyleSheet.create({
  indicator: {
    position: 'absolute',
    zIndex: 2,
    opacity: 0.3,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export const drawerStyles = StyleSheet.create({
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

export const loginStlye = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  input: {
    width: 200,
    height: 50,
    margin: 5,
  },
  button: {
    width: 200,
    height: 50,
    margin: 5,
    backgroundColor: '#6e6e6e',
    justifyContent: 'center'
  }
});