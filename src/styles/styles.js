import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export const commonStlye = StyleSheet.create({
  defalutView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#636e72',
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

export const prjMngStlye = StyleSheet.create({
  detailContainer: {
    height: '20%',
    // backgroundColor: 'yellow',
  },
  listContainer: {
    height: '100%',
    // backgroundColor: 'orange',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 20,
  },
  adrContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  aplyContainer: {
    width: 320,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  adrPostcode: {
    width: 320,
    height: 500,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleView: {
    margin: 5,
  },
  multiView: {
    margin: 5,
    flexDirection: 'row',
  },
  flatList: {
    width: Dimensions.get('window').width,
    // flexGrow: 0,
    // backgroundColor: 'white',
    // padding: 5,
  },
  listItem: {
    backgroundColor: 'white',
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});




export const sampleStlye = StyleSheet.create({
  backBlack: {
    backgroundColor: 'black',
  }

});