import { StyleSheet, Dimensions } from 'react-native';

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